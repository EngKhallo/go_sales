import { Table, Thead, Tr, Th, Tbody, Td, Badge, Flex, Avatar, Text, Icon, Checkbox } from "@chakra-ui/react"
import { FiEdit2, FiTrash } from "react-icons/fi"

interface Props {
    id: number;
    name: string;
    title: string;
    status: string;
}

const data: Props[] = [
    { id: 1, name: 'Khalid Abdi', title: 'Developer', status: 'Approved' },
    { id: 2, name: 'Hamse Adam', title: 'Designer', status: 'Pending' },
    { id: 3, name: 'Warsame Ali', title: 'HR', status: 'Rejected' },
    { id: 4, name: 'Ahmed Mohamed', title: 'Sales', status: 'Pending' },
    { id: 5, name: 'Abdi Ismail', title: 'Marketing', status: 'Approved' },
]

export const DataTable = () => {
    return (
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th><Checkbox></Checkbox></Th>
                    <Th>Client</Th>
                    <Th>Status</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.map((item) =>
                    <Tr>
                        <Td><Checkbox></Checkbox></Td>
                        <Td>
                            <Flex align="center">
                                <Avatar src='avatar.jpeg' size="sm" />
                                <Flex flexDir={"column"}>
                                    <Text fontWeight={"medium"} ml={2}>{item.name}</Text>
                                    <Text fontWeight={"light"} ml={2}>{item.title}</Text>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td>
                            <Badge borderRadius={5} variant='solid' colorScheme={item.status === 'Approved' ? 'green' : item.status === 'Pending' ? 'yellow' : 'red'}>
                                {item.status}
                            </Badge>
                        </Td>
                        <Td>
                            <Flex justifyContent={"space-between"}>
                                <Icon color="orange" as={FiEdit2} />
                                <Icon color="red" as={FiTrash} />
                            </Flex>
                        </Td>
                    </Tr>)}
            </Tbody>
        </Table>
    )
}
