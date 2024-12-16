import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import { Button } from "@mui/material";

const QuickSort = ({
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
  const [pivotIndex, setPivotIndex] = useState(null);

  useEffect(() => {
    setSortedArray([...array]);
    setSortedIndices([]);
  }, [array]);

  const quickSort = async () => {
    setIsSorting(true);
    const arr = [...sortedArray];
    await quickSortHelper(arr, 0, arr.length - 1);
    setSortedIndices([...Array(arr.length).keys()]);
    setActiveIndices([]);
    setIsSorting(false);
    setIsSorted(true);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pivot = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivot - 1); // Left of pivot
      await quickSortHelper(arr, pivot + 1, high); // Right of pivot
    }
  };

  const partition = async (arr, low, high) => {
    const pivotValue = arr[high];
    setPivotIndex(high); // Highlight pivot
    setActiveIndices([low, high]); // Highlight elements being compared with the pivot

    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] < pivotValue) {
        i++;
        setActiveIndices([i, j, high]); // Highlight the current element and pivot
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));

        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        setSwappingIndices([i, j]); // Highlight the swapped elements
        setSortedArray([...arr]);
        setSwappingIndices([]);

        await new Promise((resolve) => setTimeout(resolve, animationSpeed));
      }
    }

    // Swap the pivot into its correct position
    setActiveIndices([i + 1, high]); // Highlight the final swap
    await new Promise((resolve) => setTimeout(resolve, animationSpeed));

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setSwappingIndices([i + 1, high]);
    setSortedArray([...arr]);
    setSwappingIndices([]);

    await new Promise((resolve) => setTimeout(resolve, animationSpeed));

    return i + 1; // Return the pivot index
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
            } ${pivotIndex === index ? styles.pivot : ""}`}
            style={{ height: getHeight(value) }}
          >
            {value}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div>
          <Button
            onClick={quickSort}
            disabled={isSorting || isSorted}
            variant="contained"
          >
            {isSorting ? "Sorting..." : "Start Quick Sort"}
          </Button>
        </div>
        <SelectSpeed />
      </div>
    </div>
  );
};

export default QuickSort;
