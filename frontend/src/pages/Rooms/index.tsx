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
import { Hotel, Room, RoomData } from "../../interfaces";
import axios from "axios";
import { DataTable } from "./table";
import { Form } from "./form";
import apiClient from "../../services/api-client";

const Rooms = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const { onOpen, isOpen, onClose } = useDisclosure();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RoomData>(
          `http://localhost:5052/api/v1/Room/`
        );
        const data = response.data;
        setRooms(data?.data);

        const hotelResponse = await axios.get<Hotel[]>(
          `http://localhost:5052/api/v1/Hotel/`
        );
        const hotelData = hotelResponse.data;
        setHotels(hotelData);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchData();
  }, []);

  const addRoom = async (newRoom: Room) => {
    try {
      const response = await apiClient.post<Room>(
        `/Room/`,
        newRoom
      );
      const addedRoom = response.data;
      setRooms((prevRooms) => [...prevRooms, addedRoom]);
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  const refreshTable = async () => {
    const response = await apiClient.get<RoomData>(`/Room/`);
    const data = response.data;
    console.log('data', data)
    setRooms(data.data)
    console.log('rooms ', rooms)
  }

  return (
    <Box p={10}>
      <Text color={isDarkMode ? "gray.100" : "gray.600"} fontSize={"2xl"} mb={2}>
        Dashboard - Rooms
      </Text>
      <Box bg={isDarkMode ? "gray.800" : "white"} p={5}>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Input placeholder="Filter data" w={"400px"} />
          </Box>
          <Box>
            <Button mx={3} colorScheme="blue">
              Query
            </Button>
            <Button colorScheme="red">Reset</Button>
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
                onSubmit={(formData) => {
                  const selectedHotel: any = hotels.find(
                    (hotel) => hotel.id === parseInt(formData.hotelName)
                  );
                  if (selectedHotel) {
                    const newRoom: Room = {
                      ...formData,
                      id: rooms.length + 1,
                      hotelId: selectedHotel.id,
                      hotelName: selectedHotel.name,
                      roomNumber: formData.roomNumber,
                      floorNumber: formData.floorNumber,
                      maximumOccupancy: formData.maximumOccupancy,
                      bedConfiguration: formData.bedConfiguration,
                    };
                    addRoom(newRoom);
                    console.log('new room', newRoom);
                  }
                }}
                hotel={hotels}
              />

              <Button variant="unstyled" bgColor="none" onClick={() => refreshTable()}>
                <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
              </Button>
              <Icon mx={5} as={FiSettings} fontSize={"20px"} />
            </Flex>
          </Box>
        </Flex>

        {/* User Table */}
        <DataTable room={rooms} />
      </Box>
    </Box>
  );
};

export default Rooms;
