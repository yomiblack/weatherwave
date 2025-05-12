import { useAtom } from "jotai";
import {
  SelectedLocationAtom,
  favoritesAtom,
  historyAtom,
} from "../state/weatherAtoms";

export const useWeatherState = () => {
  const [selectedLocation, setSelectedLocation] = useAtom(SelectedLocationAtom);
  const [favorites, setFavorites] = useAtom(favoritesAtom);
  const [history, setHistory] = useAtom(historyAtom);

  //Add to favorites
  const handleAddFavorite = () => {
    if (!selectedLocation) return;

    // Create a unique ID based on coordinates (more reliable than timestamp)
    const locationId = `${selectedLocation.coords.lat.toFixed(
      4
    )}_${selectedLocation.coords.lon.toFixed(4)}`;

    // Check for existing favorite
    const exists = favorites.some((fav) => fav.id === locationId);

    if (exists) {
      alert(`${selectedLocation.name} is already in your favorites!`);
      return;
    }

    const newFavorites = [
      ...favorites,
      {
        id: locationId, // Coordinate-based ID
        name: selectedLocation.name,
        coords: selectedLocation.coords,
        addedAt: new Date().toISOString(), // Track when added
      },
    ];

    setFavorites(newFavorites);
    alert(`${selectedLocation.name} added to favorites!`);
  };

  //Remove from favorites
  const handleRemoveFavorite = (id) => {
    const locationName = favorites.find((fav) => fav.id === id)?.name;
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
    alert(`${locationName} removed from your favorites!`);
  };

  //Add to history
  const addToHistory = (location) => {
    setHistory((prev) => [
      {
        name: location.name,
        coords: location.coords,
        timestamp: new Date().toISOString(),
      },
      ...prev.filter((item) => item.name !== location.name).slice(0, 9),
    ]);
  };
  return {
    handleAddFavorite,
    handleRemoveFavorite,
    selectedLocation,
    setSelectedLocation,
    favorites,
    setFavorites,
    history,
    addToHistory,
  };
};
