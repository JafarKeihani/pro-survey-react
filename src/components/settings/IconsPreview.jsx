// src/pages/IconsPreview.jsx
import React from "react";
import { Icons } from "../assets/icons";

const IconsPreview = () => {
  return (
    <div className="grid grid-cols-5 gap-6 p-8">
      {Object.entries(Icons).map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col items-center p-3 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Icon className="w-8 h-8 mb-2 text-blue-600" />
          <span className="text-sm">{name}</span>
        </div>
      ))}
    </div>
  );
};

export default IconsPreview;
