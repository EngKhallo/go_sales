import {
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Flex,
    Text,
    Checkbox,
    TableContainer,
    Spinner,
    Box,
  } from "@chakra-ui/react";
  import { Hotel } from "../../../interfaces";
  
  interface Props {
    hotel: Hotel[];
    error: string;
    loading: boolean;
    filterValue: string;
  }
  
  export const DataTable: React.FC<Props> = ({
    hotel,
    error,
    loading,
    filterValue,
  }) => {
    const filteredHotel = hotel.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  
    return (
      <TableContainer maxW="100%" overflowX="scroll">
        <Table id="table-to-export" variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox></Checkbox>
              </Th>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Location</Th>
              <Th>Number</Th>
              <Th>Commission Rate</Th>
              <Th>Email</Th>
              {/* <Th>Actions</Th> */}
            </Tr>
          </Thead>
          <Tbody textAlign="center">
            {loading ? (
              <Box textAlign="center">
                <Spinner size="xl" color="blue" thickness="5px" />
              </Box>
            ) : error ? (
              <Tr>
                <Td colSpan={8} textAlign="center">
                  {error}
                </Td>
              </Tr>
            ) : (
              filteredHotel.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <Checkbox></Checkbox>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <Text fontWeight="medium" ml={2}>
                        {item.name}
                      </Text>
                    </Flex>
                  </Td>
                  <Td>
                    <Text fontWeight="light" ml={2}>
                      {item.address}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontWeight="light" ml={2}>
                      {item.location}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontWeight="light" ml={2}>
                      {item.phoneNumber}
                    </Text>
                  </Td>
                  <Td>
                    <Text textAlign="center" fontWeight="light" ml={2}>
                      {item.commissionRate}
                    </Text>
                  </Td>
                  <Td>
                    <Text fontWeight="light" ml={2}>
                      {item.email}
                    </Text>
                  </Td>
                  {/* <Td>
                      <Flex justifyContent="space-around">
                          <Button variant="unstyled" bgColor="none"
                              onClick={() => {
                                  console.log(item)
                              }}>
                              <Icon color="orange" as={FiEdit2} />
                          </Button>
                      </Flex>
                  </Td> */}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };