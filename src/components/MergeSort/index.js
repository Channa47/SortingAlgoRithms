import React, { useState } from "react";
import styles from "./index.module.scss";
import { Button } from "@mui/material";

function MergeSort({
  array = [],
  isSorted,
  isSorting,
  setIsSorted,
  setIsSorting,
  animationSpeed,
  getHeight,
  SelectSpeed,
}) {
  const [sortedArray, setSortedArray] = useState([...array]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);

  const mergeSort = async () => {
    setIsSorting(true);
    setIsSorted(false);
    let animations = [];

    const merge = async (left, right) => {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;
      while (leftIndex < left.length && rightIndex < right.length) {
        setActiveIndices([leftIndex, rightIndex]);
        animations.push([...result, left[leftIndex], right[rightIndex]]);
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex++]);
        } else {
          result.push(right[rightIndex++]);
        }
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));
      }

      while (leftIndex < left.length) {
        setActiveIndices([leftIndex]);
        result.push(left[leftIndex++]);
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));
      }

      while (rightIndex < right.length) {
        setActiveIndices([rightIndex]);
        result.push(right[rightIndex++]);
        await new Promise((resolve) => setTimeout(resolve, animationSpeed));
      }

      return result;
    };

    const recursiveSort = async (array) => {
      if (array.length <= 1) return array;

      const mid = Math.floor(array.length / 2);
      const left = await recursiveSort(array.slice(0, mid));
      const right = await recursiveSort(array.slice(mid));

      const merged = await merge(left, right);

      setSortedArray([...merged]);
      setSortedIndices(merged.map((_, index) => index));
      return merged;
    };

    await recursiveSort(array);
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
            onClick={mergeSort}
            disabled={isSorting || isSorted}
            variant="contained"
          >
            {isSorting ? "Sorting..." : "Start Merge Sort"}
          </Button>
        </div>
        <SelectSpeed />
      </div>
    </div>
  );
}

export default MergeSort;
