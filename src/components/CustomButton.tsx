import React from "react";
import styled from "@mui/system/styled";
import Button from "@mui/material/Button";

interface IProps {
  color: string;
  h_color: string;
  text: string;
  eventFunction: () => void;
}

const CustomButton: React.FC<IProps> = ({
  color,
  h_color,
  text,
  eventFunction,
}) => {
  const StyledButton = styled(Button)({
    backgroundColor: color,
    color: "white",
    width: "150px",
    height: "35px",
    borderRadius: "6px",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: h_color,
    },
  });

  return <StyledButton onClick={() => eventFunction()}>{text}</StyledButton>;
};

export default CustomButton;
