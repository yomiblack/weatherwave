import { IconXboxX } from "@tabler/icons-react";
import { CloseButton } from "@mantine/core";

export default function ButtonClose({ id, action }) {
  return (
    <CloseButton
      onClick={() => action(id)}
      icon={<IconXboxX size={18} stroke={1.5} />}
    />
  );
}
