import { Table, Thead, Tr, Th, Tbody, Td, Flex, Text, Icon, Checkbox, TableContainer } from "@chakra-ui/react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { Room } from "../../interfaces";

interface Props {
    room: Room[];
}

export const DataTable = ({ room }: Props) => {
    return (
        <TableContainer maxW="100%" overflowX="scroll">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>
                            <Checkbox></Checkbox>
                        </Th>
                        <Th>Type</Th>
                        <Th>Price</Th>
                        <Th>Hotel</Th>
                        <Th>Room Number</Th>
                        <Th>Floor Number</Th>
                        <Th>Maximum Occupancy</Th>
                        <Th>Bed Configuration</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {room.map((item) => (
                        <Tr key={item.id}>
                            <Td>
                                <Checkbox></Checkbox>
                            </Td>
                            <Td>
                                <Text fontWeight={"normal"} ml={2}>{item.type}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"normal"} ml={2}>${item.price} / night</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"medium"} ml={2}>{item.hotelName}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"medium"} ml={2}>{item.roomNumber}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"medium"} ml={2}>{item.floorNumber}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"medium"} ml={2}>{item.maximumOccupancy}</Text>
                            </Td>
                            <Td>
                                <Text fontWeight={"medium"} ml={2}>{item.bedConfiguration}</Text>
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
