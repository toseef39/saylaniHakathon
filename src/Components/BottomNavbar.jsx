import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  ClipboardIcon,
  PlusCircleIcon,
  InboxIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid"; // Install @heroicons/react

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: <HomeIcon className="w-6 h-6" />, path: "/home" },
    {
      name: "Book",
      icon: <PlusCircleIcon className="w-6 h-6" />,
      path: "/book-appointment",
    },
    {
      name: "Help",
      icon: <ClipboardIcon className="w-6 h-6" />,
      path: "/requesthelp",
    },
    {
      name: "Requests",
      icon: <InboxIcon className="w-6 h-6" />,
      path: "/my-requests",
    },
    {
      name: "Profile",
      icon: <UserCircleIcon className="w-6 h-6" />,
      path: "/edit-profile",
    },
  ];

  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    setActive(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className={`flex flex-col items-center text-xs ${
              active === item.path
                ? "text-blue-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            <div>{item.icon}</div>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
