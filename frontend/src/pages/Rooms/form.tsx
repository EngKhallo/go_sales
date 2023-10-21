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
import { z } from "zod";
import { BedConfigrations, RoomTypes } from "../../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    type: z.string(),
    price: z.number().min(5),
    hotelName: z.string(),
    roomNumber: z.string(),
    floorNumber: z.number(),
    maximumOccupancy: z.number().min(1),
    bedConfiguration: z.string(),
})

type FormData = z.infer<typeof schema>;

interface Props {
    onSubmit: (data: FormData) => void;
    isOpen: boolean;
    onClose: () => void;
    hotel: { id: number; name: string }[];
}

export const Form = ({ onSubmit, isOpen, onClose, hotel }: Props) => {
    const { register, reset, handleSubmit } = useForm<FormData>({ resolver: zodResolver(schema) });
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
            <DrawerOverlay />
            <form id="my-form" onSubmit={handleSubmit(data => {
                onSubmit(data);
                reset();
            })}>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Create New Hotel</DrawerHeader>
                    <DrawerBody>
                        <Stack spacing="24px">
                            <Box>
                                <FormLabel htmlFor='roomType'>Select Room Type</FormLabel>
                                <Select {...register("type")} id='roomType' defaultValue='None'>
                                    {RoomTypes.map((room) =>
                                        <option key={room} value={room}>{room}</option>
                                    )}
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Price">Price</FormLabel>
                                <Input
                                    {...register("price", { valueAsNumber: true })}
                                    type="number"
                                    id="price"
                                    placeholder="Please enter price"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor='hotel name'>Select Hotel Name</FormLabel>
                                <Select {...register("hotelName")} id='hotel name' defaultValue='None'>
                                    {hotel.map(({ id, name }) =>
                                        <option key={id} value={id}>{name}</option>
                                    )}
                                </Select>
                            </Box>
                            <Box>
                                <FormLabel htmlFor="roomNumber">Room Number</FormLabel>
                                <Input
                                    {...register("roomNumber")}
                                    type="text"
                                    id="roomNumber"
                                    placeholder="Please enter room number"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Floor Number">Floor Number</FormLabel>
                                <Input
                                    {...register("floorNumber", { valueAsNumber: true })}
                                    type="number"
                                    id="floorNumber"
                                    placeholder="Please enter Floor Number"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Maximum Occupancy">Maximum Occupancy</FormLabel>
                                <Input
                                    {...register("maximumOccupancy", { valueAsNumber: true })}
                                    type="number"
                                    id="maximumOccupancy"
                                    placeholder="Please enter Maximum Occupancy"
                                />
                            </Box>
                            <Box>
                                <FormLabel htmlFor="Bed Configuration">Bed Configuration</FormLabel>
                                <Select {...register("bedConfiguration")} id='bedConfiguration' defaultValue='None'>
                                    {BedConfigrations.map((bed) =>
                                        <option key={bed} value={bed}>{bed}</option>
                                    )}
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
