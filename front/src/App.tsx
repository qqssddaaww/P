import { createBrowserRouter, RouterProvider } from "react-router";
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
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(checkSession());
    console.dir(user);
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <List /> },
        { path: "write", element: <Write /> },
        { path: "view/:uid", element: <View /> },
        { path: "login", element: <Login /> },
        { path: "/join", element: <Join />},
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
