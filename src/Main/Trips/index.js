import React, { useState } from "react";
import styles from "./Trips.module.css";
import Weather from "../../store/Weather";
import { observer } from "mobx-react-lite";
import classNames from "classnames";

const Trips = observer(() => {
  const [searchValue, setSearchValue] = useState("");

  const toggleModale = () => {
    Weather.handlerModalWindow();
  };

  const handleCard = (e) => {
    Weather.toggleCard(e.currentTarget.id);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const cardActive = classNames(styles.card, styles.cardActive);
  return (
    <>
      <h1 className={styles.title}>
        <span className={styles.firstWord}>Weather</span> forecast
      </h1>
      <input
        className={styles.input}
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search your trip"
      />
      <section className={styles.container}>
        {Weather.trips
          .filter(
            (trip) =>
              searchValue === "" ||
              trip.city.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((trip, index) => {
            return (
              <article
                id={trip.id}
                onClick={handleCard}
                key={index}
                className={trip.isActive ? cardActive : styles.card}
              >
                <img src={`cities/${trip.city}.jpg`} alt={trip.city} />
                <h2>{trip.city}</h2>
                <p>
                  {trip.start} - {trip.end}
                </p>
              </article>
            );
          })}
        <article onClick={toggleModale} className={styles.card}>
          <img src="cardAdd.png" alt="logoCardAdd"></img>
        </article>
      </section>
    </>
  );
});

export default Trips;
