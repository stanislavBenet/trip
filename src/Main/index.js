import React from "react";
import WeekWeather from "./WeekWeather";
import Trips from "./Trips";
import WeatherBanner from "./WeatherBanner";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <section className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col9}>
          <Trips />
          <WeekWeather />
        </div>
        <div className={styles.col3}>
          <WeatherBanner />
        </div>
      </div>
    </section>
  );
}
