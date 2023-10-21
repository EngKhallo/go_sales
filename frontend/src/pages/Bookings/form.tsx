import React from 'react';
import {
  Box,
  Button,
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
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PaymentMethods } from '../../constants';

const schema = z.object({
  hotelName: z.string().nonempty('Please select a hotel'),
  roomName: z.string().nonempty('Please select a room'),
  checkInDate: z.string().nonempty('Please select a check-in date'),
  checkOutDate: z.string().nonempty('Please select a check-out date'),
  paymentMethod: z.enum(PaymentMethods),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
  isOpen: boolean;
  onClose: () => void;
  hotel: { id: number; name: string }[];
  room: { id: number; type: string }[];
}

const Form: React.FC<Props> = ({ isOpen, onClose, onSubmit, hotel, room }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <form id="my-form" onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create New Booking</DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="hotelName">Select Hotel: </FormLabel>
                <Select {...register('hotelName')} id="hotelName" defaultValue="None">
                  {hotel.map(({ id, name }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="roomName">Select Hotel Room: </FormLabel>
                <Select {...register('roomName')} id="roomName" defaultValue="None">
                  {room.map(({ id, type }) => (
                    <option key={id} value={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="checkInDate">Select Check-In Date: </FormLabel>
                <Input {...register('checkInDate')} type="datetime-local" id="checkInDate" />
                {errors.checkInDate && <Text color="red">{errors.checkInDate.message}</Text>}
              </Box>
              <Box>
                <FormLabel htmlFor="checkOutDate">Select Check-Out Date: </FormLabel>
                <Input {...register('checkOutDate')} type="datetime-local" id="checkOutDate" />
                {errors.checkOutDate && <Text color="red">{errors.checkOutDate.message}</Text>}
              </Box>
              <Box>
                <FormLabel htmlFor="paymentMethod">Select Payment Method: </FormLabel>
                <Select {...register('paymentMethod')} id="paymentMethod" defaultValue="None">
                  {PaymentMethods.map((method) => (
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
            <Button disabled={!isValid} colorScheme="blue" type="submit" form="my-form">
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default Form;
