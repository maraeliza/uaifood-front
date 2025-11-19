import type { Metadata } from "next";
import "./globals.css";
import { ChakraProviderClient } from "../context/ChakraProvider";
import Navbar from "@/components/my-ui/Navbar";
import { AuthProvider } from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "UaiFood",
  description: "Projeto para a disciplina de DAW2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraProviderClient>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
          </AuthProvider>
        </ChakraProviderClient>
      </body>
    </html>
  );
}
