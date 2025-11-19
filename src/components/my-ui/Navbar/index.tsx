"use client";

import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useAuth } from "@/context/AuthProvider";

interface NavItem {
  label: string;
  href: string;
  roles?: ("ADMIN" | "CLIENT")[]; // roles que podem ver
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Categorias", href: "/categories", roles: ["ADMIN"] },
  { label: "Usuários", href: "/users", roles: ["ADMIN"] },
  { label: "Pedidos", href: "/orders", roles: ["ADMIN", "CLIENT"] },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  const filteredItems = navItems.filter(
    (item) => !item.roles || (user?.role && item.roles.includes(user?.role)),
  );

  if (!user?.role) return null;

  return (
    <Box bg="teal.500" px={4} color="white" shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            UaiFood
          </Text>
        </Box>

        <HStack
          spacing={8}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          {filteredItems.map((item) => (
            <NextLink key={item.href} href={item.href} passHref legacyBehavior>
              <Link _hover={{ textDecoration: "none", color: "teal.200" }}>
                {item.label}
              </Link>
            </NextLink>
          ))}
        </HStack>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {filteredItems.map((item) => (
              <NextLink
                key={item.href}
                href={item.href}
                passHref
                legacyBehavior
              >
                <Link onClick={onClose}>{item.label}</Link>
              </NextLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
