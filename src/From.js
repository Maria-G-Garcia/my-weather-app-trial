import React, { useState } from "react";
import axios from "axios";

export default function Form(props) {
  const [city, setCity] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [detail, setDetails] = useState(null);

  function updateInfo(response) {
    setLoaded(true);
    setDetails({
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      humitity: response.data.main.humidity,
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
    <a href="https://github.com/Maria-G-Garcia/" id="github">
      {" "}
      GitHub{" "}
    </a>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <br />
        <ul>
          <li>{Math.round(detail.temp)}C</li>
          <li>{detail.description}</li>
          <li>{detail.humidity}%</li>
          <li>{detail.wind}km/h</li>
          <li>
            <img src={detail.icon} alt="weather icon"></img>
          </li>
        </ul>
      </div>
    );
  } else {
    return [form, link];
  }
}
