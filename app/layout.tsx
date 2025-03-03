import React from 'react';
import { Inter } from 'next/font/google';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../client/src/lib/queryClient";
import { Toaster } from "../client/src/components/ui/toaster";
import "../client/src/index.css"; // Keep existing styles for now

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Market Insights Platform',
  description: 'Advanced AI-powered market insights platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}