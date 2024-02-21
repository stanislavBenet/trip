import React from "react";
import WeekWeather from "./WeekWeather";
import Trips from "./Trips";
import WeatherBanner from "./WeatherBanner";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col8}>
          <Trips />
          <WeekWeather />
        </div>

        <div className={styles.col4}>
          <WeatherBanner />
        </div>
      </div>
    </div>
  );
}
