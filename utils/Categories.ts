import { AiFillVideoCamera } from "react-icons/ai";
import { MdStorefront } from "react-icons/md";
import { FaCamera, FaCameraRetro } from "react-icons/fa";
import { SiLens } from "react-icons/si";
import { RiCamera3Fill } from "react-icons/ri";
import { BsCamera2 } from "react-icons/bs";

export const categories = [
  {
    label: "All",
    icon: MdStorefront,
  },
  {
    label: "Máy ảnh DSLR",
    icon: FaCamera,
  },
  {
    label: "Máy ảnh Mirrerless",
    icon: FaCameraRetro,
  },
  {
    label: "Ống kính",
    icon: SiLens,
  },
  {
    label: "Camera",
    icon: RiCamera3Fill,
  },
  {
    label: "Máy quay",
    icon: AiFillVideoCamera,
  },
  {
    label: "Khác",
    icon: BsCamera2,
  },
];
