import { BrowserRouter, Route, Routes } from "react-router";
import List from "./component/board/List";
import View from "./component/board/View";
import Write from "./component/board/Write";
import Login from "./component/board/Login";
import Layout from "./component/board/Layout";
import Join from "./component/board/Join";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route element={<Layout />}>
            <Route path="/write" element={<Write />} />
            <Route path="/view/:uid" element={<View />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
