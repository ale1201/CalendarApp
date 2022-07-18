import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";


export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Categorías</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        
        <label key={idx} className="items-center mt-3 block">
          
        </label>
      ))}
          {labels.map(({ label: lbl, checked }, idx) => (
        <label  className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked })
            }
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          {lbl === "indigo" && (<span className="ml-2 text-gray-700 capitalize">Examen</span>)}
          {lbl === "gray" && (<span className="ml-2 text-gray-700 capitalize">Ejercicio</span>)}
          {lbl === "green" && (<span className="ml-2 text-gray-700 capitalize">Proyecto</span>)}
          {lbl === "blue" && (<span className="ml-2 text-gray-700 capitalize">Amigos</span>)}
          {lbl === "red" && (<span className="ml-2 text-gray-700 capitalize">Reunión Académica</span>)}
          {lbl === "purple" && (<span className="ml-2 text-gray-700 capitalize">Trabajo</span>)}
          
          
          
        </label>
        
      ))}
    </React.Fragment>
  );
}
