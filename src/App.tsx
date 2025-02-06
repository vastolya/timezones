import { useDispatch, useSelector } from "react-redux";
import Clock from "./components/Clock";
import { AppDispatch, RootState } from "./store/store";
import { useEffect } from "react";
import { fetchTimezones } from "./store/timezonesSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.timezones
  );

  console.log(data);

  useEffect(() => {
    dispatch(fetchTimezones());
  }, [dispatch]);

  if (loading) return <p>loading</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  return (
    <>
      <p>vastolya-initial-repository</p>
      <p>webpack + react 19 + redux + typescript</p>
      <Clock />
    </>
  );
};

export default App;
