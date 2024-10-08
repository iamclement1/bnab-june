"use client";
import React, { useState, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { CheckoutProvider } from "./checkoutContext";
import { DedicatedBookingProvider } from "./dedicatedRidesContext";

interface TanstackProviderProps {
  children: ReactNode;
}

const TanstackProvider = ({ children }: TanstackProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CheckoutProvider>
          <DedicatedBookingProvider>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster position="bottom-right" richColors />
          </DedicatedBookingProvider>
        </CheckoutProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default TanstackProvider;