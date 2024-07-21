import { NavbarItem } from "@nextui-org/navbar";
import { useSuspenseQuery } from "@tanstack/react-query";

import { getGalleryImagesCountQueryOptions } from "../../sanity/queries/get-gallery-images-count.ts";
import { Link } from "../link.tsx";

const navUrls = [
  { name: "Home", url: "/" },
  {
    name: "News",
    url: "/news/",
  },
  {
    name: "Calendar",
    url: "/calendar/",
  },
  {
    name: "Files",
    url: "/files/",
  },
  {
    name: "Trustees",
    url: "/trustees/",
  },
];

export function NavigationLinks() {
  const { data: imageCount } = useSuspenseQuery(
    getGalleryImagesCountQueryOptions(),
  );

  return (
    <>
      {navUrls.map((item) => {
        return (
          <NavbarItem
            className="text-sky-700"
            isActive={location.pathname === item.url}
            key={item.name}
          >
            <Link href={item.url}>{item.name}</Link>
          </NavbarItem>
        );
      })}
      {1 <= imageCount && (
        <NavbarItem
          className="text-sky-700"
          isActive={"/gallery" === location.pathname}
          key="gallery"
        >
          <Link href="/gallery">Pictures</Link>
        </NavbarItem>
      )}
    </>
  );
}
