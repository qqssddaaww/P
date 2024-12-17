import { Link } from "react-router";

import "./css/list.scss";
import useRoute from "../hooks/useRoute";

export default function Header() {
  // USER 정보 API
  const { navigate } = useRoute();

  const handlelogout = () => {
    // 로그아웃 API
    navigate("/");
  };
  return (
    <div className="list-header-div">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h2>게시판</h2>
      </Link>
      <div>
        {user.id === "" ? (
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button className="list-login-button">로그인</button>
          </Link>
        ) : (
          <button className="list-login-button" onClick={handlelogout}>
            {user.name}
          </button>
        )}
      </div>
    </div>
  );
}
