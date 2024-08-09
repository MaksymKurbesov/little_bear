import { createBrowserRouter } from "react-router-dom";
import App from "./App";
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
