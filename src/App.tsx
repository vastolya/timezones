import { useDispatch, useSelector } from "react-redux";
import Clock from "./components/Clock";
import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import {
  fetchTimezones,
  addClock,
  removeClock,
  updateClockCity,
} from "./store/timezonesSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, clocks } = useSelector(
    (state: RootState) => state.timezones
  );

  useEffect(() => {
    dispatch(fetchTimezones());
  }, [dispatch]);

  const handleAddClock = () => {
    const availableCity = data.find((tz) => !selectedCities.includes(tz.city));
    const city = availableCity ? availableCity.city : "";
    dispatch(addClock(city));
  };

  const handleCityChange = (index: number, city: string) => {
    dispatch(updateClockCity({ index, city }));
  };

  const handleRemoveClock = (index: number) => {
    dispatch(removeClock(index));
  };

  const selectedCities = clocks.map((clock) => clock.city);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {selectedCities.length < data.length ? (
        <button onClick={handleAddClock} style={{ margin: "2rem auto" }}>
          Добавить часы
        </button>
      ) : (
        <button
          onClick={handleAddClock}
          style={{ margin: "2rem auto" }}
          disabled
        >
          Добавить часы
        </button>
      )}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {clocks.map((clock, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              width: "200px",
            }}
          >
            {clock.city ? (
              <Clock offset={clock.offset} />
            ) : (
              <Clock offset={data[0]?.offset} />
            )}
            <select
              value={clock.city}
              style={{ marginTop: "1rem" }}
              onChange={(e) => handleCityChange(index, e.target.value)}
            >
              {data
                .filter(
                  (tz) =>
                    !selectedCities.includes(tz.city) || tz.city === clock.city
                )
                .map((tz) => (
                  <option key={tz.city} value={tz.city}>
                    {tz.city} (UTC{tz.offset >= 0 ? `+${tz.offset}` : tz.offset}
                    )
                  </option>
                ))}
            </select>
            <button
              style={{ marginTop: "1rem" }}
              onClick={() => handleRemoveClock(index)}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
