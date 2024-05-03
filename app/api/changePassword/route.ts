import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, currentPassword, newPassword } = body;

  try {
    // Tìm người dùng với email tương ứng
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại" },
        { status: 404 }
      );
    }

    // Kiểm tra mật khẩu hiện tại
    if (user.hashedPassword) {
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        user.hashedPassword
      );
      if (!passwordMatch) {
        return NextResponse.json(
          { error: "Mật khẩu hiện tại không đúng" },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Mật khẩu không tồn tại hoặc không hợp lệ" },
        { status: 400 }
      );
    }

    // Hash mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    await prisma.user.update({
      where: {
        email,
      },
      data: {
        hashedPassword: hashedNewPassword,
      },
    });

    return NextResponse.json({
      success: "Mật khẩu đã được thay đổi thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi thay đổi mật khẩu" },
      { status: 500 }
    );
  }
}
