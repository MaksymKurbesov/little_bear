import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Referrals from "./Pages/Referrals/Referrals";
import Main from "./Pages/Main/Main";
import News from "./Pages/News/News";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/referrals", element: <Referrals /> },
      { path: "/news", element: <News /> },
    ],
  },
]);

export default routes;
