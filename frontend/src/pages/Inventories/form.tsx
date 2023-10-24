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
    Select,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Currency } from "../../constants";

const schema = z.object({
    _id: z.string().optional(),
    product_name: z.string(),
    expire_date: z.string(),
    cost_price: z.number(),
    selling_price: z.number(),
    currency: z.enum(Currency),
    description: z.string(),
});

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
                const formattedDate = new Date(data.expire_date).toISOString();

                data.expire_date = formattedDate;

                console.log('data', data)
                onSubmit(data);
                reset();
            })}>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Create New Hotel</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor="product_name">Product Name</FormLabel>
                                <Input
                                    {...register("product_name")}
                                    type="text"
                                    id="product_name"
                                    placeholder="Please enter product name"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="expire_date">expire_date</FormLabel>
                                <Input
                                    {...register("expire_date")}
                                    type="datetime-local"
                                    id="expire_date"
                                    placeholder="Please enter expire_date"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="cost_price">cost_price</FormLabel>
                                <Input
                                    {...register("cost_price")}
                                    type="number"
                                    id="cost_price"
                                    placeholder="Please enter cost_price"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="selling_price">selling_price</FormLabel>
                                <Input
                                    {...register("selling_price")}
                                    type="number"
                                    id="selling_price"
                                    placeholder="Please enter selling_price"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="description">description</FormLabel>
                                <Input
                                    {...register("description")}
                                    type="text"
                                    id="description"
                                    placeholder="Please enter description"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="currency">Select Currency: </FormLabel>
                                <Select {...register('currency')} id="currency" defaultValue="None">
                                    {Currency.map((method) => (
                                        <option key={method} value={method}>
                                            {method}
                                        </option>
                                    ))}
                                </Select>
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