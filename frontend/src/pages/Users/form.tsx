import {
    Button,
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormLabel,
    Input,
    Stack,
} from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
    name: z.string().min(3).max(30),
    email: z.string(),
    mobile_number: z.string(),
    // profile_image: z.string(),
    password: z.string().min(3).max(15),
})

type userFormData = z.infer<typeof schema>;

interface Props {
    onSubmit: (data: userFormData) => void;
    isOpen: boolean;
    onClose: () => void;
}

const form = ({ isOpen, onClose, onSubmit }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<userFormData>({ resolver: zodResolver(schema) })

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <form onSubmit={handleSubmit(data => {
                onSubmit(data);
                console.log('user form data ', data)
                reset();
            })}>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Create New User</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing="24px">
                            
                            <Box>
                                <FormLabel htmlFor="username">Name</FormLabel>
                                <Input
                                    {...register("name")}
                                    type="text"
                                    id="username"
                                    placeholder="Please enter user name"
                                />
                            </Box>
                            {errors.name && (
                                <Box color="red" fontSize="sm">
                                    {errors.name.message}
                                </Box>
                            )}
                            <Box>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    {...register("email")}
                                    type="text"
                                    id="email"
                                    placeholder="Please enter user email"
                                />
                            </Box>
                            {errors.name && (
                                <Box color="red" fontSize="sm">
                                    {errors.email?.message}
                                </Box>
                            )}
                            <Box>
                                <FormLabel htmlFor="mobile_number">mobile_number</FormLabel>
                                <Input
                                    {...register("mobile_number")}
                                    type="text"
                                    id="mobile_number"
                                    placeholder="Please enter user mobile_number"
                                />
                            </Box>
                            {errors.name && (
                                <Box color="red" fontSize="sm">
                                    {errors.email?.message}
                                </Box>
                            )}
                            {/* <Box>
                                <FormLabel htmlFor="profile_image">profile_image</FormLabel>
                                <Input
                                    {...register("profile_image")}
                                    type="file"
                                    id="profile_image"
                                    placeholder="Please enter user profile_image"
                                />
                            </Box>
                            {errors.name && (
                                <Box color="red" fontSize="sm">
                                    {errors.email?.message}
                                </Box>
                            )} */}
                            <Box>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input
                                    {...register("password")}
                                    type="text"
                                    id="password"
                                    placeholder="Please enter user password"
                                />
                            </Box>
                            {errors.password && (
                                <Box color="red" fontSize="sm">
                                    {errors.password.message}
                                </Box>
                            )}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" type="submit">
                            Submit
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
    )
}

export default form