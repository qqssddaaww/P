import { Link } from "react-router";
import "./css/list.scss";
import useRoute from "../hooks/useRoute";
import useSession from "../hooks/useSession";
import useLogout from "../hooks/useLogInOut";

export default function Header() {
  // USER 정보 API
  const { navigate } = useRoute();
  const { logout } = useLogout();
  const { session } = useSession();

  const handlelogout = async () => {
    // 로그아웃 API
    logout();
    navigate("/");
  };

  return (
    <div className="list-header-div">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h2>게시판</h2>
      </Link>
      <div>
        {!session || session.id === "" ? (
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <button className="list-login-button">로그인</button>
          </Link>
        ) : (
          <button className="list-login-button" onClick={handlelogout}>
            {session?.name}
          </button>
        )}
      </div>
    </div>
  );
}
