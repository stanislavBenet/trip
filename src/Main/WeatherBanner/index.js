import React, { useEffect, useState } from "react";
import styles from "./WeatherBanner.module.css";
import classNames from "classnames";
import Weather from "../../store/Weather";
import { observer } from "mobx-react-lite";

const background = Weather.isDay
  ? styles.backgroundDay
  : styles.backgroundNight;

const fontColor = Weather.isDay ? styles.colorBlack : styles.colorWhite;
const containerStyles = classNames(styles.container, fontColor, background);

const WeatherBanner = observer(() => {
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [component, setComponent] = useState({
    id: 0,
    city: "London",
    start: "2024-03-01",
    end: "2024-03-01",
    image: "cities/london.png",
    isActive: false,
  });

  useEffect(() => {
    setComponent(Weather.activeTrip);
  }, [Weather.activeTrip]);

  useEffect(() => {
    const start = new Date(component.start).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = start - now;

      if (timeLeft < 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      setDay(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(timer);
  }, [day, hours, minutes, seconds]);

  return (
    <section className={containerStyles}>
      <article className={styles.weatherContainer}>
        <h2>Sunday</h2>
        <div className={styles.wrapperWeather}>
          <img src="weathericons/cloudy.png" alt="cloudy"></img>
          <p>24</p>
        </div>
        <p>{component.city}</p>
      </article>
      <article className={styles.wrapperTime}>
        <div className={styles.wrapperTimeItem}>
          <p>{day}</p>
          <p>days</p>
        </div>
        <div className={styles.wrapperTimeItem}>
          <p>{hours}</p>
          <p>hours</p>
        </div>
        <div className={styles.wrapperTimeItem}>
          <p>{minutes}</p>
          <p>minutes</p>
        </div>
        <div className={styles.wrapperTimeItem}>
          <p>{seconds}</p>
          <p>seconds</p>
        </div>
      </article>
    </section>
  );
});

export default WeatherBanner;
