import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "../../services/api-client";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().min(3),
  password: z.string().min(3),
});

type loginFormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({ resolver: zodResolver(schema) });

  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const onSubmit = async (data: loginFormData) => {
    try {
      const response = await apiClient.post("login", {
        email: data.email,
        Password: data.password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user))

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      width="400px"
      p={6}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      margin="0 auto"
      mt={10}
      bg={isDarkMode ? "gray.800" : "white"}
    >
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Login
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your useremail"
          />
          {errors.email && (
            <Box color="red" fontSize="sm">
              {errors.email.message}
            </Box>
          )}
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <Box color="red" fontSize="sm">
              {errors.password.message}
            </Box>
          )}
        </FormControl>
        <VStack >
          <Button
            colorScheme="blue"
            width="full"
            mt={6}
            type="submit"
            _hover={{ bg: "blue.600" }}
          >
            Sign In
          </Button>
          <Link to="/signup">
            <Button
              colorScheme="blue"
              width="full"
              mt={6}
              _hover={{ bg: "blue.600" }}
            >
              Sign Up as New User
            </Button>
          </Link>

        </VStack >

      </form>
    </Box>
  );
};

export default Login;
