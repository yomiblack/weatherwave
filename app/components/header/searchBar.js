import { Autocomplete, Loader, Box } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { fetchGeocoding } from "@/app/api/weather";
import { useState, useMemo } from "react";
import { useWeatherState } from "@/app/components/hook/useWeatherState";

export default function LocationSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSelectedLocation, addToHistory } = useWeatherState();

  const { data: locations = [], isLoading } = useQuery({
    queryKey: ["locations", searchQuery],
    queryFn: () => fetchGeocoding(searchQuery),
    enabled: searchQuery.length > 2,
  });

  // Deduplicate locations while preserving coordinates
  const uniqueLocationOptions = useMemo(() => {
    const uniqueMap = new Map();
    locations.forEach((location) => {
      const key = `${location.name}, ${location.country}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, {
          value: key,
          lat: location.lat,
          lon: location.lon,
        });
      }
    });
    return Array.from(uniqueMap.values());
  }, [locations]);

  const handleItemSelect = (selectedValue) => {
    const selected = uniqueLocationOptions.find(
      (opt) => opt.value === selectedValue
    );
    if (selected) {
      const locationData = {
        name: selected.value,
        coords: { lat: selected.lat, lon: selected.lon },
      };
      setSelectedLocation(locationData);
      addToHistory(locationData);
    }
  };

  return (
    <Box style={{ flexGrow: 1, maxWidth: 300 }}>
      <Autocomplete
        rightSection={isLoading ? <Loader size="1rem" /> : null}
        placeholder="Search city or country"
        leftSection={<IconSearch size={16} />}
        data={uniqueLocationOptions.map((opt) => opt.value)} // Only unique values
        limit={10}
        styles={{
          input: {
            border: "none",
            backgroundColor: "var(--mantine-color-body)",
            width: "100%", // makes it flexible inside parent container
          },
        }}
        comboboxProps={{
          position: "bottom",
          middlewares: { flip: false, shift: false },
        }}
        onChange={setSearchQuery}
        onOptionSubmit={handleItemSelect}
      />
    </Box>
  );
}
