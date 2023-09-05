import React from "react";
import styles from "./HomePage.module.scss";
import ProductsList from "../../components/ProductsList";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <ProductsList />
    </div>
  );
};

export default HomePage;
