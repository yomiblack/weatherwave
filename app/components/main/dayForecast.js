import { Grid, Card, Text, Title, Group, Stack } from "@mantine/core";

export default function DayForecast({ dailyForecastArray }) {
  return (
    <Grid.Col span={{ base: 12, sm: 6 }}>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <Title order={4} mb="sm">
          5-Day Forecast
        </Title>
        <Stack gap="sm">
          {dailyForecastArray.map((day, index) => (
            <Group key={index} justify="space-between">
              <Text>{day.day}</Text>
              <Text>{day.icon}</Text>
              <Group gap={0}>
                <Text fw={500}>{day.high}°</Text>
                <Text c="dimmed" ml="xs">
                  /{day.low}°
                </Text>
              </Group>
            </Group>
          ))}
        </Stack>
      </Card>
    </Grid.Col>
  );
}
