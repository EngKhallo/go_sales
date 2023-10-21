import { Box, Flex, Icon, Text, Center, IconProps, useColorMode } from "@chakra-ui/react"

interface Props {
    title: string;
    follow: string;
    bgColor: string;
    icon: React.ComponentType<IconProps>;
}

const HomeCards = ({ title, follow, icon, bgColor }: Props) => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === 'dark';
    return (
        <Box borderRadius="3px" boxShadow="xs" bg={isDarkMode ? '' : 'gray.300'}>
            <Flex flexDir="row">
                <Center>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="50px"
                        height="50px"
                        borderRadius="50%"
                        bg={bgColor}
                        p={3}
                        m={3}
                    >
                        <Icon fontSize="2xl" fontWeight="bold" as={icon} />
                    </Box>
                    <Flex ml={3} flexDir="column">
                        <Text fontWeight="bold" color={"blue.700"} fontSize="md">
                            {title}
                        </Text>
                        <Text fontWeight="bold">{follow}</Text>
                    </Flex>
                </Center>
            </Flex>
        </Box>
    )
}

export default HomeCards