import { Table, Thead, Tr, Th, Tbody, Td, Flex, Text, Icon, Checkbox, TableContainer } from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { Booking } from "../../../interfaces";

interface Props {
    booking: Booking[];
}

export const DataTable = ({ booking }: Props) => {
    return (
        <TableContainer maxW="100%" overflowX="scroll">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>
                            <Checkbox></Checkbox>
                        </Th>
                        <Th fontSize="sm">Reference ID</Th>
                        <Th>Hotel</Th>
                        <Th>Room</Th>
                        <Th>User</Th>
                        <Th>User Name</Th>
                        <Th>CheckIn</Th>
                        <Th>CheckOut</Th>
                        <Th>Duration</Th>
                        <Th>Room Price</Th>
                        <Th>Total Cost</Th>
                        <Th>Commission</Th>
                        <Th>Hotel Revenue</Th>
                        <Th>Payment Method</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {booking.map((item) => (
                        <Tr key={item.id}>
                            <Td>
                                <Checkbox></Checkbox>
                            </Td>
                            <Td>
                                <Flex align="center">
                                    <Text fontWeight={"medium"} ml={2}>{item.transactionId}</Text>
                                </Flex>
                            </Td>
                            <Td>
                                <Text fontWeight={"light"} ml={2}>{item.hotelName}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"light"} ml={2}>{item.roomName}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"light"} ml={2}>{item.userId}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"light"} ml={2}>{item.name}</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>{item.checkIn}</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>{item.checkOut}</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>{item.duration} nights</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>${item.roomPrice} / night</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>${item.totalCost}</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>${item.commission}</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>${item.hotelRevenue}</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>{item.paymentMethod}</Text>
                            </Td>
                            <Td>
                                <Flex justifyContent={"space-around"}>
                                    <Icon color="orange" as={FiEdit2} />
                                    <Icon color="red" as={FiTrash} />
                                </Flex>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
