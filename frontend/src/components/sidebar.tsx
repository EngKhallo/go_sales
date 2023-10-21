import { Avatar, Divider, Flex, Heading, IconButton, Text } from "@chakra-ui/react"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiHome, FiMenu, FiUser, FiBarChart, FiSettings, FiBook, FiGrid } from "react-icons/fi";
import { NavItem } from "./NavItem";
import { Link } from "react-router-dom";
import { FaHotel } from "react-icons/fa";

interface Props {
    navSize: any;
    setNavSize: Dispatch<SetStateAction<string>>;
}

export const Sidebar = ({ setNavSize, navSize }: Props) => {
  const [userRole, setUserRole] = useState<string>("");

    useEffect(() => {
        // Read the user role from local storage
        const role = localStorage.getItem("role");
        const defaultRole = role || ""; // Use an empty string as the default value if role is null

        setUserRole(defaultRole);
    }, []);

    const handleClick = () => {
        if (navSize === "small") {
            setNavSize("large");
        } else {
            setNavSize("small");
        }
    };
    return (
        <Flex
            pos="sticky"
            left="5"
            h="100vh"
            flexDir="column"
            justifyContent="space-between"
        >

            <Flex
                px='10px'
                flexDir="column"
                alignItems={navSize == "small" ? "center" : 'flex-start'}
            >
                <IconButton
                    background="none"
                    icon={<FiMenu />}
                    onClick={() => handleClick()}
                    aria-label={""} />

                <Link to="/" style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Dashboard'} icon={FiHome} active={false} />
                </Link>
                <Link to={"/hotels"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Hotels'} icon={FaHotel} active={false} />
                </Link>
                <Link to={"/rooms"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Rooms'} icon={FiGrid} active={false} />
                </Link>
                <Link to={"/bookings"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Bookings'} icon={FiBook} active={false} />
                </Link>
                <Link to={"/charts"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Graphs'} icon={FiBarChart} active={false} />
                </Link>
                <Link to={"/reports"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Reports'} icon={FiBook} active={false} />
                </Link>
                <NavItem navSize={navSize} title={'Settings'} icon={FiSettings} active={false} />
                <Link to={"/users"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Users'} icon={FiUser} active={false} />
                </Link>
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : 'flex-start'}
                mb="4"
            >
                <Divider color="current" display={navSize == "small" ? "none" : 'flex'} />
                <Flex mt="4" align="center">
                    <Avatar src="avatar.jpeg" size="sm" />
                    <Flex ml="4" flexDir="column" display={navSize == "small" ? "none" : 'flex'}>
                        <Heading as="h3" size="md">Eng.Khalid</Heading>
                        <Text color="gray" fontWeight="normal">{userRole}</Text>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}
