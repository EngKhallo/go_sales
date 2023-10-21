import { SimpleGrid, Box, Text, GridItem, Container, useColorMode } from "@chakra-ui/react"
import HomeCards from "../components/HomeCards"
import { FiUserPlus } from "react-icons/fi"
import { FaHotel, FaMoneyBill, FaShoppingCart } from "react-icons/fa"
import TablesContainer from "../components/tables/TablesContainer"
import { BarGraph } from "../components/Graphs/BarGraph"
import { ChartData, Hotel, Booking, User } from "../interfaces"
import { useEffect, useState } from "react"
import apiClient from "../services/api-client"

const home = () => { 
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const [Hotels, setHotels] = useState<Hotel[]>([]);
    const [Bookings, setBookings] = useState<Booking[]>([]);
    const [Users, setUsers] = useState<User[]>([]);

    const chartData: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [120, 180, 150, 200, 250, 300],
                backgroundColor: isDarkMode ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)',
                borderColor: isDarkMode ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    const fetchHotels = async () => {
        const response = await apiClient.get<Hotel[]>(`/Hotel`);
        const data = response.data;
        console.log('hotel data', data)
        setHotels(data);
    }
    const fetchBookings = async () => {
        const response = await apiClient.get<Booking[]>(`/Booking`);
        const data = response.data;
        setBookings(data)
    }

    const fetchUsers = async () => {
        const response = await apiClient.get<User[]>(`/Auth`);
        const data = response.data;
        setUsers(data);
    }

    useEffect(() => {
        fetchHotels()
        fetchBookings()
        fetchUsers()
    }, [])

    return (
        <Box p={3} >
            <Text>Dashboard - Home</Text>
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} spacing={10} m={5}>
                <HomeCards title={"Available Hotels"} follow={Hotels.length.toString() + " Hotels"} icon={FaHotel} bgColor="red.500" />
                <HomeCards title={"No. of Bookings"} follow={Bookings.length.toString() + " Bookings"} icon={FaMoneyBill} bgColor="green.500" />
                <HomeCards title={"Approved Hotels"} follow={''} icon={FaShoppingCart} bgColor="blue.500" />
                <HomeCards title={"All Users"} follow={Users.length + ' Users'} icon={FiUserPlus} bgColor="purple.400" />
            </SimpleGrid>

            <SimpleGrid columns={{ sm: 1, md: 1, lg: 2 }} spacing={10} gap={3}>
                <GridItem>
                    <Container>
                        <BarGraph isDarkMode={isDarkMode} chartData={chartData} />
                    </Container>
                </GridItem>
                <GridItem>
                    <TablesContainer />
                </GridItem>
            </SimpleGrid>

        </Box>
    )
}

export default home