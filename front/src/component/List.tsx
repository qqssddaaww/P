import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./list.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import Pagination from "./Pagination";
import { axiosBoard, increaseHits, pageBoard } from "./store/AsyncThunk";

export default function List() {
  const dispatch = useDispatch<AppDispatch>();
  const { boards } = useSelector((state: RootState) => state.boards);
  const size = useSelector((state: RootState) => state.boards.size);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const param = {
    page: page ? Number(page) : 1,
    size: 15,
  };
  useEffect(() => {
    // dispatch(sizeBoard())
    dispatch(axiosBoard());
    dispatch(pageBoard(param));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page]);

  function handleHits(id: number | undefined) {
    dispatch(increaseHits(id)); //
  }
  return (
    <div className="list-main-div">
      <div className="list-header-div">
        <h2>게시판</h2>
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
            <div className="list-content-div">
              <Link to={`/view/${data.id}`} style={{ textDecoration: "none" }} className="list-content-link" onClick={() => handleHits(data.id)}>
                <p>{data.id}</p>
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
