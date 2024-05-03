import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Danh mục cửa hàng</h3>
            <Link href="#">Máy ảnh DSLR</Link>
            <Link href="#">Máy ảnh Mirrerless</Link>
            <Link href="#">Ống kính</Link>
            <Link href="#">Camera</Link>
            <Link href="#">Máy quay</Link>
            <Link href="#">Các dòng máy khác</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Dịch vụ khách hàng</h3>
            <Link href="#">Liên hệ chúng tôi</Link>
            <Link href="#">Chính sách vận chuyển</Link>
            <Link href="#">Trả lại & Trao đổi</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold mb-2">About Us</h3>
            <p className="mb-2">
              Làm việc tất cả các ngày trong tuần
              <br />
              Thứ 2 đến Thứ 7 : 9h đến 19h30
              <br />
              Chủ Nhật và Ngày Lễ : 9h đến 18h
            </p>
            <p>
              &copy; {new Date().getFullYear()}- Cửa Hàng Máy Ảnh GT. Đã đăng ký
              Bản quyền
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Theo chúng tôi</h3>
            <div className="flex gap-2">
              <Link href="https://www.facebook.com/gin.tg.14">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="https://www.instagram.com/_jang510_/">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
