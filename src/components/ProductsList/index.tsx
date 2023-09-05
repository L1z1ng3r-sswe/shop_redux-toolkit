import React, { useEffect } from "react";
import styles from "./ProductsList.module.scss";
import ProductsItem from "../ProductsItem";
import { AppDispatch, RootState } from "../../redux/Store";
import { getProducts } from "../../redux/features/ProductsSlice";
import { useSelector } from "react-redux";
import { EStatus } from "../../redux/features/ProductsSlice/types";
import CircularProgress from "@mui/material/CircularProgress";

const ProductsList = () => {
  const dispatch = AppDispatch();
  const { products, status, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === EStatus.loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (status === EStatus.error && error) {
    return (
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <>
      <div className={styles.productsList}>
        {products.map((item, index) => {
          return <ProductsItem key={index} product={item} />;
        })}
      </div>
      <div
        style={{
          margin: "40px auto",
          display: "flex",
          justifyContent: "center",
        }}
      ></div>
    </>
  );
};

export default ProductsList;
