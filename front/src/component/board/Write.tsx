import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "./css/list.scss";
import "./css/ql.scss";
import { Board, chBoard } from "../interface";
import useRoute from "../hooks/useRoute";
import axiosInstance from '../../utils/axiosInstance';
import useSession from "../hooks/useSession";

const date: Date = new Date();
const year: number = date.getFullYear();
const month: string = String(date.getMonth() + 1).padStart(2, "0");
const day: string = String(date.getDate()).padStart(2, "0");
const formatDate: string = `${year}-${month}-${day}`;
// date: new Date().toISOString().split('T')[0],
const modules = {
  toolbar: {
    container: [[{ header: [1, 2, 3, 4, 5, false] }], ["bold", "underline", "strike"], ["blockquote", "code-block"], ["clean"]],
  },
};

export default function Write() {

  // 커스텀 훅 만들어서 사용
  const { state, navigate } = useRoute();
  // user 정보 가져오는  API
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const { session } = useSession();
  
  const value: Board = {
    id: session?.id,
    title: title,
    content: content,
    author: session?.name,
    date: formatDate,
    hits: 0,
  };

  const valueCh: chBoard = {
    ...(state?.uid && { uid: state.uid }),
    title: title,
    content: content,
    date: formatDate,
  };

  const axiosPost = async(url:string, data: Board | chBoard) => {
    try {
      const response = await axiosInstance.post(url, data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (state) {
      setContent(state.content);
      setTitle(state.title);
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (title === "" || content === "") {
        alert("제목과 내용을 모두 입력하세요.");
        return;
      } else {
        if (e.currentTarget.name === "save") {
            // 게시판 저장 API
            axiosPost("http://localhost:8080/save-content", value)
        } else if (e.currentTarget.name === "change") {
          // 게시판 수정 API
          axiosPost("http://localhost:8080/change-board", valueCh)
        }
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="write-main-box">
      <div className="write-box">
        <input type="text" placeholder="Title" className="write-title-input" value={title} onChange={handleChange} />
        <ReactQuill className="write-react-quill" modules={modules} onChange={setContent} value={content} />
      </div>
      <div className="write-button-div">
        <button className="write-button-send" name={session?.id === state?.id ? "change" : "save"} onClick={handleSend}>
          {session?.id === state?.id ? "수정" : "작성"}
        </button>
      </div>
    </div>
  );
}
