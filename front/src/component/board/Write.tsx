import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "./css/list.scss";
import "./css/ql.scss";
import {  useLocation, useNavigate } from "react-router-dom";
import { Board, chBoard } from "../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { changeBoard, saveBoard } from "../store/AsyncThunk";

const date: Date = new Date();
const year: number = date.getFullYear();
const month: string = String(date.getMonth() + 1).padStart(2, "0");
const day: string = String(date.getDate()).padStart(2, "0");
const formatDate: string = `${year}-${month}-${day}`;
// date: new Date().toISOString().split('T')[0],

export default function Write() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const { state } = useLocation();
  const value: Board = {
    title: title,
    content: content,
    author: "admin",
    date: formatDate,
    hits: 0,
  };
  const valueCh: chBoard = {
    ...(state?.id && { id: state.id }),
    title: title,
    content: content,
    date: formatDate,
  };
  useEffect(() => {
    if (state) {
      setContent(state.content);
      setTitle(state.title);
    }
  }, [state]);

  const modules = {
    toolbar: {
      container: [[{ header: [1, 2, 3, 4, 5, false] }], ["bold", "underline", "strike"], ["blockquote", "code-block"], ["image"], ["clean"]],
    },
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      if (title === "" || content === "") {
        alert("제목과 내용을 모두 입력하세요.");
        return;
      } else {
        if (e.currentTarget.name === "save") {
          dispatch(saveBoard(value)).unwrap();
        } else if (e.currentTarget.name === "change") {
          dispatch(changeBoard(valueCh)).unwrap();
        }
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  console.log(content) 

  return (
    <div className="write-main-box">
      <div className="write-box">
        <input type="text" placeholder="Title" className="write-title-input" value={title} onChange={handleChange} />
        <ReactQuill className="write-react-quill" modules={modules} onChange={setContent} value={content} />
      </div>
      <div className="write-button-div">
        {state ? (
          <button className="write-button-send" name="change" onClick={handleSend}>
            수정
          </button>
        ) : (
          <button className="write-button-send" name="save" onClick={handleSend}>
            작성
          </button>
        )}
      </div>
    </div>
  );
}