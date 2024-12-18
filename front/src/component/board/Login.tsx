import "./css/list.scss";
import { useState } from "react";
import { login } from "../interface";
import useRoute from "../hooks/useRoute";
import useLogInOut from "../hooks/useLogInOut";

export default function Login() {
  const [userInfo, setUserInfo] = useState<login>({
    id: "",
    pw: "",
  });
  const { navigate } = useRoute();
  // login logout 커스텀 훅
  const { login } = useLogInOut();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "id") {
      setUserInfo({ ...userInfo, id: e.target.value });
    } else {
      setUserInfo({ ...userInfo, pw: e.target.value });
    }
  };

  // click 이벤트를 모아둠
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    switch (name) {
      case "login" :
        login(userInfo);
        navigate("/");
        break;
      case "join" :
        navigate("/join");
        break;
      default:
    }
  }

  return (
    <div className="login-main-div">
      <div className="login-content-div">
        <div className="login-input-div">
          <h3>로그인</h3>
          <input className="login-input-style" type="text" name="id" onChange={handleChange} placeholder="ID" />
          <input className="login-input-style" type="password" name="pw" onChange={handleChange} placeholder="PW" />
          <div>
            <button className="login-button-style" name="login" onClick={handleClick}>
              로그인
            </button>
            <div></div>
            <button className="login-button-style" name="join" onClick={handleClick}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
