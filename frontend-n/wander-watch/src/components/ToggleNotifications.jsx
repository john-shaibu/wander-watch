import React, { useState } from 'react';

function ToggleButton(props) {
  return (
    <button className={`w-[5.5rem] h-[2.5rem] ${props.active ? 'primary-btn' : ''}`} onClick={props.onClick}>
      {props.label}
    </button>
  );
}

function ToggleNotifications() {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleButton = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <div className=" flex justify-between items-center rounded-md w-[12rem] h-[3.5rem] px-2 border-2 border-[#DADEF2]">
      <ToggleButton
        label="Enable"
        active={isEnabled}
        onClick={toggleButton}
      />
      <ToggleButton
        label="Disable"
        active={!isEnabled}
        onClick={toggleButton}
      />
    </div>
  );
}

export default ToggleNotifications;
