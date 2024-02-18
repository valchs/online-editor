import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FilesClient } from 'api/clients';
import { File } from 'types/file';

export const getFilesAction = createAsyncThunk<File[], void>(
  'files/getFiles',
  async () => {
    const response = await FilesClient.getFiles();
    return response;
  }
);

export const getFileByNameAction = createAsyncThunk<File, string>(
  'files/getFileByName',
  async (name: string) => {
    const response = await FilesClient.getFileByName(name);
    return response;
  }
);

export const setSelectedFileDataAction = createAction<{
  data: string;
}>('setSelectedFileData');

export const resetSelectedFileAction = createAction<void>('resetSelectedFile');
