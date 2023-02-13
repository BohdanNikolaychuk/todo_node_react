import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
