import { useState, useEffect } from "react";
import { Button, Flex, Icon, Box, Input, Text, useColorMode } from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import { DataTable } from "./table";
import { Booking, Hotel, HotelData, Room, RoomData, User } from "../../../interfaces";
import apiClient from "../../../services/api-client";

export const MostBookedHotel: React.FC = () => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    const [booking, setBooking] = useState<Booking[]>([]);
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [filterCheckIn, setFilterCheckIn] = useState<string>("");
    const [filterCheckOut, setFilterCheckOut] = useState<string>("");
    const [filterReferenceId, setFilterReferenceId] = useState<string>("");
    const [filterHotel, setFilterHotel] = useState<string>("");
    const [filterRoom, setFilterRoom] = useState<string>("");
    const [filterMostBookedHotel, setFilterMostBookedHotel] = useState<string>("");

    useEffect(() => {
        fetchBookingData();
        fetchHotels();
        fetchRooms();
        fetchUsers();
    }, []);

    const fetchBookingData = async () => {
        try {
            const response = await apiClient.get<Booking[]>("Booking/");
            setBooking(response.data);

            // Find the hotel with the most bookings
            const bookingCounts: { [key: string]: number } = {};
            response.data.forEach((booking) => {
                if (bookingCounts[booking.hotelName]) {
                    bookingCounts[booking.hotelName]++;
                } else {
                    bookingCounts[booking.hotelName] = 1;
                }
            });

            const mostBookedHotel = Object.keys(bookingCounts).reduce((a, b) =>
                bookingCounts[a] > bookingCounts[b] ? a : b
            );

            setFilterMostBookedHotel(mostBookedHotel);
        } catch (err) {
            setBooking([]);
            console.error("Error fetching booking data", err);
        }
    };

    const fetchHotels = async () => {
        try {
            const response = await apiClient.get<HotelData>(`/Hotel/`);
            const data = response.data.data;
            setHotels(data);
        } catch (error) {
            console.error("Error fetching hotel data", error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await apiClient.get<RoomData>(`/Room/`);
            const data = response.data.data;
            setRooms(data);
        } catch (error) {
            console.error("Error fetching room data", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await apiClient.get<User[]>(`/Auth/`);
            const data = response.data;
            setUsers(data);
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };

    const filteredBooking = booking.filter((item) => {
        const matchesReferenceId = item.transactionId?.toString().includes(filterReferenceId);
        const matchesHotel = item.hotelName.toString().toLowerCase().includes(filterHotel);
        const matchesRoom = item.roomName?.toString().toLowerCase().includes(filterRoom);
        const matchesMostBookedHotel = item.hotelName === filterMostBookedHotel;
        const matchesCheckIn =
            !filterCheckIn || new Date(item.checkIn) >= new Date(filterCheckIn);
        const matchesCheckOut =
            !filterCheckOut || new Date(item.checkOut) <= new Date(filterCheckOut);

        return (
            matchesReferenceId &&
            matchesHotel &&
            matchesRoom &&
            matchesMostBookedHotel &&
            matchesCheckIn &&
            matchesCheckOut
        );
    });

    return (
        <Box p={10}>
            <Text color={isDarkMode ? "gray.100" : "gray.600"} fontSize={"2xl"} mb={2}>
                Dashboard - Bookings
            </Text>
            <Box bg={isDarkMode ? "gray.800" : "white"} p={5}>
                <Flex justifyContent="space-between">
                    <Box>
                        <Input
                            placeholder="Filter by Reference ID"
                            w="300px"
                            mr={3}
                            value={filterReferenceId}
                            onChange={(e) => setFilterReferenceId(e.target.value)}
                        />
                        <Input
                            placeholder="Filter by Hotel Name"
                            w="300px"
                            mr={3}
                            value={filterHotel}
                            onChange={(e) => setFilterHotel(e.target.value)}
                        />
                        <Input
                            placeholder="Filter by Room Name"
                            w="300px"
                            value={filterRoom}
                            onChange={(e) => setFilterRoom(e.target.value)}
                        />

                        <Box display="flex" mt={5} flexDirection="column">
                            <Box display="flex" flexDirection="row">
                                <Input
                            placeholder="Filter by Most Booked Hotel"
                            w="300px"
                            mr={3}
                            value={filterMostBookedHotel}
                            onChange={(e) => setFilterMostBookedHotel(e.target.value)}
                        />
                                <Input
                                    placeholder="Filter by Check-In Date"
                                    w="300px"
                                    mr={3}
                                    value={filterCheckIn}
                                    type="date"
                                    onChange={(e) => setFilterCheckIn(e.target.value)}
                                />
                                <Input
                                    placeholder="Filter by Check-Out Date"
                                    w="300px"
                                    value={filterCheckOut}
                                    type="date"
                                    onChange={(e) => setFilterCheckOut(e.target.value)}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Flex>
            </Box>

            <Box mt={4} bg={isDarkMode ? "gray.800" : "white"} p={10}>
                <Flex justify="end" mx={3}>
                    <Box mb={3}>
                        <Flex align="center">
                            <Button variant="unstyled" bgColor="none" onClick={fetchBookingData}>
                                <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
                            </Button>
                            <Button mx={3} colorScheme="green">
                                Export Pdf
                            </Button>
                            <Button colorScheme="yellow">Export Pdf</Button>
                        </Flex>
                    </Box>
                </Flex>

                {/* DataTable */}
                <DataTable booking={filteredBooking} />
            </Box>
        </Box>
    );
};
