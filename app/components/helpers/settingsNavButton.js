import { useState } from "react";
import { UnstyledButton, Group, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import SettingsModal from "../modals/settings";

export default function SettingsNavButton() {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <>
      <UnstyledButton
        onClick={() => setModalOpened(true)}
        style={{ width: "100%", padding: "8px 12px" }}
      >
        <Group>
          <IconSettings size={20} />
          <Text>Settings</Text>
        </Group>
      </UnstyledButton>

      <SettingsModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </>
  );
}
