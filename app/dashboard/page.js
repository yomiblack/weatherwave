"use client";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import ThemeToggle from "../components/header/themeToggle";

import WeatherDashboard from "../components/main/main";
import DashboardNavbar from "../components/navbar/navbar";
import LocationSearch from "../components/header/searchBar";

export default function Dashboard() {
  const [opened, { toggle }] = useDisclosure();

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
