import { useAppDispatch, useAppSelector } from 'store';
import { setSelectedFileDataAction } from 'features/files/actions';

const useSetSelectedFileData = () => {
  const { selectedFile } = useAppSelector(state => state.files);
  const dispatch = useAppDispatch();

  const setSelectedFileData = (data: string) => {
    dispatch(setSelectedFileDataAction({ data }));
  };

  return { selectedFile, setSelectedFileData };
};

export default useSetSelectedFileData;
