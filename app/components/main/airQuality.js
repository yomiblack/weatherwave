import { Card, Text, Title, Stack, Progress } from "@mantine/core";

export default function AirQuality({ currentWeather }) {
  // Air quality
  const aqi = currentWeather
    ? Math.floor((currentWeather?.main?.humidity / 100) * 150)
    : 0;
  const aqiStatus = aqi > 100 ? "Unhealthy" : aqi > 50 ? "Moderate" : "Good";
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Title order={4} mb="sm">
        Air Quality
      </Title>
      <Stack>
        <Text>
          AQI: {aqi} ({aqiStatus})
        </Text>
        <Progress
          value={aqi > 150 ? 100 : (aqi / 150) * 100}
          size="sm"
          color={aqi > 100 ? "red" : aqi > 50 ? "yellow" : "green"}
        />
      </Stack>
    </Card>
  );
}
