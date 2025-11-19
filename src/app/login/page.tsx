"use client";
import {
  Box,
  Heading,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Checkbox,
  Icon,
  useBreakpointValue,
  Center,
  VStack,
  HStack,
  SimpleGrid,
  InputRightElement,
  useToast,
  FormErrorMessage,
  FormControl,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";
import {
  FaUser,
  FaFacebookF,
  FaGoogle,
  FaEnvelope,
  FaExchangeAlt,
  FaTelegramPlane,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { useForm, SubmitHandler, Form } from "react-hook-form";

import React from "react";
import { FormLogin, schemaLogin } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationLogin } from "@/hooks/login/useMutationLogin";
import { useRouter } from "next/navigation";


const frostedGlassStyle = {
  bg: "rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
};

const backgroundImageSrc = "/imgs/login/bg.jpg";
const LoginScreen: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const mutationLogin = useMutationLogin();
  const toast = useToast();
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormLogin>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  const onSubmit: SubmitHandler<FormLogin> = async (data) => {
    await mutationLogin.mutateAsync(data, {
      onSuccess: () => {
        toast({
          title: "Login Concluído!",
          description: "Autenticação realizada com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/dashboard")
      },
    });
  };
  return (
    <Box
      position="relative"
      w="100vw"
      h="100vh"
      overflow={"hidden"}
      bgColor={"#A6F6AF"}
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        backgroundImage={`url(${backgroundImageSrc})`}
        backgroundSize="cover"
        backgroundPosition="center"
        filter="blur(5px)"
        opacity="0.4"
        zIndex="0"
      />
      <Center
        w="100vw"
        h="100vh"
        bg="transparent"
        p={4}
        position="relative"
        zIndex="1"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid
            columns={isMobile ? 1 : 2}
            spacing={0}
            sx={frostedGlassStyle}
            w={isMobile ? "95%" : "800px"}
            h={isMobile ? "auto" : "500px"}
            overflow="hidden"
          >
            <VStack
              p={8}
              bg="rgba(255, 255, 255, 0.7)"
              color="gray.700"
              justify="center"
              align="start"
              spacing={6}
              order={isMobile ? 2 : 1}
              position="relative"
              borderRight={
                isMobile ? "none" : "1px solid rgba(255, 255, 255, 0.3)"
              }
            >
              <Heading size="lg" mb={4} color="gray.700" fontWeight="bold">
                BEM VINDO
              </Heading>

              <Box>
                <Text
                  fontWeight="bold"
                  mb={2}
                  cursor="pointer"
                  color="gray.600"
                  fontSize="md"
                >
                  NOVO Login
                </Text>
                <Button
                  variant="solid"
                  bg="rgba(255, 255, 255, 0.9)"
                  color="gray.700"
                  _hover={{ bg: "gray.100" }}
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.300"
                  leftIcon={<Icon as={FaUser} color="gray.500" />}
                  px={8}
                  py={2}
                  boxShadow="sm"
                  fontSize="sm"
                >
                  Criar Conta
                </Button>
              </Box>

              <Center
                position="absolute"
                top="50%"
                right={isMobile ? "50%" : -5}
                transform={
                  isMobile ? "translate(50%, -50%)" : "translateY(-50%)"
                }
                zIndex={10}
                w="35px"
                h="35px"
                borderRadius="full"
                bg="white"
                border="1px solid"
                borderColor="gray.300"
                boxShadow="md"
                cursor="pointer"
              >
                <Icon as={FaExchangeAlt} color="gray.500" w={4} h={4} />
              </Center>

              <HStack spacing={4} mt={8}>
                <Center
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg="white"
                  boxShadow="sm"
                >
                  <Icon
                    as={FaEnvelope}
                    w={4}
                    h={4}
                    color="#E4405F"
                    cursor="pointer"
                  />
                </Center>
                <Center
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg="white"
                  boxShadow="sm"
                >
                  <Icon
                    as={FaGoogle}
                    w={4}
                    h={4}
                    color="#4285F4"
                    cursor="pointer"
                  />
                </Center>
                <Center
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg="white"
                  boxShadow="sm"
                >
                  <Icon
                    as={FaFacebookF}
                    w={4}
                    h={4}
                    color="#1877F2"
                    cursor="pointer"
                  />
                </Center>
              </HStack>
            </VStack>

            <VStack
              p={8}
              bg="rgba(197, 222, 172, 0.4)"
              color="gray.700"
              justify="center"
              spacing={6}
              order={isMobile ? 1 : 2}
            >
              <Text
                alignSelf="flex-end"
                fontWeight="bold"
                fontSize="sm"
                color="gray.600"
                letterSpacing="wider"
                textTransform="uppercase"
              >
                LOGAR
              </Text>

              <Heading size="lg" fontWeight="extrabold" mb={4} color="gray.700">
                FAÇA LOGIN
              </Heading>

              <VStack spacing={4} w="100%">
                <FormControl isInvalid={!!errors.email}>
                  <InputGroup size="md">
                    <InputLeftElement pointerEvents="none" h="100%">
                      <Icon as={FaUser} color="gray.600" />
                    </InputLeftElement>
                    <Input
                      placeholder="E-MAIL"
                      _placeholder={{ color: "gray.500" }}
                      bg="rgba(255, 255, 255, 0.7)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.5)"
                      borderRadius="full"
                      h="45px"
                      fontSize="sm"
                      boxShadow="sm"
                      {...register("email")}
                    />
                  </InputGroup>
                  <FormErrorMessage fontSize="xs" ml={4} color="red.500">
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                  <InputGroup size="md">
                    <InputLeftElement pointerEvents="none" h="100%">
                      <LockIcon color="gray.600" />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      _placeholder={{ color: "gray.500" }}
                      bg="rgba(255, 255, 255, 0.7)"
                      border="1px solid"
                      borderColor="rgba(255, 255, 255, 0.5)"
                      borderRadius="full"
                      h="45px"
                      fontSize="sm"
                      boxShadow="sm"
                      paddingRight="4.5rem"
                      {...register("password")}
                    />
                    <InputRightElement width="4.5rem" h="100%">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleShowClick}
                        bg="transparent"
                        _hover={{ bg: "rgba(0,0,0,0.05)" }}
                        p={0}
                        w="100%"
                      >
                        <Icon
                          as={showPassword ? FaEyeSlash : FaEye}
                          color="gray.600"
                          w={4}
                          h={4}
                        />
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage fontSize="xs" ml={4} color="red.500">
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
              </VStack>

              <HStack w="100%" justify="flex-start" mt={2}>
                <Checkbox
                  colorScheme="green"
                  size="sm"
                  color="gray.600"
                  borderColor="gray.400"
                  {...register("rememberMe")}
                >
                  Lembrar de mim
                </Checkbox>
              </HStack>

              <Button
                w="100%"
                size="lg"
                bg="#5E3F43"
                color="white"
                _hover={{ bg: "#4B3236" }}
                borderRadius="full"
                mt={4}
                fontWeight="bold"
                letterSpacing="wider"
                boxShadow="md"
                h="45px"
                fontSize="md"
                type="submit"
                isLoading={isSubmitting}
              >
                Entrar
              </Button>

              <HStack spacing={4} mt={6}>
                <Center
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg="white"
                  boxShadow="sm"
                >
                  <Icon
                    as={FaEnvelope}
                    w={4}
                    h={4}
                    color="#E4405F"
                    cursor="pointer"
                  />
                </Center>
                <Center
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg="white"
                  boxShadow="sm"
                >
                  <Icon
                    as={FaTelegramPlane}
                    w={4}
                    h={4}
                    color="#0088CC"
                    cursor="pointer"
                  />
                </Center>
                <Center
                  w={8}
                  h={8}
                  borderRadius="full"
                  bg="white"
                  boxShadow="sm"
                >
                  <Icon
                    as={FaFacebookF}
                    w={4}
                    h={4}
                    color="#1877F2"
                    cursor="pointer"
                  />
                </Center>
              </HStack>
            </VStack>
          </SimpleGrid>
        </form>
      </Center>
    </Box>
  );
};

export default LoginScreen;
