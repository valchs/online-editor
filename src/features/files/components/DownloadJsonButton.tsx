import React from 'react';

interface DownloadJsonButtonProps {
  data: string;
  fileName?: string;
  enabled: boolean;
}

const DownloadJsonButton: React.FC<DownloadJsonButtonProps> = ({
  data,
  fileName,
  enabled,
}) => {
  const downloadData = () => {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || 'download.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      style={{
        padding: '10px 20px',
        color: '#fff',
        backgroundColor: enabled ? '#007bff' : '#cccccc',
        border: 'none',
        borderRadius: '5px',
        cursor: enabled ? 'pointer' : 'not-allowed',
        outline: 'none',
      }}
      disabled={!enabled}
      onClick={downloadData}
    >
      Download
    </button>
  );
};

export default DownloadJsonButton;
