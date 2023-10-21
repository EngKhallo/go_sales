import { Table, Thead, Tr, Th, Tbody, Td, Flex, Text, Icon, Checkbox, TableContainer, Button } from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { Booking } from "../../interfaces";
import moment from "moment";

interface Props {
    booking: Booking[];
    handleApprove: (id: number) => void;
    handleReject: (id: number) => void;
    handlePending: (id: number) => void;
}

export const DataTable = ({ booking, handleApprove, handleReject, handlePending }: Props) => {
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
                        <Th>CheckIn</Th>
                        <Th>CheckOut</Th>
                        <Th>Duration</Th>
                        <Th>Room Price</Th>
                        <Th>Total Cost</Th>
                        <Th>Commission</Th>
                        <Th>Hotel Revenue</Th>
                        <Th>Payment Method</Th>
                        <Th>Status</Th>
                        <Th>Status Actions</Th>
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
                                <Text textAlign="center" fontWeight={"light"} ml={2}>{moment(item.checkIn).format('YYYY-MM-DD / hh:mm:ss')}</Text>
                            </Td>
                            <Td>
                                <Text textAlign="center" fontWeight={"light"} ml={2}>{moment(item.checkOut).format('YYYY-MM-DD / hh:mm:ss')}</Text>
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
                                <Text
                                    style={{
                                        color: item.status === 'Pending' ? 'yellow' : item.status === 'Rejected' ? 'red' : item.status === 'Approved' ? 'green' : 'black',
                                        textAlign: 'center',
                                        fontWeight: 'light',
                                        marginLeft: 2
                                    }}
                                >
                                    {item.status}
                                </Text>
                            </Td>
                            <Td>
                                <Flex justifyContent={"space-around"}>
                                    <Button
                                        mr={2}
                                        bg={"green"}
                                        onClick={() => {
                                            console.log(item.id)
                                            handleApprove(item.id)
                                        }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        mr={2}
                                        bg={"red"}
                                        onClick={() => handleReject(item.id)}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        bg={"orange"}
                                        onClick={() => handlePending(item.id)}
                                    >
                                        Pending
                                    </Button>
                                </Flex>
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
