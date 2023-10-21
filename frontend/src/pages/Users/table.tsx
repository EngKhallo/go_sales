import { Table, Thead, Tr, Th, Tbody, Td, Badge, Flex, Text, Icon, Checkbox } from "@chakra-ui/react"
import { FiEdit2, FiTrash } from "react-icons/fi"
import { User } from "../../interfaces";

interface Props {
    user: User[];
    error: string;
    loading: boolean;
}

export const DataTable = ({ user }: Props) => {
    return (
        <Table variant='simple'>
            <Thead>
                <Tr>
                    <Th><Checkbox></Checkbox></Th>
                    <Th>User Name</Th>
                    <Th>Role</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {user.map((item) =>
                    <Tr key={item.id}>
                        <Td><Checkbox></Checkbox></Td>
                        <Td>
                            <Flex align="center">
                                <Flex flexDir={"column"}>
                                    <Text fontWeight={"medium"} ml={2}>{item.name}</Text>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td>
                            <Badge borderRadius={5} variant='solid' colorScheme={item.role === 'Admin' ? 'green' : item.role === 'Employee' ? 'yellow' : item.role === 'Project Manager' ? 'purple' : 'teal'}>
                                {item.role}

                            </Badge>
                        </Td>
                        <Td>
                            <Flex align="center">
                                <Flex flexDir={"column"}>
                                    <Text fontWeight={"medium"} ml={2}>{item.email}</Text>
                                </Flex>
                            </Flex>
                        </Td>
                        <Td>
                            <Flex justifyContent={"space-evenly"}>
                                <Icon color="orange" as={FiEdit2} />
                                <Icon color="red" as={FiTrash} />
                            </Flex>
                        </Td>
                    </Tr>)}
            </Tbody>
        </Table>
    )
}
