import { Flex, Icon, Menu, MenuButton, Text, Link, IconProps } from "@chakra-ui/react";

interface Props {
    navSize: string;
    title: string;
    icon: React.ComponentType<IconProps>;
    active: boolean;
}

export const NavItem = ({ navSize, title, icon, active }: Props) => {
    return (
        <Flex
            mt={"10px"}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    borderRadius={4}
                    p="6px"
                    bg={active ? "blue.400" : ""}
                    width={"100%"}
                    _hover={{ textDecor: "none", backgroundColor: "blue.400", color: "white" }}
                    w={navSize == "large" ? "100%" : ""}
                >
                    <MenuButton>
                        <Flex align="center">
                            <Icon as={icon} fontSize="lg" />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>
                                {title}
                            </Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    );
};
