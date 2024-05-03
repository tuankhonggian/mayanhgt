import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Trang Chủ ADMIN",
  description: "Bảng điều khiển quản trị",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
