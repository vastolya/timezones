import { useDispatch, useSelector } from "react-redux";
import Clock from "./components/Clock";
import { AppDispatch, RootState } from "./store/store";
import { useEffect, useState } from "react";
import { addCity, fetchTimezones, removeCity } from "./store/timezonesSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, selectedCities } = useSelector(
    (state: RootState) => state.timezones
  );
  const [selectedCity, setSelectedCity] = useState<string>("");

  useEffect(() => {
    dispatch(fetchTimezones());
  }, [dispatch]);

  const handleAddCity = (city: string, offset: number) => {
    dispatch(addCity({ city, offset }));
    setSelectedCity("");
  };
  const handleRemoveCity = (city: string) => {
    dispatch(removeCity(city));
  };

  const filteredCities = data.filter(
    (city) => !selectedCities.some((selected) => selected.city === city.city)
  );

  if (loading) return <p>loading</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <>
      {/* <Clock /> */}
      <div>
        <div>
          <label>Выбери город:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">-- Выберите город --</option>
            {filteredCities.map((tz) => (
              <option key={tz.city} value={tz.city}>
                {tz.city} (UTC{tz.offset >= 0 ? `${tz.offset}` : tz.offset})
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              if (selectedCity) {
                const cityData = data.find((tz) => tz.city === selectedCity);
                if (cityData) {
                  handleAddCity(cityData.city, cityData.offset);
                }
              }
            }}
          >
            добавить
          </button>
        </div>
        <div>
          <ul>
            {selectedCities.map((city) => (
              <li key={city.city}>
                {city.city} (UTC
                {city.offset >= 0 ? `${city.offset}` : city.offset})
                <Clock offset={city.offset} />
                <button onClick={() => handleRemoveCity(city.city)}>
                  удалить
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
