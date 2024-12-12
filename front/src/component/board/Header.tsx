import { Link } from "react-router";

import "./css/list.scss";

export default function Header() {
  return (
    <div className="header-div">
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h2>게시판</h2>
      </Link>
    </div>
  );
}
