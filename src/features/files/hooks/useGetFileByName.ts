import { useAppDispatch, useAppSelector } from 'store';
import {
  getFileByNameAction,
  resetSelectedFileAction,
} from 'features/files/actions';
import { useCallback } from 'react';

const useGetFileByName = () => {
  const dispatch = useAppDispatch();
  const { selectedFile } = useAppSelector(state => state.files);

  const getFileByName = useCallback(
    (name: string) => {
      dispatch(getFileByNameAction(name)).unwrap();
    },
    [dispatch]
  );

  const resetSelectedFile = () => {
    dispatch(resetSelectedFileAction());
  };

  return { selectedFile, getFileByName, resetSelectedFile };
};

export default useGetFileByName;
