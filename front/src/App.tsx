import { createBrowserRouter, RouterProvider } from "react-router";
import List from "./component/board/List";
import View from "./component/board/View";
import Write from "./component/board/Write";
import Login from "./component/board/Login";
import Layout from "./component/board/Layout";
import Join from "./component/board/Join";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <List /> },
        { path: "write", element: <Write /> },
        { path: "view/:uid", element: <View /> },
        { path: "login", element: <Login /> },
        { path: "join", element: <Join /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}
