import {
  Button, Flex, Icon,
  useColorMode, Box,Input
} from "@chakra-ui/react"
import TablesContainer from "../components/tables/TablesContainer"
import { FiPlus, FiRefreshCw, FiSettings } from "react-icons/fi";

const FormTable = () => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  return (
    <Box p={10}>
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
          <Box>
            <Flex align="center">
              <Button rightIcon={<FiPlus />} colorScheme='blue'>
                Add
              </Button>
              <Icon mx={5} as={FiRefreshCw} fontSize={"20px"} />
              <Icon mx={5} as={FiSettings} fontSize={"20px"} />
            </Flex>
          </Box>
        </Flex>
        <TablesContainer />
      </Box>
    </Box>
  )
}

export default FormTable