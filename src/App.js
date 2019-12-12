import React, { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

function App() {
  /* styled components */
  const Wrapper = styled.div`
    max-width: 650px;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 0 auto;
  `;

  const DateInput = styled.input`
    padding: 5px;
    border-radius: 5px;
    border: solid 1px green;
    color: #fff;
    background-color: #000;
    font-size: 14px;
  `;

  const Image = styled.img`
    width: 350px;
    margin: 20px 0;
    border: solid 1px green;
    border-radius: 2px;
  `;

  const Video = styled.iframe`
    margin: 20px 0;
    border: solid 1px green;
    border-radius: 2px;
    height: 315px;
    width: 560px;
  `;

  const LoadTitle = styled.div`
    height: 45px;
    width: 100px;
    border-radius: 2px;

    margin: 10px 0;
  `;

  const LoadSubTitle = styled.div`
    height: 35px;
    width: 300px;
    border-radius: 2px;

    margin: 10px 0;
  `;

  const LoadInput = styled.div`
    height: 35px;
    width: 120px;
    border-radius: 2px;

    margin: 10px 0;
  `;

  const LoadImg = styled.div`
    height: 350px;
    width: 350px;
    border-radius: 2px;

    margin: 10px 0;
  `;

  const setMargin = {
    margin: "10px 0"
  };

  /* initiating state */
  const [stateObject, setStateObject] = useState({
    currentDate: "",
    loading: true
  });

  /* on page load effect */
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

  /* on date change effect */
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

  /* date change handler function */
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
        <Wrapper>
          <LoadTitle className="loadAnimation" />
          <LoadSubTitle className="loadAnimation" />
          <LoadInput className="loadAnimation" />
          <LoadImg className="loadAnimation" />
        </Wrapper>
      )}

      {!stateObject.loading && (
        <Wrapper>
          <div>
            <h1 style={setMargin}>NASA's</h1>
            <h2 style={setMargin}>
              Picture of the Day for{" "}
              <span style={{ color: "green" }}>{stateObject.date}</span>
            </h2>
            <DateInput
              type="date"
              onChange={dateHandler}
              max={stateObject.currentDate}
            />
          </div>
          {/* Image or Video */}
          {stateObject.media_type == "image" && (
            <Image src={stateObject.hdurl} />
          )}
          {stateObject.media_type == "video" && (
            <Video src={stateObject.url} frameborder="0" allowfullscreen />
          )}
          <p>{stateObject.explanation}</p>
        </Wrapper>
      )}
    </div>
  );
}

export default App;
