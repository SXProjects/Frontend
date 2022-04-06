import {
  Text,
  Badge,
  Flex,
  Button,
  Modal,
  useDisclosure,
  MenuList,
  Menu,
  MenuButton,
  Avatar,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../../redux/hooks';
import { MdBuild } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { domain } from '../../../../config/config';
import { ChangeWindow } from './ChangeWindow/ChangeWindow';
import { NewUserWindow } from './NewUserWindow/NewUserWindow';
import axios from 'axios';

export function Profile() {
  const user = useAppSelector((state) => state.user);
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();
  const {
    isOpen: isOpenUserCreate,
    onOpen: onOpenUserCreate,
    onClose: onCloseUserCreate,
  } = useDisclosure();

  function handleLogoutButtonClick() {
    axios
      .delete(`${domain}/user/logout`, { withCredentials: true })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        minW={0}
      >
        <Avatar size="lg" src={`${domain}/${user.id}.png`} />
      </MenuButton>
      <MenuList
        w="28vw"
        h="19vh"
        backgroundColor="rgba(160, 209, 214, 0.88)"
        borderRadius={15}
      >
        <Flex flexDirection="column" align="center">
          <Flex flexDirection="row" align="center">
            <Flex align="center" justifyContent="center">
              <Avatar src={`${domain}/${user.id}.png`} size="xl" mt="3vh" />
            </Flex>
            <Flex flexDirection="column" ml="2vw" align="center" mt="2vh">
              <Flex flexDirection="row" align="center">
                <Text fontSize="1.8vw" fontWeight="bold">
                  {user.name}
                </Text>
                <Badge colorScheme="pink" ml="1vw" fontSize="0.8vw">
                  {user.permission}
                </Badge>
              </Flex>
              <Flex flexDirection="row" align="center" mt="1.1vh">
                {user.permission === 'ADMIN' && (
                  <Button fontSize="0.8vw" onClick={onOpenUserCreate}>
                    Добавить пользователя
                  </Button>
                )}
                <Button
                  leftIcon={<MdBuild />}
                  colorScheme="pink"
                  w="0.5vw"
                  ml="0.2vw"
                  onClick={onOpenSettings}
                />
                <Button
                  leftIcon={<FiLogOut />}
                  colorScheme="blue"
                  w="0.5vw"
                  ml="0.2vw"
                  onClick={handleLogoutButtonClick}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </MenuList>

      <Flex align="flex-start">
        <Modal isOpen={isOpenSettings} onClose={onCloseSettings}>
          <ChangeWindow />
        </Modal>
        <Modal isOpen={isOpenUserCreate} onClose={onCloseUserCreate}>
          <NewUserWindow />
        </Modal>
      </Flex>
    </Menu>
  );
}
