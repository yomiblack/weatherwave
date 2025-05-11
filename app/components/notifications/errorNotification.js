"use client";
import { IconX } from "@tabler/icons-react";
import { Notification, Box } from "@mantine/core";
import { useState } from "react";

export default function ErrorNotification({ title, body }) {
  const [visible, setVisible] = useState(true);
  const xIcon = <IconX size={20} />;

  if (!visible) return null;

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", // center vertically
        padding: "1rem",
      }}
    >
      <Notification
        icon={xIcon}
        color="red"
        title={title}
        onClose={() => setVisible(false)}
        closeButtonProps={{ "aria-label": "Hide notification" }}
        sx={(theme) => ({
          width: "100%",
          maxWidth: 400,
          [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
          },
        })}
      >
        {body}
      </Notification>
    </Box>
  );
}
