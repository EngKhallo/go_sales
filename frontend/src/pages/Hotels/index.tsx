import {
    Button, Flex, Icon,
    useColorMode, Box, Input, Text, useDisclosure, useToast,
} from "@chakra-ui/react"
import { FiPlus, FiRefreshCw, FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { DataTable } from "./table";
import { Hotel } from "../../interfaces";
import Form from "./form";
import apiClient from "../../services/api-client";
import hotelService from "../../services/hotel-service";
import { CanceledError } from "axios";


export const Hotels = () => {
    const title = "Hotel";
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    const { onOpen, isOpen, onClose } = useDisclosure()
    const toast = useToast();


    const [hotel, setHotel] = useState<Hotel[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        setLoading(true)
        const { request, cancel } = hotelService.getAllHotels();
        request.then(res => {
            const data = res.data;
            setHotel(data)
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

    const addHotel = async (newHotel: Hotel) => {
        try {
            const response = await apiClient.post<Hotel>(`/Hotel/`, newHotel);
            const addedHotel = response.data;
            setHotel([...hotel, addedHotel]);
            console.log('added hotel', hotel)
            toast({
                title: `${title} created`,
                description: `We've created your ${title} for you.`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (err) {
            console.error('error adding hotel', err);
        }
    };

    const deleteHotel = async (hotels: Hotel) => {
        try {
            setHotel(hotel.filter(h => h.id !== hotels.id));

            const response = await apiClient.delete<Hotel>(`/Hotel/${hotels.id}`)
            const data = response.data;
            console.log('data', data)
            toast({
                title: `${title} deleted`,
                description: `We've deleted your ${title} for you.`,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            const originalHotel = [...hotel];
            console.error('error deleting data: ', error);
            setHotel(originalHotel)
        }
    }


    return (
        <Box p={10}>
            <Text color={isDarkMode ? 'gray.100' : 'gray.600'} fontSize={"2xl"} mb={2}>Dashboard - Hotels</Text>
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
                                    const newHotel: Hotel = { ...formData, id: hotel.length + 1 };
                                    addHotel(newHotel);
                                }} />

                            <Button variant="unstyled" bgColor="none" onClick={() => fetchData()}>
                                <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
                            </Button>
                            <Icon mx={5} as={FiSettings} fontSize={"20px"} />
                        </Flex>
                    </Box>
                </Flex>

                {/* User Table */}
                <DataTable loading={loading} error={error} hotel={hotel} onDelete={deleteHotel} />
            </Box>
        </Box>
    )
}
