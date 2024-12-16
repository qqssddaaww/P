import { BrowserRouter, Route, Routes } from "react-router";
import List from "./component/board/List";
import View from "./component/board/View";
import Write from "./component/board/Write";
import Login from "./component/board/Login";
import Layout from "./component/board/Layout";
import Join from "./component/board/Join";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkSession } from "./component/store/userSlice";
import { AppDispatch, RootState } from "./component/store/store";

export default function App() {
  
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state:RootState) => state.user);
  
  useEffect(() => {
    dispatch(checkSession());
    console.dir(user)
  },[dispatch])

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
