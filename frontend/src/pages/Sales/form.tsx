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
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Currency } from '../../constants';
import { Inventory } from '../../interfaces';

const schema = z.object({
  product_id: z.string().nonempty("Product ID is required"),
  sales_date: z.string().nonempty("Sales date is required"),
  quantity: z.string(),
  currency: z.string().nonempty("Currency is required"),
  customer: z.string().nonempty("Customer name is required"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (data: FormData) => void;
  isOpen: boolean;
  onClose: () => void;
  products: Inventory[] | undefined;
}

const Form: React.FC<Props> = ({ isOpen, onClose, onSubmit, products }) => {
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
                <FormLabel htmlFor="product_id">Select Product: </FormLabel>
                <Select {...register('product_id')} id="product_id" defaultValue="None">
                  {products?.map(({ _id, product_name }) => (
                    <option key={_id} value={_id}>
                      {product_name}
                    </option>
                  ))}
                </Select>
                {/* <Input {...register('product_id')} type="string" id="product_id" /> */}
              </Box>
              <Box>
                <FormLabel htmlFor="Sales Date">Select Sales Date: </FormLabel>
                <Input {...register('sales_date')} type="datetime-local" id="sales_date" />
                {errors.sales_date && <Text color="red">{errors.sales_date.message}</Text>}
              </Box>
              <Box>
                <FormLabel htmlFor="quantity">Quantity of the product: </FormLabel>
                <Input {...register('quantity')} type="number" id="quantity" />
                {errors.quantity && <Text color="red">{errors.quantity.message}</Text>}
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

              <Box>
                <FormLabel htmlFor="customer">Customer Name: </FormLabel>
                <Input {...register('customer')} type="text" id="customer" />
                {errors.customer && <Text color="red">{errors.customer.message}</Text>}
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
