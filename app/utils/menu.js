import { list, check, todo, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All",
    icon: home,
    link: "/",
  },
  {
    id: 2,
    title: "Interview",
    icon: list,
    link: "/interview",
  },
  {
    id: 3,
    title: "Completed!",
    icon: check,
    link: "/completed",
  },
  {
    id: 4,
    title: "Ongoing",
    icon: todo,
    link: "/incomplete",
  },
];

export default menu;