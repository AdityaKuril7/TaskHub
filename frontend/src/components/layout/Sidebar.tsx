"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Sidebar() {
  const views = [
    {
      title: "All Tasks",
      link: "/",
    },
    {
      title: "Pending",
      link: "/pending",
    },
    {
      title: "Completed",
      link: "/completed",
    },
  ];
  const currentPage = usePathname();
  console.log(currentPage);
  return (
    <div
      className={
        "w-auto h-full border-r border-r-gray-300 flex flex-col items-center gap-2 px-5 py-2"
      }
    >
      <p className={"self-start font-bold text-gray-500"}>View</p>
      {views.map((view, index) => {
        // const isSelectedPage =
        return (
          <Link href={view.link} key={index}>
            <motion.div
              whileHover={{ scale: 1.05, originX: 0 }}
              className={`${view.link === currentPage ? "bg-primary text-primary-foreground font-bold" : "bg-gray-200 text-black"} w-40 h-10 rounded-lg flex items-center justify-center`}
            >
              <p>{view.title}</p>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
