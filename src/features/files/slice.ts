import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getFilesAction,
  getFileByNameAction,
  setSelectedFileDataAction,
  resetSelectedFileAction,
} from 'features/files/actions';
import { File } from 'types/file';

interface FilesState {
  files: File[];
  isLoading: boolean;
  selectedFile?: File;
}

const initialState: FilesState = {
  files: [],
  isLoading: false,
  selectedFile: undefined,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getFilesAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getFilesAction.fulfilled,
      (state, action: PayloadAction<File[]>) => {
        state.isLoading = false;
        state.files = action.payload;
      }
    );
    builder.addCase(getFilesAction.rejected, state => {
      state.isLoading = false;
      state.files = [];
    });
    builder.addCase(getFileByNameAction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      getFileByNameAction.fulfilled,
      (state, action: PayloadAction<File>) => {
        state.isLoading = false;
        state.selectedFile = action.payload;
      }
    );
    builder.addCase(getFileByNameAction.rejected, state => {
      state.isLoading = false;
      state.selectedFile = undefined;
    });
    builder.addCase(setSelectedFileDataAction, (state, action) => {
      if (state.selectedFile) {
        state.selectedFile.data = action.payload.data;
      }
    });
    builder.addCase(resetSelectedFileAction, state => {
      state.selectedFile = undefined;
    });
  },
});

export const filesReducer = filesSlice.reducer;
