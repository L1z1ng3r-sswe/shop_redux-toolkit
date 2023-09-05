import React, { useState, useEffect } from "react";
import styles from "./ProductsItem.module.scss";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Badge, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TProduct } from "../../redux/features/ProductsSlice/types";
import { AppDispatch } from "../../redux/Store";
import { deleteProduct, editProduct } from "../../redux/features/ProductsSlice";
import { useNavigate } from "react-router-dom";

interface IFCProps {
  product: TProduct;
}

const ProductsItem: React.FC<IFCProps> = ({ product }) => {
  const [user, setUser] = useState<null | string>(null);
  const dispatch = AppDispatch();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = React.useState(false);
  const [isInCart, setIsInCart] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDeleteProduct() {
    dispatch(deleteProduct(product.id));
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data.email);
  }, []);

  function handleLikes() {
    const obj = {
      likes: [...product.likes, user],
    };
    dispatch(editProduct({ id: product.id, updatedProduct: obj }));
  }

  function handleRemoveLikes() {
    const likes = [...product.likes].filter((item) => item !== user);

    const obj = {
      likes,
    };
    dispatch(editProduct({ id: product.id, updatedProduct: obj }));
  }

  return (
    <Card
      sx={{
        width: 256,
        height: 360,
        position: "relative",
        // backgroundColor: "black",
        borderRadius: "20px",
        overflow: "hidden",
        paddingBottom: "30px",
        // border: "4px solid white",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={product.img}
        title="green iguana"
        onClick={() => {
          navigate(`/details/${product.id}`);
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color={"white"} component="div">
          {product.title.slice(0, 20)}
        </Typography>
        <Typography variant="body2" color={"white"}>
          {product.description.slice(0, 73)}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          onClick={handleClick}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <ExpandMoreIcon sx={{ color: "black" }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              handleDeleteProduct();
            }}
          >
            <IconButton
              sx={{
                transition: "0.2s",

                "&:hover": {
                  color: "red",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(`/edit/${product.id}`);
              handleClose();
            }}
          >
            <IconButton
              sx={{
                transition: "0.2s",

                "&:hover": {
                  color: "lightgreen",
                },
              }}
            >
              <EditIcon />
            </IconButton>
            Edit
          </MenuItem>
        </Menu>
        {product.likes.includes(user) ? (
          <IconButton
            color="error"
            onClick={() => {
              handleRemoveLikes();
            }}
            sx={{}}
          >
            <Badge badgeContent={product.likes.length} color="error">
              <FavoriteIcon sx={{ color: "red" }} />
            </Badge>
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              handleLikes();
            }}
            sx={{}}
          >
            <Badge badgeContent={product.likes.length} color="error">
              <FavoriteBorderIcon sx={{ color: "red" }} />
            </Badge>
          </IconButton>
        )}

        {isInCart ? (
          <IconButton
            color="success"
            onClick={() => {
              setIsInCart((prev) => !prev);
            }}
          >
            <RemoveShoppingCartIcon sx={{ color: "red" }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setIsInCart(true);
            }}
          >
            <AddShoppingCartIcon sx={{ color: "lightgreen" }} />
          </IconButton>
        )}
        <p
          style={{
            fontSize: "20px",
            marginLeft: "20px",
          }}
        >
          $ {product.price}
        </p>

        <p
          style={{
            fontSize: "10px",
            position: "absolute",
            bottom: "20px",
            right: "10px",
          }}
        >
          {product.date}{" "}
        </p>
      </CardActions>
    </Card>
  );
};

export default ProductsItem;
