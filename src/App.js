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

  const setWidth = {
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: "0 auto"
  };

  const setMargin = {
    margin: "10px 0"
  };

  return (
    <div className="App">
      <div style={setWidth}>
        <div>
          <h1 style={setMargin}>NASA's</h1>
          <h2 style={setMargin}>Picture of the Day for {stateObject.date}</h2>
        </div>
        <img
          src={stateObject.hdurl}
          style={{ width: "100%", margin: "20px 0" }}
        />
        <p>{stateObject.explanation}</p>
      </div>
    </div>
  );
}

export default App;
