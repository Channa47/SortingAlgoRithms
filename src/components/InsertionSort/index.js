import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Button } from "@mui/material";

const InsertionSort = ({
  array = [],
  isSorted,
  isSorting,
  setIsSorted,
  setIsSorting,
  animationSpeed,
  getHeight,
  SelectSpeed,
}) => {
  const [sortedArray, setSortedArray] = useState([...array]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  useEffect(() => {
    setSortedArray([...array]);
    setSortedIndices([]);
  }, [array]);

  const insertionSort = async () => {
    setIsSorting(true);
    const arr = [...sortedArray];
    const n = arr.length;
    const newSortedIndices = [];

    for (let i = 1; i < n; i++) {
      let currentElement = arr[i];
      let j = i - 1;

      setActiveIndices([i]);

      // Compare the current element with the previous elements
      while (j >= 0 && arr[j] > currentElement) {
        setActiveIndices([j, i]);

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        arr[j + 1] = arr[j]; // Shift element to the right
        setSortedArray([...arr]);

        j--;
      }

      arr[j + 1] = currentElement; // Place the current element in the correct position

      // Mark the current element as sorted
      newSortedIndices.push(i);
      setSortedIndices([...newSortedIndices]);

      await new Promise((resolve) => setTimeout(resolve, animationSpeed));
    }

    setSortedIndices([...Array(n).keys()]);
    setActiveIndices([]);
    setIsSorting(false);
    setIsSorted(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.arrayContainer}>
        {sortedArray.map((value, index) => (
          <div
            key={index}
            className={`${styles.bar} ${
              activeIndices.includes(index) ? styles.active : ""
            } ${swappingIndices.includes(index) ? styles.swapping : ""} ${
              sortedIndices.includes(index) ? styles.sorted : ""
            }`}
            style={{ height: getHeight(value) }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div>
          <Button
            onClick={insertionSort}
            disabled={isSorting || isSorted}
            variant="contained"
          >
            {isSorting ? "Sorting..." : "Start Insertion Sort"}
          </Button>
        </div>
        <SelectSpeed />
      </div>
    </div>
  );
};

export default InsertionSort;
