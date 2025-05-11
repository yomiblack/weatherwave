"use client";
import { AppShell, Burger } from "@mantine/core";
import { useRouter } from "next/navigation";
import ThemeToggle from "../components/header/themeToggle";

import WeatherDashboard from "../components/main/main";
import DashboardNavbar from "../components/navbar/navbar";
import LocationSearch from "../components/header/searchBar";
import {
  sidebarOpenAtom,
  toggleSidebarAtom,
} from "../components/state/sidebarAtoms";
import { useAtom } from "jotai";

export default function Dashboard() {
  const [opened] = useAtom(sidebarOpenAtom);
  const [, toggle] = useAtom(toggleSidebarAtom);

  const router = useRouter();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <div style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          WeatherWave
        </div>
        <LocationSearch />
        <ThemeToggle />
      </AppShell.Header>
      <DashboardNavbar />

      <WeatherDashboard />
    </AppShell>
  );
}
