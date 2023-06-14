import React from "react";

const Button = (props) => {
  return (
    <div className="flex justify-center h-full w-full rounded-lg text-white font-medium hover:cursor-pointer border-none">
      <button type={props.type} onClick={props.onClick} disabled={props.disabled} className={`w-full border-none `} >{props.label}</button>

    </div>
  );
};

export default Button;
