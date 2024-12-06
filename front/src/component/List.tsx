import  { useEffect } from "react";
import { Link } from "react-router-dom";
import "./list.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import { axiosBoard } from "./store/boardSlice";


export default function List() {
  // const [data, setData] = useState<Board[]>([{
  //   id: 0,
  //   title: "",
  //   content: "",
  //   author: "",
  //   hits: 0,
  // }]);

  // useEffect(() => {
  //   const res = async () => {
  //     const response = await axios.get("http://localhost:8080/getBoard");
  //     console.log(response);
  //     setData(response.data);
  //   };
  //   res();
  // }, []);
  const dispatch = useDispatch<AppDispatch>();
  const {boards, loading, error} = useSelector((state: RootState) => state.board);
  
  useEffect(() => {
    dispatch(axiosBoard());
  }, [dispatch]);

  return (
    <div className="list-main-div">
      <div className="header-div">
        <h2>게시판</h2>
      </div>
      <div className="link-div">
        <Link to={"/write"} style={{ textDecoration: "none"}} className="link-style">
          <button className="link-button">작성</button>
        </Link>
      </div>
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
              <p>{data.id}</p>
              <p>{data.title}</p>
              <p>{data.author}</p>
              <p>{data.date}</p>
              <p>{data.hits}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
