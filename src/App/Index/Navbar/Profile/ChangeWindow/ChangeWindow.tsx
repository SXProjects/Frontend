import {
  Center,
  Box,
  Image,
  Text,
  Badge,
  Flex,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  Input,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ChangeEvent, Fragment } from 'react';
import { useState } from 'react';
import { domain } from '../../../../../config/config';

import axios from 'axios';

export function ChangeWindow() {
  const [newName, setNewName] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorUsernameMsg, setErrorUsernameMsg] = useState('');
  const [errorPasswordMsg, setErrorPasswordMsg] = useState('');
  const [photo, setPhoto] = useState<File>();
  const [isPhotoLoaded, setIsPhotoLoaded] = useState(true);

  function handleChangeNameButtonClick() {
    axios
      .post(
        `${domain}/user/change/username`,
        { newUsername: newName },
        { withCredentials: true }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setIsError(true);
        setErrorUsernameMsg(error.response.data.error);
      });
  }

  function handleChangePasswordButtonClick() {
    axios
      .post(
        `${domain}/user/change/password`,
        { oldPassword: oldPassword, newPassword: newPassword },
        { withCredentials: true }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setIsError(true);
        setErrorPasswordMsg(error.response.data.error);
      });
  }

  function handleChangePhotoButtonClick() {
    const formData = new FormData();
    formData.append('userImage', photo!, photo!.name);
    axios
      .post(`${domain}/user/image/add`, formData, { withCredentials: true })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <Fragment>
      <ModalOverlay />
      <ModalContent mt="15vh">
        <ModalHeader>Изменение данных</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="center" flexDirection="column">
            <Text fontSize="1.4vw" fontWeight="bold">
              Имя
            </Text>
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              mt="2vh"
            >
              <FormControl isInvalid={isError}>
                <Input
                  placeholder="Новое имя"
                  variant="flushed"
                  borderColor="black"
                  onChange={(e) => setNewName(e.target.value)}
                  w="10vw"
                />

                <Button
                  ml="0.8vw"
                  w="5vw"
                  backgroundColor="#56999f"
                  _hover={{ backgroundColor: '#56999f' }}
                  _active={{ backgroundColor: '#508489' }}
                  onClick={handleChangeNameButtonClick}
                >
                  Сменить
                </Button>
                {errorUsernameMsg && (
                  <FormErrorMessage>{errorUsernameMsg}</FormErrorMessage>
                )}
              </FormControl>
            </Flex>
            <Text fontSize="1.4vw" fontWeight="bold" mt="5vh">
              Пароль
            </Text>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              mt="2vh"
              w="16vw"
            >
              <FormControl isInvalid={isError}>
                <Input
                  placeholder="Старый пароль"
                  variant="flushed"
                  borderColor="black"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  placeholder="Новый пароль"
                  variant="flushed"
                  borderColor="black"
                  mt="2vh"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  mt="3vh"
                  mb="3vh"
                  ml="5.5vw"
                  w="5vw"
                  backgroundColor="#56999f"
                  _hover={{ backgroundColor: '#56999f' }}
                  _active={{ backgroundColor: '#508489' }}
                  onClick={handleChangePasswordButtonClick}
                >
                  Сменить
                </Button>
                {errorPasswordMsg && (
                  <FormErrorMessage>{errorPasswordMsg}</FormErrorMessage>
                )}
              </FormControl>
            </Flex>
            <Text fontSize="1.4vw" fontWeight="bold" mt="2vh" mb="3vh">
              Фото
            </Text>
            <input
              type="file"
              name="Выбрать"
              onChange={(e) => {
                setPhoto(e.target.files![0]);
                setIsPhotoLoaded(false);
              }}
            />
            <Button
              mt="3vh"
              w="5vw"
              backgroundColor="#56999f"
              _hover={{ backgroundColor: '#56999f' }}
              _active={{ backgroundColor: '#508489' }}
              onClick={handleChangePhotoButtonClick}
              disabled={isPhotoLoaded}
            >
              Сменить
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Fragment>
  );
}
