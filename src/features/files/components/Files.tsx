import React, { useState, useEffect } from 'react';
import { useGetFiles } from 'features/files';
import useGetFileByName from 'features/files/hooks/useGetFileByName';
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';
import useSetSelectedFileData from 'features/files/hooks/useSetSelectedFileData';
import MonacoEditor from '@monaco-editor/react';

const Files: React.FC = () => {
  // This would be a name of authenticated user
  const [userName, setUserName] = useState(
    Math.random().toString(36).substr(2, 9)
  );
  const [editor, setEditor] = useState<string | null>(null);
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const { selectedFile, setSelectedFileData } = useSetSelectedFileData();
  const { getFiles, files } = useGetFiles();
  const { getFileByName, resetSelectedFile } = useGetFileByName();

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_API_URL}/hub`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  let timeoutId: NodeJS.Timeout;
  useEffect(() => {
    const startConnection = async () => {
      if (connection && connection.state === HubConnectionState.Disconnected) {
        try {
          await connection.start();
          console.log('Connected!');
          connection.on('ReceiveTextChange', (newText, editor) => {
            setEditor(editor);
            setSelectedFileData(newText);
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
              setEditor(null);
            }, 1000);
          });
        } catch (err) {
          console.error('Connection Error: ', err);
        }
      }
    };
    startConnection();

    return () => {
      resetSelectedFile();
      connection?.stop();
    };
  }, [connection]);

  const selectFile = async (fileName: string) => {
    if (selectedFile && selectedFile.name !== fileName) {
      deselectFile(selectedFile.name);
    }
    if (connection && connection.state === HubConnectionState.Connected) {
      await connection.invoke('JoinFileGroup', fileName);
      getFileByName(fileName);
    }
  };

  const deselectFile = async (fileName: string) => {
    if (connection && connection.state === HubConnectionState.Connected) {
      await connection.invoke('LeaveFileGroup', fileName);
    }
  };

  const handleTextChange = async (value: string | undefined) => {
    if (selectedFile && value && userName) {
      await connection?.invoke(
        'BroadcastTextChange',
        selectedFile?.name,
        value,
        userName
      );
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ margin: '20px 0' }}>
        <p style={{ fontWeight: 'bold' }}>
          {selectedFile
            ? `Editing file ${selectedFile.name}`
            : 'Please select a file'}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            margin: '10px',
          }}
        >
          {files.length > 0 ? (
            files.map(file => (
              <button
                key={file.name}
                onClick={() => selectFile(file.name)}
                style={{
                  margin: '10px',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #ccc',
                  background: '#f0f0f0',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseOver={e =>
                  (e.currentTarget.style.backgroundColor = '#e2e2e2')
                }
                onMouseOut={e =>
                  (e.currentTarget.style.backgroundColor = '#f0f0f0')
                }
              >
                {file.name}
              </button>
            ))
          ) : (
            <p>No files found</p>
          )}
        </div>
      </div>
      <p
        style={{
          visibility: editor && editor !== userName ? 'visible' : 'hidden',
          height: '1em',
          margin: '20px',
        }}
      >
        {editor && editor !== userName
          ? `${editor} is editing file`
          : 'Placeholder'}
      </p>
      <MonacoEditor
        height='70vh'
        defaultLanguage='json'
        language='json'
        onChange={handleTextChange}
        value={selectedFile?.data ?? ''}
      />
    </div>
  );
};

export default Files;
