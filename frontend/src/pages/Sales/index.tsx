import {
    Button, Flex, Icon,
    useColorMode, Box, Input, Text, useDisclosure, useToast,
} from "@chakra-ui/react"
import { FiPlus, FiRefreshCw, FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { DataTable } from "./table";
import { ProductSale, ISales, Inventory } from "../../interfaces";
import Form from "./form";
import apiClient from "../../services/api-client";
import { CanceledError } from "axios";
import sales_service from "../../services/sales_service";


export const Sales = () => {
    const title = "Sales";
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    const { onOpen, isOpen, onClose } = useDisclosure()
    const toast = useToast();


    const [sale, setSale] = useState<ProductSale[]>([]);
    const [newSales, setNewSales] = useState<ISales[]>([]);
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true)
        const { request, cancel } = sales_service.getAllSales();
        request.then(res => {
            const data = res.data;
            console.log("sales data", res)
            setSale(data)
            setLoading(false)

        }).catch(err => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            console.log("error is", err.message);
            setLoading(false)
        });

        return () => cancel();
    }

    const fetchProducts = async () => {
        try {
          const response = await apiClient.get('/inventory');
          const data = response.data;
          setInventory(data);
          return data;
        } catch (err) {
          console.error('Error fetching products', err);
          throw err;
        }
      };
      

    useEffect(() => {
        fetchData(),
        console.log("all inventories: ", inventory)
        fetchProducts()
    }, []);

    const addNewSale = async (newSale: ISales) => {
        try {
            const response = await apiClient.post<ISales>(`/sales`, newSale);
            const addedSale = response.data;
            setNewSales([...newSales, addedSale]);
            console.log('New Sale: ', sale)
            toast({
                title: `${title} created`,
                description: `We've created your ${title} for you.`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (err) {
            console.error('error adding new sale', err);
        }
    };

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
                            <Form products={inventory} isOpen={isOpen} onClose={onClose}
                                onSubmit={(formData) => {
                                    const newSale: ISales = { ...formData, quantity: parseInt(formData.quantity)};
                                    addNewSale(newSale);
                                }} />

                            <Button variant="unstyled" bgColor="none" onClick={() => fetchData()}>
                                <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
                            </Button>
                            <Icon mx={5} as={FiSettings} fontSize={"20px"} />
                        </Flex>
                    </Box>
                </Flex>

                {/* User Table */}
                <DataTable loading={loading} error={error} productSales={sale} />
            </Box>
        </Box>
    )
}
