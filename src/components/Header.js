import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import logo from "../../public/logo.png";

export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex items-center relative">
      {/* Logo in Center */}
      <div className="flex-1 flex justify-center">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={150}
          className="object-contain"
        />
      </div>

      {/* Home & Logout Buttons at the Right */}
      <div className="absolute right-6 flex space-x-4">
        <Link href="/dashboard">
          <button className="px-4 py-2 text-white bg-[#270087] rounded-lg hover:bg-[#1e0066] transition-all duration-300">
            Home
          </button>
        </Link>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
