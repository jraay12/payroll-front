import React from "react";

const Button = (props) => {
  return (
    <div className="flex justify-center h-full bg-blue-500 mx-5 rounded-lg text-white font-medium hover:bg-blue-200 hover:cursor-pointer">
      <button type={props.type} onClick={props.onClick} className="border-none w-full">{props.label}</button>
    </div>
  );
};

export default Button;
