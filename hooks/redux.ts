import { IRootState, ReduxDispatch } from '@/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface IReturn {
  useAppSelector: TypedUseSelectorHook<IRootState>;
  dispatch: ReduxDispatch;
}

const useRedux = (): IReturn => {
  const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
  const dispatch = useDispatch<ReduxDispatch>();
  return {
    useAppSelector,
    dispatch,
  };
};

export default useRedux;
