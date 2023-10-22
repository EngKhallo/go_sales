import {
    Button, Flex, Icon,
    useColorMode, Box, Input, Text, useDisclosure
} from "@chakra-ui/react"
import { FiPlus, FiRefreshCw, FiSettings } from "react-icons/fi";
import Form from "./form";
import { useEffect, useState } from "react";
import { DataTable } from "./table";
import userService from "../../services/user-service";
import { User } from "../../interfaces";
import { CanceledError } from "axios";
import apiClient from "../../services/api-client";


const Users = () => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    const { onOpen, isOpen, onClose } = useDisclosure()

    const [user, setUser] = useState<User[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true);
        const { request, cancel } = userService.getAllUsers();
        request.then(response => {
            const data = response.data;
            setUser(data)
            console.log(data)
            setLoading(false);
        }).catch(err => {
            if (err instanceof CanceledError) return;
            console.log(err.message)
            setError(err.message)
            setLoading(false)
        })

        return () => cancel();
    }

    const addUser = async (newUser: User) => {
        try {
            const reponse = await apiClient.post<User>('/users', newUser);
            const addedUser = reponse.data;
            setUser([...user, addedUser]);
            console.log('actual user: ', [...user, addedUser])
        } catch (error) {
            console.error('Error saving data: ', error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <Box p={10}>
            <Text color={isDarkMode ? 'gray.100' : 'gray.600'} fontSize={"2xl"} mb={2}>Dashboard - Users</Text>
            <Box bg={isDarkMode ? 'gray.800' : 'white'} p={5}>
                <Flex justifyContent={"space-between"}>
                    <Box>
                        <Input placeholder="Filter data" w={"400px"} />
                    </Box>
                    <Box>
                        <Button mx={3} colorScheme='blue'>Query</Button>
                        <Button colorScheme='red'>Reset</Button>
                    </Box>
                </Flex>
            </Box>

            <Box mt={4} bg={isDarkMode ? 'gray.800' : 'white'} p={10}>
                <Flex justify="end" mx={3}>
                    <Box mb={3}>
                        <Flex align="center">
                            <Button rightIcon={<FiPlus />} colorScheme='blue' onClick={onOpen}>
                                Add
                            </Button>

                            {/* Users Form */}
                            <Form isOpen={isOpen} onClose={onClose}
                                onSubmit={(formData) => {
                                    const newUser: User = { ...formData };
                                    addUser(newUser);
                                }} />

                            <Button variant="unstyled" bgColor="none" onClick={() => fetchData()}>
                                <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
                            </Button>
                            <Icon mx={5} as={FiSettings} fontSize={"20px"} />
                        </Flex>
                    </Box>
                </Flex>

                {/* User Table */}
                <DataTable error={error} loading={loading} user={user} />
            </Box>
        </Box>
    )
}

export default Users