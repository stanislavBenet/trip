import React, { useEffect, useState } from "react";
import styles from "./WeatherBanner.module.css";
import classNames from "classnames";
import Weather from "../../store/Weather";
import { observer } from "mobx-react-lite";
import { getDayOfWeek } from "../../utils/utils";
import { reaction } from "mobx";

const WeatherBanner = observer(() => {
  const [todayWeather, setTodayWeather] = useState();
  const [timeLeft, setTimeLeft] = useState({
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  useEffect(() => {
    const updateTimer = () => {
      const start = new Date(Weather.activeTrip.start).getTime();
      const now = new Date().getTime();
      const difference = start - now;

      if (difference < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [Weather.activeTrip.start]);

  useEffect(() => {
    Weather.fetchTodayWeather();

    return reaction(
      () => Weather.todayWeather,
      (weatherData) => setTodayWeather(weatherData)
    );
  }, [Weather.activeTrip.city]);

  const dayNightStyles =
    new Date().getHours() > 8 && new Date().getHours() < 17
      ? classNames(styles.backgroundDay, styles.colorBlack)
      : classNames(styles.backgroundNight, styles.colorWhite);

  const containerStyles = classNames(dayNightStyles, styles.container);

  return (
    <section className={containerStyles}>
      <article className={styles.weatherContainer}>
        <h2>{getDayOfWeek(Date.now())}</h2>
        {todayWeather && todayWeather.days && todayWeather.days.length > 0 ? (
          <div className={styles.wrapperWeather}>
            <img
              src={`weathericons/${todayWeather.days[0].icon}.png`}
              alt={todayWeather.days[0].icon}
            />
            <p>{Math.round(todayWeather.days[0].temp)}</p>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
        <p>{Weather.activeTrip.city}</p>
      </article>
      <article className={styles.wrapperTime}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className={styles.wrapperTimeItem}>
            <p>{value}</p>
            <p>{unit}</p>
          </div>
        ))}
      </article>
    </section>
  );
});

export default WeatherBanner;
