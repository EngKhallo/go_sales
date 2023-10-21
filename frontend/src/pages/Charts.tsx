import { Doughnut, Line, Pie, PolarArea } from 'react-chartjs-2';
import 'chart.js/auto';
import { Box, SimpleGrid, useColorMode } from '@chakra-ui/react';
import { BarGraph } from '../components/Graphs/BarGraph';

interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

interface ChartDataset {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
}

export const Charts: React.FC = () => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';

    const chartData: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales',
                data: [120, 180, 150, 200, 250, 300],
                backgroundColor: isDarkMode ? 'rgba(255, 99, 132, 0.5)' : 'rgba(54, 162, 235, 0.5)',
                borderColor: isDarkMode ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box p={4} bg={isDarkMode ? 'gray.800' : 'gray.200'}>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
                <BarGraph isDarkMode={isDarkMode} chartData={chartData} />
                <Box bg={isDarkMode ? 'gray.700' : 'white'} p={4}>
                    <Pie data={chartData} />
                </Box>
                <Box bg={isDarkMode ? 'gray.700' : 'white'} p={4}>
                    <PolarArea data={chartData} />
                </Box>
                <Box bg={isDarkMode ? 'gray.700' : 'white'} p={4}>
                    <Doughnut data={chartData} />
                </Box>
                <Box bg={isDarkMode ? 'gray.700' : 'white'} p={4}>
                    <Line data={chartData} />
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default Charts;
