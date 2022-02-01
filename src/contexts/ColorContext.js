import { createContext, useState } from "react";

export const colors = [
  { name: "rojo", hex: "#F50D5A" },
  { name: "naranja", hex: "#FF865C" },
  { name: "amarillo", hex: "#FFEA5C" },
  { name: "verde", hex: "#00DA76" },
  { name: "azul", hex: "#0096CE" },
  { name: "purpura", hex: "#800FFF" }
];

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState(colors[0]);
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};