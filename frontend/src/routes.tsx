import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Friends from "./Pages/Friends/Friends.tsx";
import Main from "./Pages/Main/Main";
import Leaders from "./Pages/Leaders/Leaders.tsx";
import DailyReward from "./Pages/DailyReward/DailyReward.tsx";
import Airdrop from "./Pages/Airdrop/Airdrop.tsx";
import Tasks from "./Pages/Tasks/Tasks.tsx";
import Settings from "./Pages/Settings/Settings.tsx";
import SystemLevels from "./Pages/SystemLevels/SystemLevels.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/referrals", element: <Friends /> },
      { path: "/leaders", element: <Leaders /> },
      { path: "/daily-reward", element: <DailyReward /> },
      { path: "/airdrop", element: <Airdrop /> },
      { path: "/tasks", element: <Tasks /> },
      { path: "/settings", element: <Settings /> },
      { path: "/levels", element: <SystemLevels /> },
    ],
  },
]);

export default routes;
