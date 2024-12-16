import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Button } from "@mui/material";

const SelectionSort = ({
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

  const selectionSort = async () => {
    setIsSorting(true);
    const arr = [...sortedArray];
    const n = arr.length;
    const newSortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      setActiveIndices([i]);

      // Highlight the current element and start searching for the smallest element
      for (let j = i + 1; j < n; j++) {
        setActiveIndices([i, j]);

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }

      // If the minimum element is not at the current index, swap
      if (minIndex !== i) {
        setSwappingIndices([i, minIndex]);
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setSortedArray([...arr]);
        setSwappingIndices([]);
      }

      // Mark the current element as sorted
      newSortedIndices.push(i);
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
            onClick={selectionSort}
            disabled={isSorting || isSorted}
            variant="contained"
          >
            {isSorting ? "Sorting..." : "Start Selection Sort"}
          </Button>
        </div>
        <SelectSpeed />
      </div>
    </div>
  );
};

export default SelectionSort;
