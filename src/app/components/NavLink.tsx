import Link from "next/link";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link
        href={href}
        className="block py-2 pl-3 pr-4 text-[#ADB7BE] sm:text-xl rounded md:p-0 hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}
export default NavLink;