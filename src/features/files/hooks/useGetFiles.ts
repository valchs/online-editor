import { useAppDispatch, useAppSelector } from 'store';
import { getFilesAction } from 'features/files/actions';
import { useCallback } from 'react';

const useGetFiles = () => {
  const dispatch = useAppDispatch();
  const { files } = useAppSelector(state => state.files);

  const getFiles = useCallback(async () => {
    try {
      await dispatch(getFilesAction()).unwrap();
    } catch (error) {
      console.log('Failed to fetch files:', error);
    }
  }, [dispatch]);

  return { getFiles, files };
};

export default useGetFiles;
