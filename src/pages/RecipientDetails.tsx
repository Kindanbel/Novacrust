import { useState } from "react";
import { FiArrowLeft, FiChevronDown, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

type CountryOption = {
  name: string;
  code: string;
};

type BankOption = {
  name: string;
};


const RecipientDetails = () => {
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState(""); // <-- for validation message

  const navigate = useNavigate();

  const onBackToCryptoCash = () => {
    navigate("/");
  };

  const [bankDropdown, setBankDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [bankSearch, setBankSearch] = useState("");

  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryDropdown, setCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>({
    name: "Nigeria",
    code: "+234",
  });

  const banks: BankOption[] = [
    { name: "Access Bank" },
    { name: "GTBank" },
    { name: "Zenith Bank" },
    { name: "UBA" },
  ];

  const filteredBanks = banks.filter((bank) =>
    bank.name.toLowerCase().includes(bankSearch.toLowerCase())
  );

  const countries: CountryOption[] = [
    { name: "Nigeria", code: "+234" },
    { name: "United States", code: "+1" },
    { name: "United Kingdom", code: "+44" },
  ];

  const handleNext = () => {
    // Validate Step 1 fields
    if (!selectedBank || !accountNumber.trim() || !accountName.trim()) {
      setErrorMessage("Please fill all required fields to continue.");
      return;
    }
    setErrorMessage(""); // Clear error if valid
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else onBackToCryptoCash();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      selectedBank,
      accountNumber,
      accountName,
      email,
      phone,
      selectedCountry,
    });
  };

  return (
    <div className="max-w-[520px] h-[600px] w-full p-6 bg-white rounded-2xl shadow-md relative flex flex-col">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="p-2" onClick={handleBack}>
          <FiArrowLeft className="text-lg" />
        </button>
        <h1 className="flex-1 text-center text-[#013941] text-[18px] font-semibold">
          Recipient Details
        </h1>
        <div className="w-8" /> {/* Placeholder to center title */}
      </div>

      <form className="space-y-10 flex-1 overflow-y-auto" onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            {/* Bank Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1 text-[#013941]">Bank</label>
              <button
                type="button"
                onClick={() => setBankDropdown(!bankDropdown)}
                className="w-full flex items-center justify-between text-[#013941] border rounded-full px-4 py-2 text-sm"
              >
                {selectedBank ? selectedBank.name : "Select Bank"}
                <FiChevronDown />
              </button>

              {bankDropdown && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded-xl shadow-lg z-10">
                  <div className="relative p-2">
                    <FiSearch className="absolute left-3 top-[50%] -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={bankSearch}
                      onChange={(e) => setBankSearch(e.target.value)}
                      placeholder="Search banks..."
                      className="w-full border placeholder:text-[#013941] rounded-full pl-10 pr-4 py-1 outline-none"
                    />
                  </div>
                  {filteredBanks.map((bank) => (
                    <button
                      key={bank.name}
                      type="button"
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-xl"
                      onClick={() => {
                        setSelectedBank(bank);
                        setBankDropdown(false);
                        setBankSearch("");
                      }}
                    >
                      {bank.name}
                    </button>
                  ))}
                  {filteredBanks.length === 0 && (
                    <div className="px-4 py-2 text-gray-400">No results</div>
                  )}
                </div>
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#013941]">Account Number</label>
              <input
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full border rounded-full px-4 py-2 outline-none"
              />
            </div>

            {/* Account Name */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#013941]">Account Name</label>
              <input
                type="text"
                placeholder="Enter account name"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full border rounded-full px-4 py-2 outline-none"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </>
        )}

        {step === 2 && (
          <>
            {/* Recipient Email */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#013941]">Recipient Email</label>
              <input
                type="email"
                placeholder="Enter recipient email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-full px-4 py-2 outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-1 text-[#013941]">Recipient phone number</label>
              <div className="flex items-center gap-2">
                {/* Country Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryDropdown(!countryDropdown)}
                    className="flex items-center gap-1 border rounded-full px-3 py-2 text-sm"
                  >
                    <span>{selectedCountry.code}</span>
                    <FiChevronDown />
                  </button>
                  {countryDropdown && (
                    <div className="absolute top-full mt-2 w-[250px] bg-white border rounded-xl shadow-lg z-10">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          className="px-4 py-2 w-full text-[#828282] text-left hover:bg-gray-100 rounded-xl"
                          onClick={() => {
                            setSelectedCountry(country);
                            setCountryDropdown(false);
                          }}
                        >
                          {country.name} ({country.code})
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <input
                  type="tel"
                  placeholder="000-000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 border rounded-full px-4 py-2 outline-none"
                />
              </div>
            </div>
          </>
        )}
      </form>

      {/* Button at bottom */}
      <div className="mt-auto">
        {step === 1 && (
          <button
            type="button"
            onClick={handleNext}
            className="w-full bg-[#063B3F] text-white py-3 rounded-full font-medium"
          >
            Next
          </button>
        )}
        {step === 2 && (
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#063B3F] text-white py-3 rounded-full font-medium"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipientDetails;
