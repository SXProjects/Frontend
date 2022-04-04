import {
  Center,
  Box,
  Image,
  Text,
  Badge,
  Flex,
  Button,
  Modal,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  MenuList,
  Menu,
  MenuButton,
  Avatar,
} from '@chakra-ui/react';
import { useAppSelector } from '../../../../redux/hooks';
import { MdBuild } from 'react-icons/md';
import { domain } from '../../../../config/config';
import { ChangeWindow } from './ChangeWindow/ChangeWindow';
import { Fragment, useState } from 'react';

export function Profile() {
  const user = useAppSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        minW={0}
        ml="5vw"
      >
        <Avatar size="lg" src={`${domain}/${user.id}.png`} />
      </MenuButton>
      <MenuList
        w="28vw"
        h="26vh"
        backgroundColor="rgba(160, 209, 214, 0.88)"
        borderRadius={15}
      >
        <Flex flexDirection="column" align="center">
          <Flex flexDirection="row" align="center">
            <Avatar src={`${domain}/${user.id}.png`} size="xl" mt="3vh" />
            <Flex flexDirection="column" ml="2vw" align="center" mt="2vh">
              <Flex flexDirection="row" align="center">
                <Text fontSize="1.8vw" fontWeight="bold">
                  {user.name}
                </Text>
                <Badge colorScheme="pink" ml="1vw" fontSize="0.9vw">
                  {user.permission}
                </Badge>
              </Flex>
              <Flex flexDirection="row" align="center" mt="1.1vh">
                <Button fontSize="0.8vw" fontWeight="bold">
                  Добавить пользователя
                </Button>
                <Button
                  leftIcon={<MdBuild />}
                  colorScheme="pink"
                  w="0.5vw"
                  ml="0.2vw"
                  onClick={onOpen}
                />
              </Flex>
            </Flex>
          </Flex>
          <Text fontSize="1.8vw" mt="1.1vh">
            Жильцы
          </Text>
        </Flex>
      </MenuList>

      <Flex align="flex-start">
        <Box w="36vw" h="60vh"></Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ChangeWindow />
        </Modal>
      </Flex>
    </Menu>
  );
}
