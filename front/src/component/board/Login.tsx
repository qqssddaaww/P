import "./css/list.scss";
import { useEffect, useState } from "react";

export default function Login() {
    const [id , setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");


    useEffect(() => {
        console.log("id : " + id + ", pw : "+ pw)
    },[id,pw])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target;
        if (name.name === "id") {
            setId(name.value);
        } else {
            setPw(name.value);
        }
    }

  return (
    <div className="login-main-div">
      <div className="login-content-div">
        <div className="login-input-div">
            <h3>로그인</h3>
            <input className="login-input-style" type="text" name="id" onChange={handleChange} placeholder="ID"/>
            <input className="login-input-style" type="password" name="pw" onChange={handleChange} placeholder="PW"/>
            <div>
                <button className="login-button-style">로그인</button>
                <div></div>
                <button className="login-button-style">회원가입</button> 
            </div>
        </div>
      </div>
    </div>
  );
}
