import { Link } from "react-router";
import "./css/list.scss";
import useRoute from "../hooks/useRoute";
import { user } from "../interface";
import axiosInstance from '../../utils/axiosInstance';
import { useQuery } from "@tanstack/react-query";

export default function Header() {
  // USER 정보 API
  const { navigate } = useRoute();
  const { data: session } = useQuery({ queryKey: ["session"], queryFn : 
    async () => {
      const res = await axiosInstance.get<user>("http://localhost:8080/check-session")
      return res.data
    },
  })  
  const handlelogout = async () => {
    // 로그아웃 API
    await axiosInstance.get("http://localhost:8080/logout")
    navigate("/");
  };
  return (
    <div className="list-header-div">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h2>게시판</h2>
      </Link>
      <div>
        {(!session || session.id === "") ? (
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
