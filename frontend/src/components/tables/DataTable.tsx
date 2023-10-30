import { Table, Thead, Tr, Th, Tbody, Td, Flex, Text, Checkbox } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { ProductSale } from "../../interfaces";
import moment from "moment";
import apiClient from "../../services/api-client";

export const DataTable = () => {
    const [sale, setSales] = useState<ProductSale[]>([]);
    const [error, setError] = useState('');

    const fetchSales = async () => {
        const response = await apiClient.get<ProductSale[]>(`/sales`);
        const data = response.data;
        console.log("sales data", data)
        setSales(data);
        // make error handling more robust
        if (response.status === 401) {
            setError('401')
        }
    }

    useEffect(() => {
        fetchSales()
        console.log("sales data", sale)
    }, [])
    return (
        <Table variant="simple">
            <Thead>
                <Tr>
                    <Th>
                        <Checkbox></Checkbox>
                    </Th>
                    <Th>Product Name</Th>
                    <Th>Sales Date</Th>
                    <Th>Quantity</Th>
                    <Th>Selling Price</Th>
                    <Th>Total Amount</Th>
                    <Th>Customer</Th>
                </Tr>
            </Thead>
            {error === '401' ? (
                <Text>You are unauthorized, please Logout to Login Again</Text>
            ) : (
                <Tbody textAlign="center">
                    {
                        sale.map((item) => (
                            <Tr key={item.product_id}>
                                <Td>
                                    <Checkbox></Checkbox>
                                </Td>
                                <Td>
                                    <Flex align="center">
                                        <Text fontWeight="medium" ml={2}>
                                            {item.product_name}
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Flex align="center">
                                        <Text fontWeight="medium" ml={2}>
                                            {moment(item.sale_date).format('YYYY-MM-DD / hh:mm')}
                                        </Text>
                                    </Flex>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.quantity}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.selling_price}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text fontWeight="light" ml={2}>
                                        {item.total_amount}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text textAlign="center" fontWeight="light" ml={2}>
                                        {item.customer}
                                    </Text>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            )}

        </Table>
    )
}
