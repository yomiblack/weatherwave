import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./Demo.module.css";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      {computedColorScheme === "light" ? (
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      ) : (
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      )}
    </ActionIcon>
  );
}
