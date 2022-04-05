import { Fragment, useEffect, useState } from 'react';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  Flex,
  FormControl,
  Input,
  Button,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';
import { domain } from '../../../../../config/config';
import axios from 'axios';

export function NewUserWindow() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [permission, setPersmission] = useState('');
  const [show, setShow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (username === '' || password === '' || permission === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  });

  function handleShowClick() {
    setShow(!show);
  }

  function handleCreateUserButtonClick() {
    axios
      .post(
        `${domain}/user/register`,
        {
          name: username,
          password: password,
          permission: permission,
        },
        { withCredentials: true }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setIsError(true);
        setErrorMsg(error.response.data.error);
      });
  }

  return (
    <Fragment>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Добавить пользователя</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="2vh"
          >
            <Select
              placeholder="Доступ"
              onChange={(e) => setPersmission(e.target.value)}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
            </Select>

            <FormControl isInvalid={isError} mt="2vh">
              <Text fontSize="1.4vw" fontWeight="bold">
                Имя
              </Text>
              <Input
                placeholder="Имя"
                variant="flushed"
                borderColor="black"
                onChange={(e) => setUsername(e.target.value)}
                mt="2vh"
              />
              <Text fontSize="1.4vw" fontWeight="bold" mt="3vh" mb="-3vh">
                Пароль
              </Text>

              <InputGroup size="md">
                <Input
                  placeholder="Пароль"
                  borderColor="black"
                  fontSize={15}
                  size="sm"
                  type={show ? 'text' : 'password'}
                  variant="flushed"
                  mt="6vh"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <InputRightElement w="auto">
                  <Button
                    size="sm"
                    onClick={handleShowClick}
                    mt="10vh"
                    backgroundColor="#56999f"
                    _hover={{ backgroundColor: '#56999f' }}
                    _active={{ backgroundColor: '#508489' }}
                  >
                    {show ? 'Скрыть' : 'Показать'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errorMsg && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
            </FormControl>
            <Button
              mt="4vh"
              w="6vw"
              h="6vh"
              fontSize="1vw"
              backgroundColor="#56999f"
              _hover={{ backgroundColor: '#56999f' }}
              _active={{ backgroundColor: '#508489' }}
              onClick={handleCreateUserButtonClick}
              disabled={isDisabled}
            >
              Создать
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Fragment>
  );
}
