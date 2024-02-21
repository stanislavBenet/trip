import React, { useEffect, useState } from "react";
import styles from "./WeekWeather.module.css";
import Weather from "../../store/Weather";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import { getDayOfWeek } from "../../utils/utils";

const WeekWeather = observer(() => {
  const [weather, setWeather] = useState();
  const array1 = [
    { day: "monday", icon: "clear-day", temp: "23" },
    { day: "monday", icon: "thunder-rain", temp: "23" },
  ];
  useEffect(() => {
    Weather.fetchTripsWeather();

    const weatherReaction = reaction(
      () => Weather.weather,
      (weatherData) => {
        setWeather(weatherData);
      }
    );
    return () => {
      weatherReaction();
    };
  }, [Weather.activeTrip]);

  if (!weather || !weather.days) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.container}>
      <h2>Week</h2>

      <div className={styles.row}>
        {weather.days.map((i, index) => {
          return (
            <article key={index} className={styles.card}>
              <h3>{getDayOfWeek(i.datetime)}</h3>
              <img
                width="90px"
                src={`weathericons/${i.icon}.png`}
                alt={i.icon}
              />
              <p>
                {i.tempmax}°/{i.tempmin}°
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
});

export default WeekWeather;
