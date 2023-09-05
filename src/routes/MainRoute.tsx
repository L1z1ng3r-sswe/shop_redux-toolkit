import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayouts from "../layouts/MainLayouts";
import AddPage from "../pages/AddPage";
import EditPage from "../pages/EditPage";
import DetailsPage from "../pages/DetailsPage";
import AuthPage from "../pages/AuthPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
