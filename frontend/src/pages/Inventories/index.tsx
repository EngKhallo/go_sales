import {
    Button, Flex, Icon,
    useColorMode, Box, Input, Text, useDisclosure, useToast,
} from "@chakra-ui/react"
import { FiPlus, FiRefreshCw, FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { DataTable } from "./table";
import { Inventory } from "../../interfaces";
import apiClient from "../../services/api-client";
import { CanceledError } from "axios";
import inventory_service from "../../services/inventory_service";
import Form from "./form";


export const Inventories = () => {
    const title = "Inventories";
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    const { onOpen, isOpen, onClose } = useDisclosure()
    const toast = useToast();


    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true)
        const { request, cancel } = inventory_service.getAllInventories();
        request.then(res => {
            const data = res.data;
            setInventory(data)
            setLoading(false)

        }).catch(err => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            console.log(err.message);
            setLoading(false)
        });

        return () => cancel();
    }

    useEffect(() => {
        fetchData()
    }, []);

    const addInventory = async (newInventory: Inventory) => {
        try {
            const response = await apiClient.post<Inventory>(`/inventory`, newInventory);
            const addedInventory = response.data;
            setInventory([...inventory, addedInventory]);
            console.log('added inventory product', inventory)
            toast({
                title: `${title} created`,
                description: `We've created your ${title} for you.`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (err) {
            console.error('error adding inventory', err);
        }
    };

    const deleteInventory = async (inventories: Inventory) => {
        try {
            setInventory(inventory.filter(h => h._id !== inventories._id));
            toast({
                title: `${title} deleted`,
                description: `We've deleted your ${title} for you.`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            const originalInventory = [...inventory];
            console.error('error deleting data: ', error);
            setInventory(originalInventory)
        }
    }


    return (
        <Box p={10}>
            <Text color={isDarkMode ? 'gray.100' : 'gray.600'} fontSize={"2xl"} mb={2}>Dashboard - {title}</Text>
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
                                    const newInventory: Inventory = { ...formData };
                                    addInventory(newInventory);
                                }} />

                            <Button variant="unstyled" bgColor="none" onClick={() => fetchData()}>
                                <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
                            </Button>
                            <Icon mx={5} as={FiSettings} fontSize={"20px"} />
                        </Flex>
                    </Box>
                </Flex>

                {/* User Table */}
                <DataTable loading={loading} error={error} inventory={inventory} onDelete={deleteInventory} />
            </Box>
        </Box>
    )
}
