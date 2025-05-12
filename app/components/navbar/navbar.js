import {
  AppShell,
  NavLink,
  ScrollArea,
  Text,
  Group,
  Avatar,
  Stack,
  Divider,
  Skeleton,
} from "@mantine/core";

import {
  IconHome,
  IconStar,
  IconHistory,
  IconSettings,
  IconDashboard,
} from "@tabler/icons-react";
import { useState } from "react";
import { useWeatherState } from "../hook/useWeatherState";
import ButtonClose from "../buttons/closeButton";
import { useRef } from "react";
import Link from "next/link";
import SettingsNavButton from "../helpers/settingsNavButton";
import { sidebarOpenAtom } from "../state/sidebarAtoms";
import { useAtom } from "jotai";

export default function DashboardNavbar() {
  const [, setSidebarOpen] = useAtom(sidebarOpenAtom);

  //Scroll to view with highlight
  const favoritesRef = useRef(null);
  const historyRef = useRef(null);
  const [favoriteHighlighted, setFavoriteHighlighted] = useState(false);
  const [historyHighlighted, setHistoryHighlighted] = useState(false);

  const {
    selectedLocation,
    setSelectedLocation,
    history,
    favorites,
    handleAddFavorite,
    handleRemoveFavorite,
  } = useWeatherState();

  // Function to scroll to a specific section and highlight it
  const scrollToView = (action, state) => {
    if (action === favoritesRef && favorites.length <= 0) {
      alert("No favorites yet! Add a location to favorites.");
      return;
    }
    if (action === historyRef && history.length <= 0) {
      alert(
        "No history available. Please browse locations to save your search history."
      );
      return;
    }
    if (action.current) {
      action.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      state(true);
      setTimeout(() => state(false), 800); // remove highlight after 800ms
    }
  };

  return (
    <AppShell.Navbar p="md">
      <AppShell.Section grow component={ScrollArea}>
        {/* Main Navigation */}
        <Stack gap="sm">
          <NavLink
            component={Link}
            href="/"
            label="Home"
            leftSection={<IconHome size={20} />}
          />
          <NavLink
            component={Link}
            href="/dashboard"
            label="Dashboard"
            leftSection={<IconDashboard size={20} />}
            active
            variant="filled"
          />
          <NavLink
            label="Favorites"
            leftSection={<IconStar size={20} />}
            onClick={() => scrollToView(favoritesRef, setFavoriteHighlighted)}
          />
          <NavLink
            label="History"
            leftSection={<IconHistory size={20} />}
            onClick={() => {
              scrollToView(historyRef, setHistoryHighlighted);
            }}
          />
          {/* settings button */}
          <SettingsNavButton />
        </Stack>
        {/* Saved Locations Section */}
        <Divider my="md" />
        <Text fw={500} mb="sm" px="md">
          Favorites
        </Text>
        <Stack ref={favoritesRef} pos="relative">
          {/* Mantine skeleton-style highlight */}
          {favoriteHighlighted && (
            <Skeleton
              height="100%"
              width="100%"
              // radius="md"
              animate
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                opacity: 0.4,
                transition: "opacity 0.6s ease-in-out",
              }}
            />
          )}
          <Stack gap="xs" px="md">
            {favorites.map((location) => (
              <Group
                key={location.id}
                justify="space-between"
                wrap="nowrap"
                style={{ cursor: "pointer" }}
              >
                {/* Location details (clickable) */}
                <Group
                  wrap="nowrap"
                  onClick={() => {
                    setSelectedLocation(location);
                    if (window.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                >
                  <Avatar size="sm" variant="transparent">
                    {favorites.some((fav) => fav.name === location.name)
                      ? "⭐"
                      : "🌍"}
                  </Avatar>
                  <Text size="sm">{location.name}</Text>
                </Group>

                {/* Close button */}
                <ButtonClose
                  size="sm"
                  id={location.id}
                  action={handleRemoveFavorite}
                />
              </Group>
            ))}
          </Stack>
        </Stack>

        {/* History Section */}
        <Divider my="md" />
        <Text fw={500} mb="sm" px="md">
          Recent Searches
        </Text>
        <Stack gap="xs" px="md" ref={historyRef} pos="relative">
          {/* Mantine skeleton-style highlight */}
          {historyHighlighted && (
            <Skeleton
              height="100%"
              width="100%"
              // radius="md"
              animate
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1,
                opacity: 0.6,
                transition: "opacity 0.6s ease-in-out",
              }}
            />
          )}
          {history.slice(0, 5).map((item, index) => (
            <Group
              key={index}
              wrap="nowrap"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedLocation(item);
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
            >
              <Avatar size="sm" variant="transparent">
                ⏱️
              </Avatar>
              <div>
                <Text size="sm">{item.name}</Text>
                <Text size="xs" c="dimmed">
                  {new Date(item.timestamp).toLocaleString()}
                </Text>
              </div>
            </Group>
          ))}
        </Stack>
      </AppShell.Section>

      {/* Current Weather Summary */}
      <div>
        <Divider my="md" />
        <Group gap="sm">
          <Avatar size="md" variant="transparent">
            {selectedLocation ? "📍" : "🌍"}
          </Avatar>
          <div>
            <Text size="sm">
              {selectedLocation?.name || "Current Location"}
            </Text>
            {selectedLocation && (
              <button
                onClick={handleAddFavorite}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--mantine-color-blue-6)",
                  cursor: "pointer",
                  padding: 0,
                  marginTop: "4px",
                }}
              >
                <Text size="sm">Add to favorites</Text>
              </button>
            )}
          </div>
        </Group>
      </div>
    </AppShell.Navbar>
  );
}
