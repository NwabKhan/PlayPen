// import React from 'react';

// const TopBar = () => {
//   return (
//     <div className="flex justify-between items-center bg-gray-800 text-white">
//       {/* Left Section with Logo */}
//       <div className="flex items-center">
//         <span className="text-xl font-bold">Your App Name</span>
//       </div>

//       {/* Middle Section with Buttons/Links */}
//       <div className="flex space-x-4">
//         <button className="hover:underline">Link 1</button>
//         <button className="hover:underline">Link 2</button>
//         <button className="hover:underline">Link 3</button>
//       </div>

//       {/* Right Section with Buttons */}
//       <div className="flex space-x-4">
//         <button className="hover:underline">Button 1</button>
//         <button className="hover:underline">Button 2</button>
//       </div>
//     </div>
//   );
// };

// export default TopBar;

import React from "react";

const Topbar = () => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex gap-4 justify-start items-center">
        <strong>Quest Designer</strong>
        <button className="px-8 py-2 font-semibold bg-gray-200 rounded-full hover:bg-gray-300 transition ease-in-out duration-300">
          Layer Name
        </button>
        <button className="px-8 py-2 font-semibold bg-gray-200 rounded-full hover:bg-gray-300 transition ease-in-out duration-300">
          Quests
        </button>
        <button className="px-8 py-2 font-semibold bg-gray-200 rounded-full hover:bg-gray-300 transition ease-in-out duration-300">
          Assets
        </button>
      </div>

      <div className="flex gap-4">
        <button className="px-8 py-2 font-semibold bg-blue-200 rounded-full hover:bg-blue-300 transition ease-in-out duration-300">
          Test
        </button>
        <button className="px-8 py-2 font-semibold bg-lime-200 rounded-full hover:bg-lime-300 transition ease-in-out duration-300">
          Deploy
        </button>
      </div>
    </div>
  );
};

export default Topbar;
