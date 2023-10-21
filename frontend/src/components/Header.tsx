import { Flex, HStack, Image, Switch, useColorMode } from "@chakra-ui/react"
import { UserPopover } from "./UserPopover"

export const Header = () => {
  const {toggleColorMode, colorMode} = useColorMode();
  return (
    <HStack boxShadow={'0 4px 12px 0 rgba(0,0,0,0.05)'} padding="5px" justifyContent={"space-between"}>
      <Image src={'logo.webp'} boxSize='50px' />
      <Flex justifyContent={"space-between"} align="center">
        <Switch pr={3} isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
        <UserPopover  />
      </Flex>
    </HStack>
  )
}
