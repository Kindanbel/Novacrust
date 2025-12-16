import { NavLink } from "react-router-dom";

const NavigateTab = () => {
  const baseClasses =
    "text-xs sm:text-sm px-4 py-2 rounded-full text-center transition flex-shrink-0";

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-2 bg-gray-100 rounded-full p-1 min-w-max">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-[#063B3F] text-white" : "text-gray-500"}`
          }
        >
          Crypto to cash
        </NavLink>

        <NavLink
          to="/cash-to-crypto"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-[#063B3F] text-white" : "text-gray-500"}`
          }
        >
          Cash to crypto
        </NavLink>

        <NavLink
          to="/crypto-to-fiat"
          className={({ isActive }) =>
            `${baseClasses} ${isActive ? "bg-[#063B3F] text-white" : "text-gray-500"}`
          }
        >
          Crypto to fiat loan
        </NavLink>
      </div>
    </div>
  );
};

export default NavigateTab;
