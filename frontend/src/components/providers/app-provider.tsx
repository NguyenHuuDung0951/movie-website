"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { Provider } from "react-redux";
import { createQueryClient } from "@/lib/query-client";
import { store } from "@/store";

type Props = {
  children: ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
};