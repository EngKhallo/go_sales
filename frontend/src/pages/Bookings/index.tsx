import {
  Button,
  Flex,
  Icon,
  useColorMode,
  Box,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiPlus, FiRefreshCw, FiSettings } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Booking, Hotel, HotelData, Room, RoomData, User } from "../../interfaces";
import { DataTable } from "./table";
import Form from "./form";
import apiClient from "../../services/api-client";

export const Bookings = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const { onOpen, isOpen, onClose } = useDisclosure();

  const [booking, setBooking] = useState<Booking[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Filtering states
  const [filterReferenceId, setFilterReferenceId] = useState("");
  const [filterHotel, setFilterHotel] = useState("");
  const [filterRoom, setFilterRoom] = useState("");

  const fetchBookingData = async () => {
    try {
      const response = await apiClient.get<Booking[]>("Booking/");
      setBooking(response.data);
    } catch (err) {
      setBooking([]);
      console.error("Error fetching booking data", err);
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await apiClient.get<Hotel[]>(`/Hotel/`);
      const data = response.data;
      console.log('hotels data', data)
      setHotels(data);

    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await apiClient.get<RoomData>(`/Room/`);
      const data = response.data.data;
      setRooms(data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await apiClient.get<User[]>(`/Auth/`);
      const data = response.data;
      setUsers(data);
    } catch (error) {
      console.error("error fetching data", error);
    }
  };

  const addBooking = async (newBooking: Booking) => {
    try {
      const response = await apiClient.post<Booking>(`/Booking/`, newBooking);
      const addedBooking = response.data;
      console.log("saved booking", addedBooking);
      setBooking((prevBooking) => [...prevBooking, addedBooking]);
    } catch (error) {
      console.error("error saving booking data", error);
    }
  };

  const filteredBooking = booking.filter((item) => {
    const matchesReferenceId = item.transactionId?.toString().includes(filterReferenceId);
    const matchesHotel = item.hotelName.toString().toLowerCase().includes(filterHotel);
    const matchesRoom = item.roomName?.toString().toLowerCase().includes(filterRoom);
    // Add other filtering conditions as needed

    return matchesReferenceId && matchesHotel && matchesRoom;
  });

  const handleApprove = async (id: number) => {
    try {
      await apiClient.put(`/Booking/${id}`, { status: "Approved" });
      setBooking((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "Approved" } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status", error);
    }
  };

  const handleReject = async (id: number) => {
    try {
      await apiClient.put(`/Booking/${id}`, { status: "Rejected" });
      setBooking((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "Rejected" } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status", error);
    }
  };
  const handlePending = async (id: number) => {
    try {
      await apiClient.put(`/Booking/${id}`, { status: "Pending" });
      setBooking((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "Pending" } : booking
        )
      );
    } catch (error) {
      console.error("Error updating booking status", error);
    }
  };
  useEffect(() => {
    fetchBookingData();
    fetchHotels();
    fetchRooms();
    fetchUsers();

  }, []);
  console.log('hotels ', hotels)



  return (
    <Box p={10}>
      <Text color={isDarkMode ? "gray.100" : "gray.600"} fontSize={"2xl"} mb={2}>
        Dashboard - Bookings
      </Text>
      <Box bg={isDarkMode ? "gray.800" : "white"} p={5}>
        <Flex justifyContent={"space-between"}>
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

          </Box>
        </Flex>
      </Box>

      <Box mt={4} bg={isDarkMode ? "gray.800" : "white"} p={10}>
        <Flex justify="end" mx={3}>
          <Box mb={3}>
            <Flex align="center">
              <Button rightIcon={<FiPlus />} colorScheme="blue" onClick={onOpen}>
                Add
              </Button>

              <Form
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={(data) => {
                  const selectedHotel: any = hotels.find(
                    (hotel) => hotel.name === data.hotelName
                  );
                  const selectedRoom: any = rooms.find(
                    (room) => room.type = data.roomName
                  );

                  if (selectedHotel || selectedRoom) {
                    const newBooking: Booking = {
                      id: booking.length + 1,
                      checkIn: data.checkInDate,
                      checkOut: data.checkOutDate,
                      hotelId: selectedHotel.id,
                      hotelName: selectedHotel.name,
                      paymentMethod: data.paymentMethod,
                      transactionId: 0,
                      roomId: selectedRoom.id,
                      roomName: selectedRoom.type,
                    };
                    console.log('booking data', newBooking);
                    addBooking(newBooking);
                  } else {
                    console.log('error in selected hotels and rooms');
                  }
                } }
                hotel={hotels}
                room={rooms} />

              <Button variant="unstyled" bgColor="none" onClick={fetchBookingData}>
                <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
              </Button>
              <Icon mx={5} as={FiSettings} fontSize={"20px"} />
            </Flex>
          </Box>
        </Flex>

        {/* DataTable */}
        <DataTable
          booking={filteredBooking}
          handleApprove={handleApprove}
          handleReject={handleReject}
          handlePending={handlePending}
        />

      </Box>
    </Box>
  );
};
