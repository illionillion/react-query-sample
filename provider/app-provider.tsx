"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UIProvider } from "@yamada-ui/react";
import { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return <UIProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UIProvider>
}