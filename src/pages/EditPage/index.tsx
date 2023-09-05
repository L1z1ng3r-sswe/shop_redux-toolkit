import React, { useEffect, useState } from "react";
import styles from "./EditPage.module.scss";
import { AppDispatch, RootState } from "../../redux/Store";
import {
  TProduct,
  ECategory,
  TEProduct,
} from "../../redux/features/ProductsSlice/types";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { editProduct, getOneProduct } from "../../redux/features/ProductsSlice";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

interface RouteParams {
  id: string;
}

const EditPage: React.FC = () => {
  const { oneProduct } = useSelector((state: RootState) => state.products);

  const dispatch = AppDispatch();
  const [user, setUser] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<ECategory>(ECategory.car);

  const { id } = useParams<RouteParams>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneProduct(Number(id)));

    const data = JSON.parse(localStorage.getItem("user"));
    if (!data) {
      navigate("/");
    } else {
      setUser(data.email);
    }
  }, [dispatch, id, navigate]);

  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setImg(oneProduct.img);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price.toString());
      setCategory(oneProduct.category);
    }
  }, [oneProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //! date generate starts
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const addDate = `${day}/${month}/${year}`;
    //! date generate ends

    const product: TEProduct = {
      title: title,
      img: img,
      description: description,
      price: +price,
      category: category,
    };

    dispatch(editProduct({ id: Number(id), updatedProduct: product }));
    setUser("");
    setTitle("");
    setImg("");
    setDescription("");
    setPrice("");
    setCategory(ECategory.car);

    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(e.target.value as ECategory);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={styles["login-box"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-box"]}>
            <input
              required
              name="email"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Title</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              required
              name="email"
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <label>Img</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              required
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Description</label>
          </div>
          <div className={styles["user-box"]}>
            <input
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label>Price</label>
          </div>
          <FormControl
            fullWidth
            sx={{
              borderBottom: "2px solid white",
            }}
          >
            <InputLabel sx={{ color: "white" }} id="demo-simple-select-label">
              Category
            </InputLabel>
            <Select
              sx={{ color: "white" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={ECategory.car}>Cars</MenuItem>
              <MenuItem value={ECategory.garden}>Gardens</MenuItem>
              <MenuItem value={ECategory.food}>Cooking</MenuItem>
              <MenuItem value={ECategory.home}>House</MenuItem>
            </Select>
          </FormControl>

          <a onClick={handleSubmit} href="#">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Add
          </a>
        </form>
      </div>
    </div>
  );
};

export default EditPage;
