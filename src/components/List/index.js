import React from "react";
import styles from "./index.module.scss";

const List = ({ lists }) => {
  return (
    <div className={styles.container}>
      {lists.map((list, index) => (
        <li key={index}>{list}</li>
      ))}
    </div>
  );
};

export default List;
