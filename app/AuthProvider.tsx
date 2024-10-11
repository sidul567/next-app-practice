"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";

type AuthProviderPropsType = {
  children: React.ReactNode;
};

const AuthProvider: FC<AuthProviderPropsType> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
