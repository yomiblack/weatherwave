import { fetchCurrentWeather, fetchForecast } from "@/app/api/weather";
import {
  AppShell,
  Grid,
  Text,
  Stack,
  SimpleGrid,
  Container,
  LoadingOverlay,
} from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { getWeatherIcon } from "../helpers/weatherIcons";
import { useWeatherState } from "../hook/useWeatherState";
import { getUserLocation } from "@/app/api/weather";
import { useState, useEffect } from "react";
import CurrentWeather from "./currentWeather";
import HourlyForecast from "./hourlyForecast";
import DayForecast from "./dayForecast";
import UvIndexSun from "./uvIndexSun";
import AirQuality from "./airQuality";
import ErrorNotification from "../notifications/errorNotification";
import { defaultCoords } from "@/app/api/weather";

export default function WeatherDashboard() {
  const { selectedLocation } = useWeatherState();
  const [currentCoords, setCurrentCoords] = useState(defaultCoords);
  const [isGeolocating, setIsGeolocating] = useState(!selectedLocation);

  //Detect user's location or use defaultcoords
  useEffect(() => {
    const determineLocation = async () => {
      // Priority 1: Use user-selected location if available
      if (selectedLocation) {
        setCurrentCoords(selectedLocation.coords);
        setIsGeolocating(false);
        return;
      }

      // Priority 2: Try geolocation
      setIsGeolocating(true);
      try {
        const coords = await getUserLocation();
        setCurrentCoords(coords);
      } catch (error) {
        console.error("Geolocation failed:", error);
        setCurrentCoords(defaultCoords); // Priority 3: Fallback to Lagos
      } finally {
        setIsGeolocating(false);
      }
    };

    determineLocation();
  }, [selectedLocation]); // Re-run when selectedLocation changes

  // Current weather
  const {
    data: currentWeather,
    isLoading: currentLoading,
    isError: currentIsError,
    error: currentError,
  } = useQuery({
    queryKey: ["currentWeather", currentCoords],
    queryFn: () => fetchCurrentWeather(currentCoords.lat, currentCoords.lon),
    staleTime: 300000, // 5 minutes
    // enabled: !isGeolocating,
  });

  //Timezone from weather endpoint for correct time calculation
  const timezoneOffset = currentWeather?.timezone || 0;

  //Hour formatter function
  const formatHour = (dt, offset) => {
    const localTime = new Date((dt + offset) * 1000);
    return localTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  // Hourly forecast
  const {
    data: forecast,
    isLoading: forecastLoading,
    isError: forecastIsError,
    error: forecastError,
  } = useQuery({
    queryKey: ["forecast", currentCoords],
    queryFn: () => fetchForecast(currentCoords.lat, currentCoords.lon),
    staleTime: 300000, // 5 minutes
    // enabled: !isGeolocating,
  });

  const isLoading = currentLoading || forecastLoading;
  const isError = currentIsError || forecastIsError;
  const error = currentError || forecastError;

  //Error Notification
  if (isError) {
    console.error("Weather fetch failed:", error.message);
    return (
      <ErrorNotification
        title={`Weather fetch failed: ${error.message}`}
        body="Failed to load weather data, please try again later"
      />
    );
  }

  // Process hourly data (next 12 hours)
  const hourlyForecast = forecast?.list?.slice(0, 12).map((item) => ({
    time: formatHour(item.dt, timezoneOffset),
    temp: Math.round(item.main.temp),
    icon: getWeatherIcon(item.weather[0].icon),
  }));

  // Process daily data
  const dailyForecast = forecast?.list?.reduce((acc, item) => {
    const localDate = new Date((item.dt + timezoneOffset) * 1000);
    const dateKey = localDate.toLocaleDateString("en-US", {
      weekday: "short",
    });

    if (!acc[dateKey]) {
      acc[dateKey] = {
        day: dateKey,
        high: Math.round(item.main.temp_max),
        low: Math.round(item.main.temp_min),
        icon: getWeatherIcon(item.weather[0].icon),
        pop: Math.round(item.pop * 100),
      };
    } else {
      if (item.main.temp_max > acc[dateKey].high)
        acc[dateKey].high = Math.round(item.main.temp_max);
      if (item.main.temp_min < acc[dateKey].low)
        acc[dateKey].low = Math.round(item.main.temp_min);
    }
    return acc;
  }, {});

  const dailyForecastArray = dailyForecast ? Object.values(dailyForecast) : [];

  return (
    <AppShell.Main>
      <Container my="md">
        {isLoading ? (
          <LoadingOverlay visible />
        ) : (
          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
            {/* CURRENT WEATHER (Primary Card) */}
            <CurrentWeather currentWeather={currentWeather} />

            {/* SECONDARY CARDS COLUMN */}
            <Grid gutter="md">
              {/* HOURLY FORECAST */}
              <HourlyForecast hourlyForecast={hourlyForecast} />

              {/* 5-DAY FORECAST */}
              <DayForecast dailyForecastArray={dailyForecastArray} />

              {/* UV & AIR QUALITY */}
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Stack h="100%" gap="md">
                  {/* UV Index & Sun */}
                  <UvIndexSun currentWeather={currentWeather} />

                  {/* Air Quality */}
                  <AirQuality currentWeather={currentWeather} />
                </Stack>
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        )}
      </Container>
    </AppShell.Main>
  );
}
