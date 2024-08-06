import { createBrowserRouter } from "react-router-dom";
import App from "./App";
// import Friends from "./Pages/Friends/Friends.tsx";
// import Main from "./Pages/Main/Main";
// import Leaders from "./Pages/Leaders/Leaders.tsx";
// import DailyReward from "./Pages/DailyReward/DailyReward.tsx";
// import Airdrop from "./Pages/Airdrop/Airdrop.tsx";
// import Tasks from "./Pages/Tasks/Tasks.tsx";
// import Settings from "./Pages/Settings/Settings.tsx";
// import Skins from "./Pages/Skins/Skins.tsx";
import { Suspense } from "react";
import {
  AirdropPage,
  DailyRewardPage,
  FriendsPage,
  LeadersPage,
  MainPage,
  SettingsPage,
  SkinsPage,
  TasksPage,
} from "./lazyImports.ts";
import LoadSpinning from "./SharedUI/LoadSpinning/LoadSpinning.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={
              <div className={"suspense"}>
                <LoadSpinning />
              </div>
            }
          >
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "/referrals",
        element: (
          <Suspense
            fallback={
              <div className={"suspense"}>
                <LoadSpinning />
              </div>
            }
          >
            <FriendsPage />
          </Suspense>
        ),
      },
      {
        path: "/leaders",
        element: (
          <Suspense
            fallback={
              <div className={"suspense"}>
                <LoadSpinning />
              </div>
            }
          >
            <LeadersPage />
          </Suspense>
        ),
      },
      {
        path: "/daily-reward",
        element: (
          <Suspense
            fallback={
              <div className={"suspense"}>
                <LoadSpinning />
              </div>
            }
          >
            <DailyRewardPage />
          </Suspense>
        ),
      },
      {
        path: "/airdrop",
        element: (
          <Suspense
            fallback={
              <div className={"suspense"}>
                <LoadSpinning />
              </div>
            }
          >
            <AirdropPage />
          </Suspense>
        ),
      },
      {
        path: "/tasks",
        element: (
          <Suspense
            fallback={
              <div className={"suspense"}>
                <LoadSpinning />
              </div>
            }
          >
            <TasksPage />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense
            fallback={
              <div className={"suspense"}>
                <LoadSpinning />
              </div>
            }
          >
            <SettingsPage />
          </Suspense>
        ),
      },
      {
        path: "/skins",
        element: (
          <Suspense
            fallback={
              <div className={"suspense"}>
                <LoadSpinning />
              </div>
            }
          >
            <SkinsPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default routes;
