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
    name: z.string().min(3),
    email: z.string().min(3),
    mobile_number: z.string().min(3),
    password: z.string().min(3),
});

type SignupFormDate = z.infer<typeof schema>;

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormDate>({ resolver: zodResolver(schema) });

    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    const onSubmit = async (data: SignupFormDate) => {
        try {
            const response = await apiClient.post("signup", {
                name: data.name,
                email: data.email,
                mobile_number: data.mobile_number,
                Password: data.password,
            });

            const { token } = response.data;

            const localToken = localStorage.setItem("token", token);
            console.log('local datas', localToken);

            // Redirect to the appropriate page
            window.location.href = "/login";
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            width="400px"
            p={4}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            margin="0 auto"
            bg={isDarkMode ? "gray.800" : "white"}
        >
            <Heading as="h2" size="lg" textAlign="center">
                Login
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                        {...register("name")}
                        type="name"
                        placeholder="Enter your username"
                    />
                    {errors.name && (
                        <Box color="red" fontSize="sm">
                            {errors.name.message}
                        </Box>
                    )}
                </FormControl>
                <FormControl mt={4}>
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
                    <FormLabel>mobile_number</FormLabel>
                    <Input
                        {...register("mobile_number")}
                        type="number"
                        placeholder="Enter your usermobile_number"
                    />
                    {errors.mobile_number && (
                        <Box color="red" fontSize="sm">
                            {errors.mobile_number.message}
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
                        Signup
                    </Button>
                    <Link to="/login">
                        <Button
                            colorScheme="blue"
                            width="full"
                            mt={6}
                            _hover={{ bg: "blue.600" }}
                        >
                            Login as Existing User to enter App
                        </Button>
                    </Link>

                </VStack >
            </form>
        </Box>
    );
};

export default Signup;
