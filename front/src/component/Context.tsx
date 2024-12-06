import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./list.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Board } from "./interface";

export default function Context() {
  const [value, setValue] = useState<Board>({
    title: "",
    content: "",
    author: "",
  });

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
    setValue({
      title: title,
      content: content,
      author: "admin",
    });
    try {
      const res = await axios.post("http://localhost:8080/save-content", value);
      console.log("res : "+ res.data);
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
