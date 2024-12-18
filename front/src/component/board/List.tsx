import { Link } from "react-router";
import "./css/list.scss";
import Pagination from "./Pagination";
import useRoute from "../hooks/useRoute";
import { Board, user } from "../interface";
import axiosInstance from "../../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function List() {
  const { page, param } = useRoute();
  // 커스텀 훅 만들어서 사용
  // user, boards, size 가져오는 api
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await axiosInstance.get<user>("http://localhost:8080/check-session");
      return res.data;
    },
  });
  const { data: size } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const res = await axiosInstance.get<Board[]>(`http://localhost:8080/get-board`);
      return res.data.length;
    },
  });
  const { data: pagination } = useQuery({
    queryKey: ["pagination", param],
    queryFn: async () => {
      const res = await axiosInstance.get(`http://localhost:8080/page-board?page=${param.page - 1}&size=${param.size}`);
      return res.data;
    },
  });

  const handleHits = async (uid: number | undefined) => {
    try {
      await axiosInstance.get(`http://localhost:8080/increase-hits?uid=${uid}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="list-main-div">
      {session && session?.id !== "" ? (
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
          {pagination ? (
            pagination?.map((data: Board) => (
              <div className="list-content-div" key={data.uid}>
                <Link to={`/view/${data.uid}`} style={{ textDecoration: "none" }} className="list-content-link" onClick={() => handleHits(data.uid)}>
                  <p>{data.uid}</p>
                  <p>{data.title}</p>
                  <p>{data.author}</p>
                  <p>{data.date}</p>
                  <p>{data.hits}</p>
                </Link>
              </div>
            ))
          ) : (
            <div>글이 없습니다.</div>
          )}
        </div>
      </div>
      <Pagination totalItems={size ? size : 0} currentPage={page && parseInt(page) > 0 ? parseInt(page) : 1} pageCount={5} itemCountPerPage={15} />
    </div>
  );
}
