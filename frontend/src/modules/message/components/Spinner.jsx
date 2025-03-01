import React from "react";
import spinner from "../../../assets/spinner.svg"; // Asegúrate de que la ruta sea correcta

const Spinner = ({ size = 50 }) => {
  return (
    <div className="row justify-center items-center">
      <img
        src={spinner} // No lo pasamos como prop, lo usamos directamente
        alt="Loading..."
        className="animate-bounce"
        style={{ width: 100, height: 100 }}
      />
    </div>
  );
};

export default Spinner;