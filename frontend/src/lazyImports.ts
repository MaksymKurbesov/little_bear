import { lazy } from "react";

export const MainPage = lazy(() => import("./Pages/Main/Main.tsx"));

export const FriendsPage = lazy(() => import("./Pages/Friends/Friends.tsx"));

export const LeadersPage = lazy(() => import("./Pages/Leaders/Leaders.tsx"));

export const DailyRewardPage = lazy(
  () => import("./Pages/DailyReward/DailyReward.tsx"),
);

export const AirdropPage = lazy(() => import("./Pages/Airdrop/Airdrop.tsx"));

export const TasksPage = lazy(() => import("./Pages/Tasks/Tasks.tsx"));

export const SettingsPage = lazy(() => import("./Pages/Settings/Settings.tsx"));

export const SkinsPage = lazy(() => import("./Pages/Skins/Skins.tsx"));
