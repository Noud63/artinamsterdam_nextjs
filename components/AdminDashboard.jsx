"use client";
import React from "react";
import AdminMenu from "./AdminMenu";
import { useSession } from "next-auth/react";
import AdminHeader from "./AdminHeader";

const AdminDashboard = () => {
  const { data: session } = useSession();
  return (
 <>
   <AdminHeader user={session?.user} />
  <AdminMenu />;
  </>
   
  )
 
};

export default AdminDashboard;
