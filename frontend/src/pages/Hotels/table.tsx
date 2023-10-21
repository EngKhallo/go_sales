import { Table, Thead, Tr, Th, Tbody, Td, Flex, Text, Icon, Checkbox, TableContainer,Button } from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { Hotel } from "../../interfaces";

interface Props {
    hotel: Hotel[];
    error: string;
    loading: boolean;
    onDelete: (hotel: Hotel) => void;
}

export const DataTable = ({ hotel, onDelete }: Props) => {
    return (
        <TableContainer maxW="100%" overflowX="scroll">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>
                            <Checkbox></Checkbox>
                        </Th>
                        <Th>Name</Th>
                        <Th>Address</Th>
                        <Th>Location</Th>
                        <Th>Number</Th>
                        <Th>Commission Rate</Th>
                        <Th>Description</Th>
                        <Th>Email</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody textAlign="center">
                    {(
                        hotel.map((item) => (
                            <Tr key={item.id}>
                                <Td>
                                    <Checkbox></Checkbox>
                                </Td>
                                <Td>
                                    <Flex align="center">
                                        <Text fontWeight="medium" ml={2}>
                                            {item.name}
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.address}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.location}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.phoneNumber}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text textAlign="center" fontWeight="light" ml={2}>
                                        {item.commissionRate}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text textAlign="center" fontWeight="light" ml={2}>
                                        {item.description}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.email}
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
