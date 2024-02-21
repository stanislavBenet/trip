import { makeAutoObservable } from "mobx";
import CONSTANTS from "../constants";

class Weather {
  trips = [
    {
      id: 0,
      city: "London",
      start: "2024-03-01",
      end: "2024-03-01",
      image: "cities/london.png",
      isActive: false,
    },
    {
      id: 1,
      city: "Berlin",
      start: "2024-03-01",
      end: "2024-03-01",
      image: "cities/berlin.png",
      isActive: false,
    },
  ];
  weather = [];
  activeTrip = {
    id: 0,
    city: "London",
    start: "2024-03-01",
    end: "2024-03-01",
    image: "cities/london.png",
    isActive: false,
  };
  loading = false;
  error = null;
  modalWindow = false;
  isDay = false;

  constructor() {
    makeAutoObservable(this);
  }

  handlerModalWindow() {
    this.modalWindow = !this.modalWindow;
  }

  submitModalWindow(values) {
    this.trips.push({
      ...values,
      image: `${values.city}.jpg`,
      isActive: false,
      id: this.trips.length + 1,
    });
  }

  toggleCard(id) {
    this.trips.map((i) => {
      i.isActive = false;
    });
    this.trips.map((i) => {
      if (Number(id) === i.id) {
        i.isActive = !i.isActive;
        this.activeTrip = i;
      }
    });
  }

  async fetchTripsWeather() {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.activeTrip.city}/${this.activeTrip.start}/${this.activeTrip.end}?unitGroup=metric&key=${CONSTANTS.API_KEY}&contentType=json`;
    this.error = null;
    try {
      fetch(url, { method: "GET" })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.weather = data;
          console.log(data);
        });
    } catch (err) {
      console.error(err);
      this.error = err.message;
    }
  }
}

const weather = new Weather();
export default weather;
