"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode } from "react";

type QueryProviderPropsType = {
  children: ReactNode;
};
const queryClient = new QueryClient();
const QueryProvider: FC<QueryProviderPropsType> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
