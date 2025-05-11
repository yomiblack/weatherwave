import { Card, Text, Title, Avatar, Group } from "@mantine/core";
import { IconDroplet, IconWind, IconThermometer } from "@tabler/icons-react";
import { getWeatherIcon } from "../helpers/weatherIcons";

export default function CurrentWeather({ currentWeather }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between">
        <Title order={2}>Current Weather</Title>
        <Title order={4}>
          {currentWeather?.name}, {currentWeather?.sys?.country}
        </Title>
        <Avatar size="xl" variant="transparent">
          {currentWeather && getWeatherIcon(currentWeather.weather[0].icon)}
        </Avatar>
      </Group>

      <Group mt="md" align="flex-end">
        <Title order={1}>{Math.round(currentWeather?.main?.temp)}°C</Title>
        <Text size="lg" c="dimmed">
          {currentWeather?.weather[0]?.description}
        </Text>
      </Group>

      <Group mt="md" gap="xl">
        <Group gap="xs">
          <IconThermometer size={18} />
          <Text>Feels {Math.round(currentWeather?.main?.feels_like)}°C</Text>
        </Group>
        <Group gap="xs">
          <IconDroplet size={18} />
          <Text>{currentWeather?.main?.humidity}%</Text>
        </Group>
        <Group gap="xs">
          <IconWind size={18} />
          <Text>{Math.round(currentWeather?.wind?.speed * 3.6)} km/h</Text>
        </Group>
      </Group>
    </Card>
  );
}
