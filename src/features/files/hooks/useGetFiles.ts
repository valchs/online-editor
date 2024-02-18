import { useAppDispatch, useAppSelector } from 'store';
import { getFilesAction } from 'features/files/actions';
import { useCallback } from 'react';

const useGetFiles = () => {
  const dispatch = useAppDispatch();
  const { files } = useAppSelector(state => state.files);

  const getFiles = useCallback(() => {
    dispatch(getFilesAction()).unwrap();
  }, [dispatch]);

  return { getFiles, files };
};

export default useGetFiles;
