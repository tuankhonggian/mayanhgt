"use client";

import { SafeUser } from "@/types";
import { useState } from "react";
import Input from "../components/inputs/Input";
import Button from "../components/Button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AccountFormProps {
  currentUser: SafeUser | null;
}

const AccountForm: React.FC<AccountFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      if (data.newPassword !== data.confirmNewPassword) {
        toast.error("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/changePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.success);
        reset(); // Xóa dữ liệu form sau khi đổi mật khẩu thành công
      } else {
        toast.error(responseData.error || "Đã xảy ra lỗi khi đổi mật khẩu.");
      }
    } catch (error: any) {
      toast.error(`Lỗi khi đổi mật khẩu: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) {
    return (
      <p className="text-center">
        Bạn đã đăng nhập. Vui lòng đăng xuất trước khi đổi mật khẩu.
      </p>
    );
  }

  return (
    <>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="currentPassword"
        label="Mật khẩu hiện tại"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Input
        id="newPassword"
        label="Mật khẩu mới"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Input
        id="confirmNewPassword"
        label="Xác nhận mật khẩu mới"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Đang thay đổi mật khẩu ..." : "Thay đổi mật khẩu"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AccountForm;
