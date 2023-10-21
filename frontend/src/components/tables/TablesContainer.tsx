import { TableContainer, useColorMode } from "@chakra-ui/react"
import { DataTable } from "./DataTable"
const tablesContainer = () => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    return (
        <TableContainer bg={isDarkMode ? '' : 'white'} mt={3} borderRadius="5px">
            <DataTable />
        </TableContainer>
    )
}

export default tablesContainer