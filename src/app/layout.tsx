import type { Metadata } from "next";
import "./globals.css";
import { ChakraProviderClient } from "../context/ChakraProvider";
import Navbar from "@/components/my-ui/Navbar";
import { AuthProvider } from "@/context/AuthProvider";
import { CartProvider } from "@/context/CartProvider";
import { Box } from "@chakra-ui/react";

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
            <CartProvider>
              <Navbar />
              <Box
                as="main"
                minH="100vh"
                w="full"
                maxW="1200px"
                mx="auto" 
                px={{ base: 4, md: 8 }}
                py={{ base: 6, md: 10 }}
                bg="gray.50" 
                color="gray.800"
              >
                {children}
              </Box>
            </CartProvider>
          </AuthProvider>
        </ChakraProviderClient>
      </body>
    </html>
  );
}
