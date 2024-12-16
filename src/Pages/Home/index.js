import React, { useState } from "react";
import SortingSelect from "../../components/Select";
import s from "./index.module.scss";
import QuickSort from "../../components/QuickSort";
import SelectionSort from "../../components/SelectionSort";
import InsertionSort from "../../components/InsertionSort";
import MergeSort from "../../components/MergeSort";
import BubbleSort from "../../components/BubbleSort";
import ArrayInput from "../../components/ArrayInput";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import List from "../../components/List";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

const SORT_TYPES = {
  bubbleSort: {
    title: "Bubble Sort",
    component: BubbleSort,
    list: [
      "Compare each pair of adjacent elements.",
      "If the elements are in the wrong order (left > right), swap them.",
      "Repeat the process until the array is sorted.",
      "After each pass, the largest unsorted element 'bubbles' to the end.",
      "Continue until no more swaps are needed, meaning the array is sorted.",
      "Time Complexity: O(n²) in worst and average cases.",
      "Simple to implement, but inefficient for large datasets.",
    ],
  },
  selectionSort: {
    title: "Selection Sort",
    component: SelectionSort,
    list: [
      "Start with the first element of the array as the minimum.",
      "Compare it with all other elements and find the smallest one.",
      "Swap the minimum element with the first element.",
      "Move to the next element and repeat the process.",
      "Continue this process for all elements until the array is sorted.",
      "Time Complexity: O(n²).",
      "In-place and does not require extra space.",
    ],
  },
  insertionSort: {
    title: "Insertion Sort",
    component: InsertionSort,
    list: [
      "Start with the second element; compare it to the first one.",
      "If it's smaller, move the first element to the right and insert the second element in its position.",
      "Move to the next element and repeat the process for each element.",
      "Continue until all elements are inserted in their correct positions.",
      "Time Complexity: O(n²) in worst case, but efficient for nearly sorted data.",
      "In-place and stable sorting algorithm.",
    ],
  },
  mergeSort: {
    title: "Merge Sort",
    component: MergeSort,
    list: [
      "Divide the array into two halves.",
      "Recursively divide each half until you have arrays of size 1.",
      "Merge the divided arrays by comparing elements and sorting them in order.",
      "The merging process continues until the entire array is merged and sorted.",
      "Time Complexity: O(n log n), highly efficient.",
      "Not an in-place sort; requires additional space.",
    ],
  },
  quickSort: {
    title: "Quick Sort",
    component: QuickSort,
    list: [
      "Choose a pivot element from the array.",
      "Partition the array into two subarrays: one with elements smaller than the pivot, the other with elements larger.",
      "Recursively apply the same process to the two subarrays.",
      "Repeat until the array is sorted.",
      "Time Complexity: O(n log n) on average, but O(n²) in worst case.",
      "Efficient, but not stable; uses a divide-and-conquer approach.",
    ],
  },
};

const speedMapping = {
  slow: 2000,
  normal: 1000,
  fast: 500,
  superFast: 100,
};

const getHeight = (value) => {
  let minHeight = 40;
  let colHeight = value <= 5 ? value * 7 : value * 2;
  const height = minHeight + colHeight;
  return `${height}px`;
};

function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");
  const [array, setArray] = useState([]);
  const {
    title,
    component: SelectedComponent,
    list = [],
  } = SORT_TYPES[selectedAlgorithm] || {};
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [speed, setSpeed] = useState("normal");

  const handleSelectChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    setIsSorted(false);
    setIsSorting(false);
  };

  const handleArrayChange = (newArray) => {
    setArray(newArray);
    setIsSorted(false);
    setIsSorting(false);
  };

  const SelectSpeed = () => {
    return (
      <div className={s.controls}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Speed</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={speed}
            label="Speed"
            onChange={(e) => setSpeed(e.target.value)}
            disabled={isSorting || isSorted}
          >
            <MenuItem value="slow">Slow</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="fast">Fast</MenuItem>
            <MenuItem value="superFast">Super Fast</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  };

  return (
    <>
      <div className={s.mainContainer}>
        <div className={s.selectContainer}>
          <SortingSelect
            onSelect={handleSelectChange}
            selected={selectedAlgorithm}
          />
          <ArrayInput onArrayChange={handleArrayChange} />
        </div>
        {array?.length ? (
          <div className={s.inputArray}>{`[${array}]`}</div>
        ) : null}
        {selectedAlgorithm && (
          <div className={s.animationContainer}>
            {array?.length ? (
              <>
                <h2 className={s.title}>{title}</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <SelectedComponent
                    array={array}
                    isSorted={isSorted}
                    isSorting={isSorting}
                    setIsSorting={setIsSorting}
                    setIsSorted={setIsSorted}
                    getHeight={getHeight}
                    SelectSpeed={SelectSpeed}
                    animationSpeed={speedMapping[speed] / 2}
                  />
                  <List lists={list} />
                </div>
              </>
            ) : (
              <h2 className={s.title}>
                Enter or Select a Random Array to Sort with Animation
              </h2>
            )}
          </div>
        )}
      </div>
      <div className={s.homeFooter}>
        <div className={s.name}>Created By : Channa Keshava</div>
        {/* <div className={s.links}> */}
        <a
          href="https://www.linkedin.com/in/channakeshava-n-a17aa9215/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon color="secondary" />
        </a>
        <a
          href="https://channa47.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio"
        >
          <TravelExploreIcon color="info" />
        </a>
        <a
          href="mailto:keshavachanna47@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
        >
          <EmailIcon color="primary" />
        </a>
        <a
          href="https://github.com/Channa47"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <GitHubIcon color="warning" />
        </a>
        {/* </div> */}
      </div>
    </>
  );
}

export default Home;
