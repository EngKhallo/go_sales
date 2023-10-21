import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    Icon,
    Flex,
    Text,
    Divider
} from "@chakra-ui/react"
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi"
import { Link } from "react-router-dom"

export const UserPopover = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button bg="transparent">
                    <Icon as={FiUser} />
                </Button>
            </PopoverTrigger>
            <PopoverContent w={"150px"}>
                <PopoverArrow />
                <PopoverBody>
                    <Flex flexDir="column">
                        <Flex mb={2} align="center">
                            <Icon mr="10px" as={FiUser} />
                            <Text fontWeight="normal" fontSize={"sm"}>Account</Text>
                        </Flex>
                        <Flex mb={2} align="center">
                            <Icon mr="10px" as={FiSettings} />
                            <Text fontWeight="normal" fontSize={"sm"}>Settings</Text>
                        </Flex>
                        <Divider />
                        <Flex align="center">
                            <Icon mr="10px" as={FiLogOut} />
                            <Link to='/login'><Text fontWeight="normal" fontSize={"sm"}>Logout</Text></Link>
                            
                        </Flex>
                    </Flex>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}
