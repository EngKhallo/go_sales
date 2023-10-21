import { Box, Button, Text, useColorMode, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Reports = () => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    return (
        <Box p={10} >
            <Text color={isDarkMode ? 'gray.100' : 'gray.600'} fontSize={"2xl"} mb={2}>Dashboard - Reports</Text>
            <SimpleGrid spacing={2} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Hotel Data Analysis</Heading>
                    </CardHeader>
                    <CardBody>
                        <Text></Text>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link to="/hotelReports" ><Button>View here</Button></Link>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Booking Data Analysis </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text></Text>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link to="/bookingReports" ><Button>View here</Button></Link>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Most Booked Hotel </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text></Text>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link to="/mostBookedHotel" ><Button>View here</Button></Link>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <Heading size='md'> Financial Data Analysis </Heading>
                    </CardHeader>
                    <CardBody>
                        <Text></Text>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Link to="hotelsReport" ><Button>View here</Button></Link>
                    </CardFooter>
                </Card>
            </SimpleGrid>
        </Box>
    )
}

export default Reports