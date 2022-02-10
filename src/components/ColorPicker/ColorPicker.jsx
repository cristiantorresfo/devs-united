import React, { useContext } from "react";
import "./ColorPicker.css";
import { ColorContext, colors } from "../../contexts/ColorContext";

function ColorPicker() {
  const { setColor } = useContext(ColorContext);

  const colorOption = (color) => {
    const handleClickColor = () => {
      setColor(color);
    };
    return (
      <div
        key={color.name}
        className="color"
        style={{ backgroundColor: color.hex }}
        onClick={handleClickColor}
      />
    );
  };

  const colorOptions = () => {
    return colors.map((color) => {
      return colorOption(color);
    });
  };

  return <div className="usernameColor">{colorOptions()}</div>;
}

export default ColorPicker;
