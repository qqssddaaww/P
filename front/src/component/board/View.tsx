import { useEffect, useState } from "react";
import { Board } from "../interface";
import axios from "axios";
import "./css/list.scss";
import DOMPurify from "dompurify";
import useAppSelector from "../hooks/useAppSelector";
import useRoute from "../hooks/useRoute";

export default function View() {
  // 커스텀 훅 만들어서 사용
  const { user } = useAppSelector();
  const { uid, navigate } = useRoute();

  const [board, setBoard] = useState<Board>({
    id: "",
    title: "",
    content: "",
    author: "",
    hits: 0,
  });

  useEffect(() => {
    const board = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/get-one?uid=${uid}`);
        setBoard(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    board();
  }, [uid]);

  const handleDelete = async () => {
    try {
      await axios.post(`http://localhost:8080/delete-board?uid=${uid}`);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = () => {
    navigate(`/write`, { state: { title: board.title, content: board.content, uid: uid, id: board.id } });
  };
  return (
    <>
      <div className="view-main-div">
        <div className="view-title-div">
          <div className="view-realTitle-div">
            <h2>{board?.title}</h2>
          </div>
          <div className="view-title-side-div">
            <div className="view-date-div">{board?.date}</div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(board.content),
          }}
          className="view-content-div"
        ></div>
        {user?.id === board.id ? (
          <div className="view-2button-div">
            <div className="view-change-delete-div">
              <button className="view-change-button" onClick={handleChange}>
                수정
              </button>
            </div>
            <div></div>
            <div className="view-change-delete-div">
              <button className="view-delete-button" onClick={handleDelete}>
                삭제
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
