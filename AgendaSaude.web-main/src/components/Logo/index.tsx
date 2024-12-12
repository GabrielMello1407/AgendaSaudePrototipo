import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  imagePath: string;
}

const Logo: React.FC<LogoProps> = ({ imagePath }) => {
  return (
    <Link href="/">
      <Image
        src={imagePath}
        alt="Logo"
        width={48}
        height={48}
        className=" bg-slate-200 rounded-full"
      />
    </Link>
  );
};

export default Logo;
