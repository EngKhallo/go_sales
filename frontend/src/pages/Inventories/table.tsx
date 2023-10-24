import { Table, Thead, Tr, Th, Tbody, Td, Flex, Text, Icon, Checkbox, TableContainer, Button } from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { Inventory } from "../../interfaces";
import moment from "moment";

interface Props {
    inventory: Inventory[];
    error: string;
    loading: boolean;
    onDelete: (inventory: Inventory) => void;
}

export const DataTable = ({ inventory, onDelete }: Props) => {
    return (
        <TableContainer maxW="100%" overflowX="scroll">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>
                            <Checkbox></Checkbox>
                        </Th>
                        <Th>Product Name</Th>
                        <Th>Expire Date</Th>
                        <Th>Cost Price</Th>
                        <Th>Selling Price</Th>
                        <Th>Currency</Th>
                        <Th>Description</Th>
                        <Th>Product Image</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody textAlign="center">
                    {(
                        inventory.map((item) => (
                            <Tr key={item._id}>
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
                                    <Text fontWeight="light" ml={2}>
                                        {moment(item.expire_date).format('YYYY-MM-DD / hh:mm')}

                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.cost_price}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.selling_price}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text textAlign="center" fontWeight="light" ml={2}>
                                        {item.currency}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text textAlign="center" fontWeight="light" ml={2}>
                                        {item.description}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.product_image}
                                    </Text>
                                </Td>
                                <Td>
                                    <Flex justifyContent="space-around">
                                        <Button variant="unstyled" bgColor="none">
                                            <Icon color="orange" as={FiEdit2} />
                                        </Button>
                                        <Button variant="unstyled" bgColor="none" onClick={() => onDelete(item)}>
                                            <Icon color="red" as={FiTrash} />
                                        </Button>

                                    </Flex>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
