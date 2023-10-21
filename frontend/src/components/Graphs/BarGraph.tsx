import { Box } from "@chakra-ui/react"
import { Bar } from "react-chartjs-2"
import { ChartData } from "../../interfaces";

interface Props{
    isDarkMode: boolean;
    chartData: ChartData;
}

export const BarGraph = ({isDarkMode, chartData}: Props) => {
    return (
        <Box bg={isDarkMode ? 'gray.700' : 'white'} p={4}>
            <Bar data={chartData} />
        </Box>
    )
}
