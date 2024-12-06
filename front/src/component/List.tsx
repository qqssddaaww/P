import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./list.scss";

interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  hits: number;
}

export default function List() {
  const [data, setData] = useState<Board[]>([{
    id: 0,
    title: "",
    content: "",
    author: "",
    hits: 0,
  }]);

  useEffect(() => {
    const res = async () => {
      const response = await axios.get("http://localhost:8080/getBoard");
      console.log(response);
      setData(response.data);
    };
    res();
  }, []);

  return (
    <div className="list-main-div">
      <div className="header-div">
        <h2>게시판</h2>
      </div>
      <div className="link-div">
        <Link to={"/write"} style={{ textDecoration: "none" }}>
          <div className="">작성</div>
        </Link>
      </div>
      <div>
        <div className="list-title-div">
          <p>번호</p>
          <p>제목</p>
          <p>작성자</p>
        </div>
        <div className="list-div">
          {data.map((data) => (
            <div className="list-content-div">
              <p>{data.id}</p>
              <p>{data.title}</p>
              <p>{data.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
