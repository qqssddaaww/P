import { useEffect, useState } from "react";
import { Board } from "./interface";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function View() {
  const { id } = useParams();
  const [board, setBoard] = useState<Board>();

  useEffect(() => {
    const board = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/getOne?id=${id}`);
        setBoard(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    board();
  }, [id]);
  return (
    <>
      <div>
        id : {board?.id}
        title : {board?.title}
        content : {board?.content}
        author : {board?.author}
        date : {board?.date}
        hits : {board?.hits}
      </div>
    </>
  );
}
