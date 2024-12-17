import "./css/list.scss";
import { useState } from "react";
import { login } from "../interface";
import useAppSelector from "../hooks/useAppSelector";
import useRoute from "../hooks/useRoute";

export default function Login() {
  const [login, setLogin] = useState<login>({
    id: "",
    pw: "",
  });
  const { dispatch } = useAppSelector();
  const { navigate } = useRoute();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "id") {
      setLogin({...login, id: e.target.value});
    } else {
      setLogin({...login, pw: e.target.value})
    }
  }

    const handleClick = () => {
      dispatch(loginUser(login))
      navigate("/")
    };

    const handleJoin = () => {
      navigate("/join")
    }

    return (
      <div className="login-main-div">
        <div className="login-content-div">
          <div className="login-input-div">
            <h3>로그인</h3>
            <input className="login-input-style" type="text" name="id" onChange={handleChange} placeholder="ID" />
            <input className="login-input-style" type="password" name="pw" onChange={handleChange} placeholder="PW" />
            <div>
              <button className="login-button-style" onClick={handleClick}>
                로그인
              </button>
              <div></div>
              <button className="login-button-style" onClick={handleJoin}>회원가입</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

