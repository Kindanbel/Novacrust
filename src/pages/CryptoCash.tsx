import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import NavigateTab from "../components/NavigateTab";
import Button from "../components/Button";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// import CLEOLogo from "../../public/images/cleo.svg";

type Option = {
  name: string;
  icon?: JSX.Element | null;
};

type PayFromOption = {
  name: string;
  icon: JSX.Element;
};

const USDTIcon = () => (
  <img src="/images/cleo.svg" alt="Cleo" className="w-5 h-5" />
);
const TONIcon = () => (
  <img src="/images/ton.svg" alt="ton" className="w-5 h-5" />
);
const BNBcon = () => (
  <img src="/images/bnb.svg" alt="bnb" className="w-5 h-5" />
);
const ETHcon = () => (
  <img src="/images/eth.svg" alt="eth" className="w-5 h-5" />
);
const NGNIcon = () => (
  <img src="/images/nig.svg" alt="nig" className="w-5 h-5" />
);

const CryptoCash: React.FC = () => {
  const [payDropdown, setPayDropdown] = useState<boolean>(false);
  const [receiveDropdown, setReceiveDropdown] = useState<boolean>(false);
  const [payFromDropdown, setPayFromDropdown] = useState<boolean>(false);
  const [payToDropdown, setPayToDropdown] = useState<boolean>(false);
  const navigate = useNavigate();

  const [paySearch, setPaySearch] = useState<string>("");
  const [receiveSearch, setReceiveSearch] = useState<string>("");

  const [payCurrency, setPayCurrency] = useState<Option>({
    name: "ETH",
    icon: <ETHcon />,
  });
  const [receiveCurrency, setReceiveCurrency] = useState<Option>({
    name: "NGN",
    icon: <NGNIcon />,
  });
  const [payFrom, setPayFrom] = useState<PayFromOption>({
    name: "Select an option",
    icon: null,
  });
  const [payTo, setPayTo] = useState<Option>({
    name: "Select an option",
    icon: null,
  });

  const [error, setError] = useState<string>(""); // <-- Added for error message

  const payOptions: Option[] = [
    { name: "USDT-CLEO", icon: <USDTIcon /> },
    { name: "USDT-TON", icon: <TONIcon /> },
    { name: "USDT-BNB", icon: <BNBcon /> },
  ];

  const receiveOptions: Option[] = [{ name: "NGN", icon: <NGNIcon /> }];

  const payFromOptions: PayFromOption[] = [
    {
      name: "Metamask",
      icon: <img src="/images/fox.svg" alt="Wallet 1" className="w-5 h-5" />,
    },
    {
      name: "Rainbow",
      icon: <img src="/images/rainbow.svg" alt="Wallet 2" className="w-5 h-5" />,
    },
    {
      name: "WalletConnect",
      icon: <img src="/images/walletcon.svg" alt="Wallet 1" className="w-5 h-5" />,
    },
    {
      name: "Other Crypto Wallets (Binance, Conibase, Bybit etc)",
      icon: <img src="/images/Wallet.svg" alt="Bank Account" className="w-5 h-5" />,
    },
  ];

  const payToOptions: Option[] = [{ name: "NGN", icon: <NGNIcon /> }];

  const filteredPayOptions = payOptions.filter((option) =>
    option.name.toLowerCase().includes(paySearch.toLowerCase())
  );

  const filteredReceiveOptions = receiveOptions.filter((option) =>
    option.name.toLowerCase().includes(receiveSearch.toLowerCase())
  );

  // Navigate to Recipient Details on Convert with validation
  const handleConvert = () => {
    if (payFrom.name === "Select an option") {
      setError("Please select where you are paying from.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (payTo.name === "Select an option") {
      setError("Please select where you are paying to.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    navigate("/recipient-details");
  };

  return (
    <div className="max-w-[520px] h-[600px] w-full bg-white rounded-[28px] p-6 border shadow-sm">
      {/* Tabs */}
      <NavigateTab />

      {/* You pay */}
      <div className="border mt-[30px]  rounded-2xl p-4 mb-4 relative">
        <p className="text-sm text-gray-500 mb-2">You pay</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">1.00</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => setPayDropdown(!payDropdown)}
              className="flex items-center gap-2 border rounded-full px-3 py-1.5 w-[170px] min-w-[80px] justify-between"
            >
              <span className="flex items-center text-[13px] gap-3">
                {payCurrency.icon && payCurrency.icon}
                {payCurrency.name}
              </span>
              <FiChevronDown />
            </button>
            {payDropdown && (
              <div className="absolute top-full -left-[30px]  w-[200px] bg-white border rounded-xl shadow-lg z-10 px-[5px] py-[7px]">
                <div className="relative mb-2">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={paySearch}
                    onChange={(e) => setPaySearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full border-2 mb-[6px] border-solid rounded-full pl-10 pr-4 py-1 outline-none"
                  />
                </div>
                {filteredPayOptions.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-100 rounded-xl"
                    onClick={() => {
                      setPayCurrency(option);
                      setPayDropdown(false);
                      setPaySearch("");
                    }}
                  >
                    {option.icon && option.icon}
                    <span className="text-[13px]">{option.name}</span>
                  </button>
                ))}
                {filteredPayOptions.length === 0 && (
                  <div className="px-4 py-2 text-gray-400">No results</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* You receive */}
      <div className="border rounded-2xl p-4 mb-6 relative">
        <p className="text-sm text-gray-500 mb-2">You receive</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-semibold">1.00</span>
          <div className="relative w-[120px]">
            <button
              type="button"
              onClick={() => setReceiveDropdown(!receiveDropdown)}
              className="flex items-center gap-2 border rounded-full px-3 py-1.5 text-sm w-full justify-between"
            >
              <span className="flex items-center gap-2">
                {receiveCurrency.icon && receiveCurrency.icon}
                {receiveCurrency.name}
              </span>
              <FiChevronDown />
            </button>
            {receiveDropdown && (
              <div className="absolute top-full px-[5px] py-[7px] -left-[80px] w-[200px] bg-white border rounded-xl shadow-lg z-10">
                <div className="relative mb-2">
                  <FiSearch className="absolute left-3 top-[40%] -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={receiveSearch}
                    onChange={(e) => setReceiveSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full border-2 mb-[6px] border-solid rounded-full pl-10 pr-4 py-1 outline-none"
                  />
                </div>
                {filteredReceiveOptions.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
                    onClick={() => {
                      setReceiveCurrency(option);
                      setReceiveDropdown(false);
                      setReceiveSearch("");
                    }}
                  >
                    {option.icon && option.icon}
                    <span className="text-[13px]">{option.name}</span>
                  </button>
                ))}
                {filteredReceiveOptions.length === 0 && (
                  <div className="px-4 py-2 text-gray-400">No results</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pay from */}
      <div className="mb-4 relative">
        <p className="text-sm font-medium mb-2 text-[#013941]">Pay from</p>
        <div className="relative">
          <button
            type="button"
            onClick={() => setPayFromDropdown(!payFromDropdown)}
            className="w-full flex items-center justify-between border rounded-full px-4 py-3 text-sm text-gray-500"
          >
            <span className="flex items-center gap-2">
              {payFrom.icon && payFrom.icon}
              {payFrom.name}
            </span>
            <FiChevronDown />
          </button>

          {payFromDropdown && (
            <div className="absolute top-[30px] px-[5px] py-[7px] left-0 w-full bg-white border rounded-xl shadow-lg z-10">
              {payFromOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setPayFrom(option);
                    setPayFromDropdown(false);
                  }}
                >
                  {option.icon && option.icon}
                  <span className="text-[13px]">{option.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pay to */}
      <div className="mb-6 relative">
        <p className="text-sm font-medium mb-2 text-[#013941]">Pay to</p>
        <div className="relative">
          <button
            type="button"
            onClick={() => setPayToDropdown(!payToDropdown)}
            className="w-full flex items-center justify-between border rounded-full px-4 py-3 text-sm text-gray-500"
          >
            {payTo.name}
            <FiChevronDown />
          </button>
          {payToDropdown && (
            <div className="absolute top-[30px] px-[5px] py-[7px] left-0 w-full bg-white border rounded-xl shadow-lg z-10">
              {payToOptions.map((option) => (
                <button
                  key={option.name}
                  type="button"
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 rounded-xl"
                  onClick={() => {
                    setPayTo(option);
                    setPayToDropdown(false);
                  }}
                >
                  {option.icon && option.icon}
                  <span className="text-[13px]">{option.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm text-center mb-3">
          {error}
        </p>
      )}

      {/* CTA */}
      <Button
        text="Convert now"
        onClick={() => {
          handleConvert();
        }}
      />
    </div>
  );
};

export default CryptoCash;
