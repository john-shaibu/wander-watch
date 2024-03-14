import { useState } from 'react';

const TimeDropdown = ({ onSelect }) => {
  const [selectedTime, setSelectedTime] = useState('10minutes');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionChange = (time) => {
    setSelectedTime(time);
    setIsDropdownOpen(false); // Close dropdown after selecting an option
    onSelect(time); // Pass the selected time to the parent component
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
        onClick={toggleDropdown}
      >
        {selectedTime}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="origin-top-right relative right-0 mt-2 w-55 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ">
          <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              onClick={() => handleOptionChange('10minutes')}
            >
              10 minutes
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              onClick={() => handleOptionChange('20minutes')}
            >
              20 minutes
            </button>
          

            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
              onClick={() => handleOptionChange('1hour')}
            >
              1hour
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeDropdown;
