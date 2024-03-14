import React, { useState } from 'react';

function ToggleButton(props) {
  return (
    <button className={`w-[5.5rem] h-[2.5rem] font-medium  ${props.active ? 'primary-btn' : ''}`} onClick={props.onClick}>
      {props.label}
    </button>
  );
}

function ToggleThemes() {
  const [isLightButton, setIsLightButton] = useState(true);

  const toggleButton = () => {
    setIsLightButton(!isLightButton);
  };

  return (
    <div className=" flex justify-between items-center rounded-md w-[12rem] p-2 border border-[#DADEF2]">
      <ToggleButton
        label="Light"
        active={isLightButton}
        onClick={toggleButton}
      />
      <ToggleButton
        label="Dark"
        active={!isLightButton}
        onClick={toggleButton}
      />
    </div>
  );
}

export default ToggleThemes;
