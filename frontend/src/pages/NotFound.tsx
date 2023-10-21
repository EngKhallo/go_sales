import { Box, Heading, Image, Center } from "@chakra-ui/react"

const NotFound = () => {
    return (
        <Box textAlign="center" mt="20">
            <Box alignItems={"center"} justifyItems="center">
                <Center>
                    <Image h="50vh" src="404.svg" />
                </Center>
            </Box>
            <Heading color="blue" as="h1" size="2xl">
                Only Admin is Allowed
            </Heading>
        </Box>
    )
}

export default NotFound