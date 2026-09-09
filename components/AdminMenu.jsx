"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/admin/addVenue", label: "Add Venue" },
    { href: "/admin/deleteVenue", label: "Delete Venue" },
    { href: "/admin/submitWarning", label: "Submit Warning" },
    { href: "/admin/userEmails", label: "User Emails" },
    { href: "/admin/userInfo", label: "User Info" },
  ];

  return (
    <aside className="w-full flex justify-center">
      <div className="grid grid-cols-6 max-xlg:grid-cols-3 max-sm:grid-cols-2 max-xxsm:grid-cols-1 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item?.href}
            href={item?.href}
            className="rounded-full w-[200px] py-3 px-2 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-900 
      bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default AdminMenu;
