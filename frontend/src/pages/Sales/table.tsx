import { Table, Thead, Tr, Th, Tbody, Td, Flex, Text, Icon, Checkbox, TableContainer, Button } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { ProductSale } from "../../interfaces";
import moment from "moment";

interface Props {
    productSales: ProductSale[];
    error: string;
    loading: boolean;
    // onDelete: (inventory: Inventory) => void;
}

export const DataTable = ({ productSales, error }: Props) => {
    return (
        <TableContainer maxW="100%" overflowX="scroll">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>
                            <Checkbox></Checkbox>
                        </Th>
                        <Th>Product Name</Th>
                        <Th>Sales Date</Th>
                        <Th>Quantity</Th>
                        <Th>Selling Price</Th>
                        <Th>Total Amount</Th>
                        <Th>Currency</Th>
                        <Th>Customer</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                {error === '401' ? (
                    <Text>You are unauthorized, please Logout to Login Again</Text>
                ) : (
                    <Tbody textAlign="center">
                        {
                            productSales.map((item) => (
                                <Tr key={item.product_id}>
                                    <Td>
                                        <Checkbox></Checkbox>
                                    </Td>
                                    <Td>
                                        <Flex align="center">
                                            <Text fontWeight="medium" ml={2}>
                                                {item.product_name}
                                            </Text>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Flex align="center">
                                            <Text fontWeight="medium" ml={2}>
                                                {moment(item.sale_date).format('YYYY-MM-DD / hh:mm')}
                                            </Text>
                                        </Flex>
                                    </Td>
                                    <Td>
                                        <Text fontWeight="light" ml={2}>
                                            {item.quantity}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Text fontWeight="light" ml={2}>
                                            {item.selling_price}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Text fontWeight="light" ml={2}>
                                            {item.total_amount}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Text textAlign="center" fontWeight="light" ml={2}>
                                            {item.currency}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Text textAlign="center" fontWeight="light" ml={2}>
                                            {item.customer}
                                        </Text>
                                    </Td>
                                    <Td>
                                        <Flex justifyContent="space-around">
                                            <Button variant="unstyled" bgColor="none">
                                                <Icon color="orange" as={FiEdit2} />
                                            </Button>

                                        </Flex>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                )}

            </Table>
        </TableContainer >
    );
};
