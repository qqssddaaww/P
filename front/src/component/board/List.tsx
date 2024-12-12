import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import "./css/list.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Pagination from "./Pagination";
import { axiosBoard, increaseHits, pageBoard } from "../store/AsyncThunk";
import { logoutUser } from "../store/userSlice";

export default function List() {
  const dispatch = useDispatch<AppDispatch>();
  const { boards } = useSelector((state: RootState) => state.boards);
  const size = useSelector((state: RootState) => state.boards.size);
  const { user } = useSelector((state: RootState) => state.user);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const param = {
    page: page ? Number(page) : 1,
    size: 15,
  };
  useEffect(() => {
    dispatch(axiosBoard());
    dispatch(pageBoard(param));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  function handleHits(uid: number | undefined) {
    dispatch(increaseHits(uid)); //
  }
  const handlelogout = () => {
    dispatch(logoutUser());
  }
  return (
    <div className="list-main-div">
      <div className="list-header-div">
        <h2>게시판</h2>
        <div>
          {user.id === "" ? (
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <button className="list-login-button">로그인</button>
            </Link>
          ) : (
            <button className="list-login-button" onClick={handlelogout}>{user.name}</button>
          )}
        </div>
      </div>

      {true ? (
        <div className="list-link-div">
          <Link to={"/write"} style={{ textDecoration: "none" }} className="list-link-style">
            <button className="list-link-button">작성</button>
          </Link>
        </div>
      ) : (
        <div className="list-link-div">로그인을 해주세요</div>
      )}

      <div>
        <div className="list-title-div">
          <p>번호</p>
          <p>제목</p>
          <p>작성자</p>
          <p>작성날짜</p>
          <p>조회수</p>
        </div>
        <div className="list-div">
          {boards.map((data) => (
            <div className="list-content-div" key={data.uid}>
              <Link to={`/view/${data.uid}`} style={{ textDecoration: "none" }} className="list-content-link" onClick={() => handleHits(data.uid)}>
                <p>{data.uid}</p>
                <p>{data.title}</p>
                <p>{data.author}</p>
                <p>{data.date}</p>
                <p>{data.hits}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Pagination totalItems={size} currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1} pageCount={5} itemCountPerPage={15} />
    </div>
  );
}
