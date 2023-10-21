import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Icon,
  useColorMode,
  Box,
  Input,
  Text,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import { CanceledError } from "axios";
import { DataTable } from "./Table";
import hotelService from "../../../services/hotel-service";
import { Hotel } from "../../../interfaces";

export const HotelsReport = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  const [hotel, setHotel] = useState<Hotel[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const fetchData = () => {
    setLoading(true);
    const { request, cancel } = hotelService.getAllHotels(filterValue);
    request
      .then((res) => {
        const data = res.data;
        setHotel(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        console.log(err.message);
        setLoading(false);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchData();
  }, [filterValue]);

  return (
    <Box p={10}>
      <Text color={isDarkMode ? "gray.100" : "gray.600"} fontSize={"2xl"} mb={2}>
        Dashboard - Hotels
      </Text>
      <Box bg={isDarkMode ? "gray.800" : "white"} p={5}>
        <Flex justifyContent={"space-between"}>
          <Box>
            <Input
              placeholder="Filter data"
              w={"400px"}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
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
              <Button variant="unstyled" bgColor="none" onClick={() => {}}>
                <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
              </Button>
              <Button mx={3} colorScheme="blue">
                Export as Pdf
              </Button>
              <Button colorScheme="green">Export as Excel</Button>
            </Flex>
          </Box>
        </Flex>

        {/* User Table */}
        <DataTable loading={loading} error={error} hotel={hotel} filterValue={filterValue} />
      </Box>
    </Box>
  );
};