import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import styles from "./index.module.scss";

const SortingSelect = ({ onSelect, selected }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(selected);

  const handleChange = (event) => {
    setSelectedAlgorithm(event.target.value);
    onSelect(event.target.value); // Pass selected algorithm to parent
  };

  return (
    <div className={styles.selectContainer}>
      <FormControl
        fullWidth
        variant="outlined"
        className={styles.selectControl}
      >
        <InputLabel>Choose Sorting Algorithm</InputLabel>
        <Select
          value={selectedAlgorithm}
          onChange={handleChange}
          label="Choose Sorting Algorithm"
          className={styles.select}
        >
          <MenuItem value="bubbleSort">Bubble Sort</MenuItem>
          <MenuItem value="selectionSort">Selection Sort</MenuItem>
          <MenuItem value="insertionSort">Insertion Sort</MenuItem>
          <MenuItem value="mergeSort">Merge Sort</MenuItem>
          <MenuItem value="quickSort">Quick Sort</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortingSelect;
