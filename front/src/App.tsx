import { createBrowserRouter, RouterProvider } from "react-router";
import List from "./component/board/List";
import View from "./component/board/View";
import Write from "./component/board/Write";
import Login from "./component/board/Login";
import Layout from "./component/board/Layout";
import Join from "./component/board/Join";
import { useEffect } from "react";
import { checkSession } from "./component/store/userSlice";
import useAppSelector from "./component/hooks/useAppSelector";

export default function App() {
  const { dispatch, user } = useAppSelector();

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
        { path: "join", element: <Join />},
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
