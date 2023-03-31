import React from "react";

const Input = (props) => {
  return (
    <div className="border-2 border-black mx-5 rounded-md h-[40px] flex items-center">
      <input
        type={props.type}
        name={props.name}
        value = {props.value}
        onChange={props.onChange}
        id={props.id}
        placeholder={props.placeholder}
        className="w-full px-4 h-full"
      ></input>
    </div>
  );
};

export default Input;
