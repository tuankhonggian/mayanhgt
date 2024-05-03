"use client";

import { useState } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text", // Mặc định là "text" nếu không có kiểu được chỉ định
  disabled,
  required,
  register,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false); // Trạng thái cho việc hiển thị hoặc ẩn mật khẩu

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={showPassword ? "text" : type} // Nếu showPassword là true, hiển thị mật khẩu, ngược lại, hiển thị kiểu đã chỉ định
        className={`
          peer
          w-full
          p-4
          pt-6
          outline-none
          bg-white
          font-light
          border-2
          rounded-md
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${errors[id] ? "border-rose-400" : "border-slate-300"}
          ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}
        `}
      />
      <label
        htmlFor={id}
        className={`
          absolute
          cursor-text
          text-md
          duration-150
          tranform
          -translate-y-3
          top-5
          z-10
          origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors[id] ? "text-rose-500" : "text-slate-400"}
        `}
      >
        {label}
      </label>
      {type === "password" && ( // Nếu là kiểu mật khẩu, hiển thị nút chuyển đổi trạng thái hiển thị mật khẩu
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-1/2 transform -translate-y-1/2 right-6 focus:outline-none flex items-center"
          style={{ zIndex: "1000" }}
        >
          <div className="mr-1 ">
            {showPassword ? (
              <LiaEyeSolid size={24} />
            ) : (
              <LiaEyeSlashSolid size={24} />
            )}
          </div>
        </button>
      )}
    </div>
  );
};

export default Input;
