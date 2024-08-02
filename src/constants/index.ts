import { bookmarkIcon, galleryaddIcon, homeIcon, peopleIcon, wallpaperIcon } from "@/utils";

export const sidebarLinks = [
  {
    imgURL: homeIcon,
    route: "/",
    label: "Home",
  },
  {
    imgURL: wallpaperIcon,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: peopleIcon,
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: bookmarkIcon,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: galleryaddIcon,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: homeIcon,
    route: "/",
    label: "Home",
  },
  {
    imgURL: wallpaperIcon,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL:bookmarkIcon,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: galleryaddIcon,
    route: "/create-post",
    label: "Create",
  },
];