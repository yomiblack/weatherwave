import { Card, Text, Title, Group, Stack, Badge } from "@mantine/core";
import { IconSunrise, IconSunset } from "@tabler/icons-react";

export default function UvIndexSun({ currentWeather }) {
  // UV index (simplified)
  const uvIndex = currentWeather
    ? Math.floor((currentWeather?.main?.temp / 30) * 10)
    : 0;
  const uvStatus =
    uvIndex > 8
      ? "Very High"
      : uvIndex > 6
      ? "High"
      : uvIndex > 3
      ? "Moderate"
      : "Low";
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Title order={4} mb="sm">
        UV Index & Sun
      </Title>
      <Stack gap="xs">
        <Badge color={uvIndex > 8 ? "red" : uvIndex > 5 ? "orange" : "green"}>
          UV Index: {uvIndex} ({uvStatus})
        </Badge>
        {currentWeather?.sys?.sunrise && (
          <Group>
            <IconSunrise />
            <Text>
              Sunrise:{" "}
              {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </Text>
          </Group>
        )}
        {currentWeather?.sys?.sunset && (
          <Group>
            <IconSunset />
            <Text>
              Sunset:{" "}
              {new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString(
                [],
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </Text>
          </Group>
        )}
      </Stack>
    </Card>
  );
}
