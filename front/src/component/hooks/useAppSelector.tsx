import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export default function useAppSelector() {
  const dispatch = useDispatch<AppDispatch>();
  const { boards } = useSelector((state: RootState) => state.boards);
  const size = useSelector((state: RootState) => state.boards.size);
  const { user } = useSelector((state: RootState) => state.user);

  return { dispatch, boards, size, user };
}
