import { SimpleGrid, Box, Text, GridItem, Container, useColorMode } from "@chakra-ui/react"
import HomeCards from "../components/HomeCards"
import { FiUserPlus } from "react-icons/fi"
import { FaShoppingCart, FaSitemap } from "react-icons/fa"
import TablesContainer from "../components/tables/TablesContainer"
// import { BarGraph } from "../components/Graphs/BarGraph"
import { User, Inventory, ChartData, ProductSale } from "../interfaces"
import { useEffect, useState } from "react"
import apiClient from "../services/api-client"
import { BarGraph } from "../components/Graphs/BarGraph"

const home = () => { 
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    const [Inventory, setInventory] = useState<Inventory[]>([]);
    const [Sales, setSales] = useState<ProductSale[]>([]);
    const [Users, setUsers] = useState<User[]>([]);

   

    const fetchUsers = async () => {
        const response = await apiClient.get<User[]>(`/users`);
        const data = response.data;
        setUsers(data);
    }
    const fetchSales = async () => {
        const response = await apiClient.get<ProductSale[]>(`/sales`);
        const data = response.data;
        setSales(data);
    }
    const fetchInventory = async () => {
        const response = await apiClient.get<Inventory[]>(`/inventory`);
        const data = response.data;
        setInventory(data);
    }

    const chartData: ChartData = {
        
        labels: Sales.map(sale => sale.product_name).toString().split(','),
        datasets: [
            {
                label: 'Products with the most sales',
                data: Sales.map(sale => sale.total_amount),
                backgroundColor: isDarkMode ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)',
                borderColor: isDarkMode ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        fetchInventory()
        fetchSales()
        fetchUsers()
    }, [])

    return (
        <Box p={3} >
            <Text>Dashboard - Home</Text>
            <SimpleGrid columns={{ sm: 2, md: 3, lg: 3 }} spacing={10} m={5}>
                <HomeCards title={"Available Products"} follow={Inventory.length.toString() + " Products"} icon={FaSitemap} bgColor="green.500" />
                <HomeCards title={"All Sales"} follow={Sales.length + ' Sales'} icon={FaShoppingCart} bgColor="blue.500" />
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