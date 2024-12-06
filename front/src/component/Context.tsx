import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./list.scss";
import { Link, useNavigate } from "react-router-dom";
import { Board } from "./interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { saveBoard } from "./store/boardListSlice";

const date:Date = new Date();
const year:number =date.getFullYear();
const month:number =date.getMonth() + 1;
const day:number =date.getDate();
const formatDate:string = `${year}-${month}-${day}`;

export default function Context() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline", "strike"],
        ["blockquote", "code-block"],
        ["image"],
        ["clean"],
      ],
    },
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSend = async () => {
    const value: Board = {
      title: title,
      content: content,
      author: "admin",
      date: formatDate,
    };
    try {
      await dispatch(saveBoard(value)).unwrap();
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="content-main-box">
      <div className="link-div">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <h2>게시판</h2>
        </Link>
      </div>
      <div style={{ height: 370 }} className="content-box">
        <input
          type="text"
          placeholder="Title"
          className="title-input"
          onChange={handleChange}
        />
        <ReactQuill
          style={{ width: 1000, height: 300 }}
          modules={modules}
          onChange={setContent}
        />
      </div>
      <button className="button-send" onClick={handleSend}>
        작성
      </button>
    </div>
  );
}
