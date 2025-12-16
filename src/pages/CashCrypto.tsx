import Button from "../components/Button";
import NavigateTab from "../components/NavigateTab";

const CashCrypto = () => {
  return (
    <div className="max-w-[520px] h-[600px] w-full bg-white rounded-[28px] p-6 border shadow-sm ">
        <NavigateTab />
      {/* Header */}
      <h1 className="text-3xl font-[500] mb-4 mt-[60px] text-center text-[#013941] ">Coming Soon!</h1>

      {/* Description */}
      <p className="text-gray-500 text-center">
        Cash to Crypto is almost here.
      </p>
        <p className="text-gray-500 mb-6 text-center">
        Enter your email and we’ll let you know the moment it’s live
      </p>

      {/* Form */}
      <form className="flex flex-col gap-[70px]">
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1 text-[#013941]">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <Button
          text="Update Me"
          onClick={(e) => {
            e.preventDefault();
            console.log("Email submitted");
          }}
        />
      </form>
    </div>
  );
};

export default CashCrypto;
