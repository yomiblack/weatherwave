import {
  Button,
  Container,
  Title,
  Text,
  Stack,
  Group,
  Image,
  Affix,
} from "@mantine/core";
import {
  IconCloudStorm,
  IconTemperature,
  IconMapPin,
} from "@tabler/icons-react";
import Link from "next/link";
import ThemeToggle from "./components/header/themeToggle";

export default function Home() {
  return (
    <Container
      size="xs"
      py="xl"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack align="center" gap="xl" w="100%">
        <Group gap="xs">
          <IconCloudStorm size={32} stroke={1.5} />
          <Title order={1} style={{ fontFamily: "Greycliff CF, sans-serif" }}>
            WeatherWave
          </Title>
        </Group>

        <Image
          src="/home/weatherIllustration2.png"
          alt="Weather dashboard illustration"
          width={300}
          height={200}
          style={{ objectFit: "contain" }}
        />

        <Stack gap="xs" align="center">
          <Group gap="sm">
            <IconTemperature color="var(--mantine-color-blue-5)" />
            <Text size="lg">Real-time weather data</Text>
          </Group>
          <Group gap="sm">
            <IconMapPin color="var(--mantine-color-green-5)" />
            <Text size="lg">Global location search</Text>
          </Group>
        </Stack>

        <Button
          component={Link}
          href="/dashboard"
          size="lg"
          radius="xl"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
          rightSection={<IconCloudStorm size={20} />}
          fullWidth
          style={{ marginTop: 20 }}
        >
          Launch Dashboard
        </Button>
      </Stack>

      {/* Theme Toggle Placement */}
      <Affix position={{ bottom: 20, right: 20 }} zIndex={100}>
        <ThemeToggle />
      </Affix>
    </Container>
  );
}
