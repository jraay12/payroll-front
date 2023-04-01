import React from "react";

const Input = (props) => {
  return (
    <div className="flex flex-col justify-start gap-1">
      <label className="font-bold  text-lg ml-[20px]">{props.label}</label>
      <div className="border-4 border-black mx-5 rounded-lg h-[40px] flex items-center">
        <input
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          id={props.id}
          placeholder={props.placeholder}
          className="w-full px-4 h-full"
        ></input>
      </div>
    </div>
  );
};

export default Input;
