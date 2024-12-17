import {  useState } from "react";
import { user } from "../interface";
import useAppSelector from "../hooks/useAppSelector";
import useRoute from "../hooks/useRoute";

export default function Join() {
  const [join, setJoin] = useState<user>({
    id: "",
    pw: "",
    name: "",
  });
  const { dispatch } = useAppSelector();
  const { navigate } = useRoute();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "id") {
      setJoin({ ...join, id: e.target.value });
    } else if (name === "pw") {
      setJoin({ ...join, pw: e.target.value });
    } else {
      setJoin({ ...join, name: e.target.value });
    }
  };

  const handleClick = () => {
    dispatch(joinUser(join));
    navigate("/login");
    alert("회원가입 성공")
  };


  return (
    <div className="join-main-div">
      <div className="join-content-div">
        <div className="join-input-div">
          <h3>회원가입</h3>
          <input className="join-input-style" type="text" name="id" onChange={handleChange} placeholder="ID" />
          <input className="join-input-style" type="password" name="pw" onChange={handleChange} placeholder="PW" />
          <input className="join-input-style" type="text" name="name" onChange={handleChange} placeholder="NAME" />
          <div>
            <button className="join-button-style" onClick={handleClick}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
