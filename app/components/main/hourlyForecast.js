import {
  AppShell,
  Grid,
  Card,
  Text,
  Title,
  Avatar,
  Group,
  Stack,
  SimpleGrid,
  Progress,
  Badge,
  Divider,
  ScrollArea,
  Container,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconSun,
  IconMoon,
  IconDroplet,
  IconWind,
  IconSunrise,
  IconSunset,
  IconThermometer,
  IconMathSec,
} from "@tabler/icons-react";
import { getWeatherIcon } from "../helpers/weatherIcons";

export default function HourlyForecast({ hourlyForecast }) {
  return (
    <Grid.Col span={12}>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Title order={4} mb="sm">
          Hourly Forecast
        </Title>
        <ScrollArea>
          <Group gap="md">
            {hourlyForecast?.map((hour, index) => (
              <Stack key={index} align="center" gap={0}>
                <Text size="sm">{hour.time}</Text>
                <Text size="lg">{hour.icon}</Text>
                <Text fw={500}>{hour.temp}°</Text>
              </Stack>
            ))}
          </Group>
        </ScrollArea>
      </Card>
    </Grid.Col>
  );
}
