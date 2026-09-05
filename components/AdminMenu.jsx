"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenu = () => {
  const pathname = usePathname();

  const menuItems = [
    { href:"/", label:"Home" },
    { href:"/admin/addVenue", label:"Add Venue" },
    { href:"/admin/deleteVenue", label:"Delete Venue" },
    { href:"/admin/removeUser", label:"Remove User" },
    { href:"/admin/removeReview", label:"Remove Review" },
    { href:"/admin/submitWarning", label:"Submit Warning" },
    { href:"/admin/userEmails", label:"User Emails" },
    { href:"/admin/userInfo", label:"User Info" },
  ];

  return (
    <aside className="w-full flex justify-center">
      <div className="grid grid-cols-4 max-xlg:grid-cols-3 max-sm:grid-cols-2 max-xxsm:grid-cols-1 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item?.href}
            href={item?.href}
            className={`adminMenuButton flex justify-center items-center py-3 px-2 rounded transition ${
              pathname === item?.href
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default AdminMenu;
