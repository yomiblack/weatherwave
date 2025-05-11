import { Modal, Text, Stack, Center } from "@mantine/core";
import ThemeToggle from "../header/themeToggle";

export default function SettingsModal({ opened, onClose }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="App Settings"
      styles={{
        title: {
          textAlign: "center",
          width: "100%",
          fontWeight: 600,
        },
      }}
      transitionProps={{
        transition: "fade",
        duration: 300,
        timingFunction: "ease-in-out",
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack align="center" gap="md">
        <Center>
          <ThemeToggle />
        </Center>
        <Text c="dimmed" size="sm" ta="center">
          Change between light and dark mode
        </Text>
      </Stack>
    </Modal>
  );
}
