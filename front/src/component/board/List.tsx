import { useEffect } from "react";
import { Link } from "react-router";
import "./css/list.scss";
import Pagination from "./Pagination";
import useRoute from "../hooks/useRoute";

export default function List() {
    // 커스텀 훅 만들어서 사용
    // user, boards, size 가져오는 api
  const { page, param } = useRoute();

  useEffect(() => {
    // 보드 전부 가져오는거랑 페이지네이션 보드 API

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function handleHits(uid: number | undefined) {
    // 조회수 올라가는 API
  }

  return (
    <div className="list-main-div">
      

      {user.id !== "" ? (
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
