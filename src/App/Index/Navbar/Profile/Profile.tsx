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
import { Fragment } from 'react';
import { AddDevice } from './AddDevice/AddDevice';

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
  const {
    isOpen: isOpenAddDevice,
    onOpen: onOpenAddDevice,
    onClose: onCloseAddDevice,
  } = useDisclosure();

  function handleLogoutButtonClick() {
    axios
      .post(`${domain}/user/logout`, { id: user.id })
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
        <Avatar size="lg" />
      </MenuButton>
      <MenuList
        w="auto"
        h="auto"
        p="1.5vw"
        backgroundColor="rgba(160, 209, 214, 0.88)"
        borderRadius={15}
      >
        <Flex flexDirection="column" align="center">
          <Flex flexDirection="row" align="center">
            <Flex flexDirection="column" ml="1vw" align="center">
              <Flex flexDirection="row" align="center">
                <Text fontSize="2.1vw" fontWeight="bold">
                  {user.name}
                </Text>
                <Badge colorScheme="pink" ml="1vw" fontSize="1vw">
                  {user.permission}
                </Badge>
              </Flex>
              <Flex flexDirection="row" align="center" mt="1.1vh">
                <Flex flexDirection="column">
                  {user.permission === 'ADMIN' && (
                    <Fragment>
                      <Button fontSize="0.8vw" onClick={onOpenUserCreate}>
                        Добавить пользователя
                      </Button>
                      <Button
                        fontSize="0.8vw"
                        mt="1vh"
                        onClick={onOpenAddDevice}
                      >
                        Добавить устройство
                      </Button>
                    </Fragment>
                  )}
                </Flex>

                <Button
                  leftIcon={<MdBuild />}
                  colorScheme="pink"
                  w="0.5vw"
                  ml="0.5vw"
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
        <Modal isOpen={isOpenAddDevice} onClose={onCloseAddDevice}>
          <AddDevice />
        </Modal>
      </Flex>
    </Menu>
  );
}
