

import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogOut from "../login/LogOut";
import Dashboard from "./Dashboard";

type Props = {};

const page = async (props: Props) => {
  // const session = await getServerSession(authOptions);

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default page;
