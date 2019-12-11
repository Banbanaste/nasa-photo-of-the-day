import React, { useState, useEffect } from "react";
import "./App.css";

// api -> https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

function App() {
  const [stateObject, setStateObject] = useState({});

  useEffect(() => {
    console.log("logs on component mount");
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=eAhnsa3UIzMgyMUd2D1dtw6uF1WuRaq3etKGFf8x"
    )
      .then(response => response.json())
      .then(jsonObject => {
        console.log(jsonObject);
        setStateObject({ ...jsonObject });
      });
  }, []);

  return (
    <div className="App">
      <div>
        <h1>NASA's</h1>
        <h2>Picture of the Day for {stateObject.date}</h2>
      </div>
      <img src={stateObject.hdurl} />
      <p>{stateObject.explanation}</p>
    </div>
  );
}

export default App;
