import React, { useState, useRef } from "react";
import styles from "./index.module.scss";

const ArrayInput = ({ onArrayChange }) => {
  const [inputValue, setInputValue] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
  });

  const inputRefs = useRef([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (value.length <= 2 && /^[0-9]*$/.test(value)) {
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (value.length === 2) {
        const nextIndex = parseInt(name, 10); // Convert name to a number
        if (nextIndex < 10 && inputRefs.current[nextIndex]) {
          inputRefs.current[nextIndex].focus(); // Shift focus to the next input
        }
      }
    }
  };

  const generateRandomArray = () => {
    const randomArray = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 100)
    );
    for (let i = 1; i <= 10; i++) {
      console.log(i, randomArray[i]);
      setInputValue((prev) => ({
        ...prev,
        [i]: randomArray[i - 1],
      }));
    }
    onArrayChange(randomArray);
  };

  const handleSubmit = () => {
    const array = Object.values(inputValue)
      .filter((num) => num.trim() !== "")
      .map((num) => parseInt(num, 10));
    onArrayChange(array);
  };

  return (
    <div className={styles.inputContainer}>
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((key, index) => (
          <input
            key={key}
            ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
            type="text"
            value={inputValue[key]}
            onChange={handleInputChange}
            className={styles.input}
            maxLength={2} // Restrict input to 2 characters
            name={key}
          />
        ))}
      </div>
      <button onClick={handleSubmit} className={styles.button}>
        Submit
      </button>
      <button onClick={generateRandomArray} className={styles.randomButton}>
        Random
      </button>
    </div>
  );
};

export default ArrayInput;
