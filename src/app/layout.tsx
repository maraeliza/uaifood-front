import type { Metadata } from "next";
import "./globals.css";
import { ChakraProviderClient } from "../context/ChakraProvider";

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
          {children}
        </ChakraProviderClient>
      </body>
    </html>
  );
}