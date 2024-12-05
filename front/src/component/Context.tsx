import React, {  useState } from "react";
import ReactQuill from "react-quill";
import "./board.scss";
import axios from "axios";

export default function Context() {
  const [value, setValue] = useState("");

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

  const handleSend = async () => {
    try{
        const res = await axios.post('http://loaclhost:8080/get-content',value);
        console.log(res)
    } catch (e) {
        console.log(e)
  }
}
  return (
    <div className="content-box">
      <div style={{height: 370}}>
        <input type="text" placeholder="Title" className="title-input" />
        <ReactQuill
          style={{ width: 1000, height: 300 }}
          modules={modules}
          onChange={setValue}
        />
      </div>
      <button className="button-send" onClick={handleSend}>작성</button>
    </div>
  );
}
