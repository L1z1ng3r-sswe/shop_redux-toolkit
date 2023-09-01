import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayouts from "../layouts/MainLayouts";
import AddPage from "../pages/AddPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
