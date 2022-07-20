import React, { useState } from "react";
import axios from "axios";
import Forecast from "./Forecast";

export default function Form(props) {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [detail, setDetails] = useState(null);

  function updateInfo(response) {
    setLoaded(true);
    setDetails({
      name: response.data.name,
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function enter(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c37cdc95ccc19e8147c5867586b1e658&units=metric`;
    axios.get(apiUrl).then(updateInfo);
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={enter}>
      <input
        type="search"
        placeholder="Enter a city.."
        onChange={updateCity}
      ></input>
      <button type="submit">Search</button>
    </form>
  );

  let link = (
    <span id="link">
      Check out the
      <a href="https://github.com/Maria-G-Garcia/Week6" id="github">
        {" "}
        GitHub{" "}
      </a>
    </span>
  );

  if (loaded) {
    return (
      <div className="Container">
        {form}
        <br />
        <div className="row">
          <div className="col-6">
            <ul>
              <li> {detail.name}</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-6" id="actual">
            <span>
              <img src={detail.icon} alt="weather icon"></img>
            </span>
            <span id="actual">{Math.round(detail.temp)}°C</span>
          </div>
          <div className="col-6" id="stats">
            <ul id="stats">
              <li>{detail.description}</li>
              <li>{detail.humidity}%</li>
              <li>{detail.wind}km/h</li>
            </ul>
          </div>
        </div>
        <div>{link}</div>
      </div>
    );
  } else {
    return [form, link];
  }
}
