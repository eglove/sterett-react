import { Link } from "@nextui-org/link";
import { NavbarBrand } from "@nextui-org/navbar";

export function NavigationHome() {
  return (
    <NavbarBrand>
      <Link href="/">
        <h1 className="m-2 border-b-2 border-sky-700 text-sm font-bold text-sky-700 sm:text-2xl">
          Sterett Creek Village Trustee
        </h1>
      </Link>
    </NavbarBrand>
  );
}
