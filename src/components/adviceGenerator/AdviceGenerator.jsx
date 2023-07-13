import React, { useEffect, useState } from "react";
import "./adviceGenerator.css";
import "animate.css";

function AdviceGenerator() {
  const [advice, setAdvice] = useState("");
  const [adviceId, setAdviceId] = useState("");
  const [randomButtonStyle, setRandomButtonStyle] = useState("");
  const [adviceStyle, setAdviceStyle] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  const api = process.env.REACT_APP_API_URL;

  const fetchData = async () => {


    setIsDisable(true);
    setRandomButtonStyle(" animate__animated animate__rotateIn disableButton");
    setAdviceStyle(" animate__animated animate__fadeOut");
    setTimeout(() => {
      setRandomButtonStyle("animate__animated animate__headShake");
      setIsDisable(false);

    }, 2500);
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error("API request failed.");
      }
      const data = await response.json();
      setAdviceStyle(" animate__animated animate__fadeIn");
      setAdvice(data.slip.advice);
      setAdviceId(data.slip.id);
    } catch (error) {
      // Hata durumunda burada hatayı işleyebilirsiniz
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="advice">
      <div className="adviceWrapper  animate__animated animate__fadeInLeft">
        <div className="adviceBox ">
          <span className="adviceBoxTitle">ADVICE #{adviceId}</span>
          <h2 className={`adviceBoxDesc ${adviceStyle}`}>“{advice}”</h2>
          <img
            src="assets/images/pattern-divider-desktop.svg"
            alt=""
            className="adviceBoxSepIcon"
          />
          <button
            className={`randomAdvice ${randomButtonStyle}`}
            onClick={fetchData}
            disabled={isDisable}
          >
            <img
              src="assets/images/icon-dice.svg"
              alt=""
              className="randomAdviceImg"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdviceGenerator;
