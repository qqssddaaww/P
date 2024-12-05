import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Board {
    num: number;
    title: string;
    content: string
    author: string;
    hits :number;
}



export default function List() {

    const [data, setData] = useState<unknown>("");

    useEffect(() => {
        const res = async () => {
            const response = await axios.get("http://localhost:8000/api/posts");
            console.log(response)
            setData(response);
        }
        res();
    },[])

  return (
    <div>
      <div>
        <h2>게시판</h2>
      </div>
      <div>
        <Link to={"/write"}>
            작성
        </Link>
      </div>
      <div>


      </div>
    </div>
  );
}
