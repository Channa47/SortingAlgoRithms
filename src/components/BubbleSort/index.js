import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Button } from "@mui/material";

const BubbleSort = ({
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

  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...sortedArray];
    const n = arr.length;
    const newSortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1]);
          await new Promise((resolve) => setTimeout(resolve, animationSpeed));

          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSortedArray([...arr]);
          setSwappingIndices([]);
        }
      }
      newSortedIndices.push(n - i - 1);
      setSortedIndices([...newSortedIndices]);
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
            onClick={bubbleSort}
            disabled={isSorting || isSorted}
            variant="contained"
          >
            {isSorting ? "Sorting..." : "Start Bubble Sort"}
          </Button>
        </div>
        <SelectSpeed />
      </div>
    </div>
  );
};

export default BubbleSort;
