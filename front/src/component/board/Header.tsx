import { Link } from "react-router";

import "./css/list.scss";
import useAppSelector from "../hooks/useAppSelector";
import useRoute from "../hooks/useRoute";

export default function Header() {
  const { user, dispatch } = useAppSelector();
  const { navigate } = useRoute();

  const handlelogout = () => {
    dispatch(logoutUser());
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
