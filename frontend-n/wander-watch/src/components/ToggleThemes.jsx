import React, { useState } from 'react';

function ToggleButton(props) {
  return (
    <button className={`w-[5.5rem] h-[2.5rem] ${props.active ? 'primary-btn' : ''}`} onClick={props.onClick}>
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
    <div className=" flex justify-between items-center rounded-md w-[12rem] h-[3.5rem] px-2 border-2 border-[#DADEF2]">
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
