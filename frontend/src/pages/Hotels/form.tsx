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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    name: z.string(),
    address: z.string(),
    location: z.string(),
    email: z.string().email(),
    commissionRate: z.number().min(0),
    phoneNumber: z.string(),
    description: z.string(),
})

type FormData = z.infer<typeof schema>;

interface Props {
    onSubmit: (data: FormData) => void;
    isOpen: boolean;
    onClose: () => void;
}

const form = ({ isOpen, onClose, onSubmit }: Props) => {

    const { register, handleSubmit, reset } = useForm<FormData>({ resolver: zodResolver(schema) })


    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <form id="my-form" onSubmit={handleSubmit(data => {
                onSubmit(data);
                console.log('data', data)
                reset();
            })}>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Create New Hotel</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="hotelname">Hotel Name</FormLabel>
                                <Input
                                    {...register("name")}
                                    type="text"
                                    id="hotelname"
                                    placeholder="Please enter hotel name"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Address">Address</FormLabel>
                                <Input
                                    {...register("address")}
                                    type="text"
                                    id="address"
                                    placeholder="Please enter address"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Location">Location</FormLabel>
                                <Input
                                    {...register("location")}
                                    type="text"
                                    id="location"
                                    placeholder="Please enter location"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Description">Description</FormLabel>
                                <Input
                                    {...register("description")}
                                    type="text"
                                    id="description"
                                    placeholder="Please enter description"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Commission Rate">Commission Rate</FormLabel>
                                <Input
                                    {...register("commissionRate", { valueAsNumber: true })}
                                    type="number"
                                    id="commissionRate"
                                    placeholder="Please enter commissionRate"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Phone Number">Phone Number</FormLabel>
                                <Input
                                    {...register("phoneNumber")}
                                    type="number"
                                    id="phoneNumber"
                                    placeholder="Please enter phoneNumber"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Email">Email</FormLabel>
                                <Input
                                    {...register("email")}
                                    type="string"
                                    id="email"
                                    placeholder="Please enter email"
                                />
                            </Box>
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter borderTopWidth="1px">
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" type="submit" form="my-form">
                            Submit
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
    )
}

export default form