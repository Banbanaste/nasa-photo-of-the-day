import React, { useState, useEffect } from "react";
import "./App.css";

// api -> https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY

function App() {
  const [stateObject, setStateObject] = useState({
    currentDate: "",
    loading: true
  });

  useEffect(() => {
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=eAhnsa3UIzMgyMUd2D1dtw6uF1WuRaq3etKGFf8x"
    )
      .then(response => response.json())
      .then(jsonObject => {
        console.log(jsonObject);
        setStateObject({
          currentDate: jsonObject.date,
          loading: false,
          ...jsonObject
        });
      });
  }, []);

  useEffect(() => {
    if (stateObject.check) {
      fetch(
        `https://api.nasa.gov/planetary/apod?api_key=eAhnsa3UIzMgyMUd2D1dtw6uF1WuRaq3etKGFf8x&date=${stateObject.date}`
      )
        .then(response => response.json())
        .then(jsonObject => {
          console.log(jsonObject);
          setStateObject({ ...stateObject, loading: false, ...jsonObject });
        });
    }
  }, [stateObject.date]);

  const setWidth = {
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    margin: "0 auto"
  };

  const setMargin = {
    margin: "10px 0"
  };

  function dateHandler(event) {
    console.log(event.target.value);
    setStateObject({
      ...stateObject,
      loading: true,
      check: true,
      date: event.target.value
    });
  }

  return (
    <div className="App">
      {stateObject.loading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontSize: "100px"
          }}
        >
          <div class="spinner-grow text-success fast ml-3" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!stateObject.loading && (
        <div style={setWidth}>
          <div>
            <h1 style={setMargin}>NASA's</h1>
            <h2 style={setMargin}>Picture of the Day for {stateObject.date}</h2>
            <input
              type="date"
              onChange={dateHandler}
              max={stateObject.currentDate}
            ></input>
          </div>
          {stateObject.media_type == "image" && (
            <img
              src={stateObject.hdurl}
              style={{
                width: "350px",
                margin: "20px 0",
                border: "solid 1px green",
                borderRadius: "2px"
              }}
            />
          )}
          {stateObject.media_type == "video" && (
            <iframe
              style={{
                margin: "20px 0",
                border: "solid 1px green",
                borderRadius: "2px"
              }}
              src={stateObject.url}
              width="560"
              height="315"
              frameborder="0"
              allowfullscreen
            ></iframe>
          )}
          <p>{stateObject.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default App;
