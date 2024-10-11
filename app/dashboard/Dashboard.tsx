"use client";

import React from "react";
import LogOut from "../login/LogOut";
import { useSession } from "next-auth/react";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();
  return (
    <div>
      {session ? <p>Dashboard</p> : <p>Not logged in</p>}
      <LogOut />
    </div>
  );
};

export default Dashboard;
