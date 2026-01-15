import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  name,
  showToggle = true,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const inputType =
    type === "password" ? (isShowPassword ? "text" : "password") : type;

  return (
    <div>
      {label && (
        <label className="block text-sm text-slate-300 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg bg-[#0B1220] border border-[#1E2A45] px-4 py-3 pr-12 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />

        {/* Password toggle icon */}
        {type === "password" && showToggle && (
          <button
            type="button"
            onClick={() => setIsShowPassword((prev) => !prev)}
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition"
          >
            {isShowPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
