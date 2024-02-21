import { makeAutoObservable } from "mobx";
import CONSTANTS from "../constants";

class Weather {
  trips = [
    {
      id: 0,
      city: "Kyiv",
      start: "2024-03-01",
      end: "2024-03-01",
      image: "cities/london.png",
      isActive: false,
    },
  ];
  weather = null;
  todayWeather = null;
  localTime = null;
  activeTrip = this.trips[0] || {};
  error = null;
  modalWindow = false;

  constructor() {
    makeAutoObservable(this);
  }

  handlerModalWindow() {
    this.modalWindow = !this.modalWindow;
  }

  submitModalWindow(values) {
    const newTrip = {
      ...values,
      image: `cities/${values.city.toLowerCase()}.jpg`, // Предполагается, что значения городов вводятся в нижнем регистре
      isActive: false,
      id: this.trips.length,
    };
    this.trips.push(newTrip);
    this.modalWindow = false;
  }

  toggleCard(id) {
    this.trips.forEach((trip) => {
      trip.isActive = false;
      if (Number(id) === trip.id) {
        trip.isActive = !trip.isActive;
        this.activeTrip = trip;
      }
    });
  }

  async fetchTripsWeather() {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.activeTrip.city}/${this.activeTrip.start}/${this.activeTrip.end}?unitGroup=metric&key=${CONSTANTS.API_KEY}&contentType=json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      this.weather = data;
    } catch (err) {
      console.error(err);

      this.error = err.message;
    }
  }

  async fetchTodayWeather() {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.activeTrip.city}/today?unitGroup=metric&include=days&key=${CONSTANTS.API_KEY}&contentType=json`;
    try {
      console.log("weather fetch");
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.todayWeather = data;
    } catch (err) {
      console.error(err);
      this.error = err.message;
    }
  }
}

const weather = new Weather();
export default weather;
