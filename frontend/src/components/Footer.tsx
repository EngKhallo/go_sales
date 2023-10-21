import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Box py={3}>
            <Flex direction="column" align="center" justify="center">
                <Text fontSize="sm">
                    © 2023 Eng.Khalid Abdi Guleid. All rights reserved.
                </Text>
                <Link href="#" fontSize="sm">
                    Privacy Policy
                </Link>
            </Flex>
        </Box>
    );
};

export default Footer;
