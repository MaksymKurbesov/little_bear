import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import Friends from "./Pages/Friends/Friends.tsx";
// import Main from "./Pages/Main/Main";
// import Leaders from "./Pages/Leaders/Leaders.tsx";
// import DailyReward from "./Pages/DailyReward/DailyReward.tsx";
// import Airdrop from "./Pages/Airdrop/Airdrop.tsx";
// import Tasks from "./Pages/Tasks/Tasks.tsx";
// import Settings from "./Pages/Settings/Settings.tsx";
// import SystemLevels from "./Pages/SystemLevels/SystemLevels.tsx";
import { Suspense } from "react";
import {
  AirdropPage,
  DailyRewardPage,
  FriendsPage,
  LeadersPage,
  MainPage,
  SettingsPage,
  SystemLevelsPage,
  TasksPage,
} from "./lazyImports.ts";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div className={"suspense"}>Loading...</div>}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "/referrals",
        element: (
          <Suspense fallback={<div className={"suspense"}>Loading...</div>}>
            <FriendsPage />
          </Suspense>
        ),
      },
      {
        path: "/leaders",
        element: (
          <Suspense fallback={<div className={"suspense"}>Loading...</div>}>
            <LeadersPage />
          </Suspense>
        ),
      },
      {
        path: "/daily-reward",
        element: (
          <Suspense fallback={<div className={"suspense"}>Loading...</div>}>
            <DailyRewardPage />
          </Suspense>
        ),
      },
      {
        path: "/airdrop",
        element: (
          <Suspense fallback={<div className={"suspense"}>Loading...</div>}>
            <AirdropPage />
          </Suspense>
        ),
      },
      {
        path: "/tasks",
        element: (
          <Suspense fallback={<div className={"suspense"}>Loading...</div>}>
            <TasksPage />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<div className={"suspense"}>Loading...</div>}>
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: "/levels",
        element: (
          <Suspense fallback={<div className={"suspense"}>Loading...</div>}>
            <SystemLevelsPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default routes;
