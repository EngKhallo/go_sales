import { Avatar, Divider, Flex, Heading, IconButton } from "@chakra-ui/react"
import { Dispatch, SetStateAction} from "react";
import { FiHome, FiMenu, FiUser, FiBook, FiShoppingBag } from "react-icons/fi";
import { NavItem } from "./NavItem";
import { Link } from "react-router-dom";
import { FaList} from "react-icons/fa";

interface Props {
    navSize: any;
    setNavSize: Dispatch<SetStateAction<string>>;
}

export const Sidebar = ({ setNavSize, navSize }: Props) => {
    // q: can you read the logged in user role from local storage?

//   const [user, setUser] = useState<string>("");

//     useEffect(() => {
//         const user = localStorage.getItem("userName");
//         // 
//         const defaultRole = user || "";

//         setUser(defaultRole);
//     }, []);

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
                <Link to={"/inventories"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Inventories'} icon={FaList} active={false} />
                </Link>
                <Link to={"/sales"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Sales'} icon={FiShoppingBag} active={false} />
                </Link>
                <Link to={"/reports"} style={{ width: '100%' }}>
                    <NavItem navSize={navSize} title={'Reports'} icon={FiBook} active={false} />
                </Link>

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
                        <Heading as="h3" size="md">Welcome </Heading>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}
