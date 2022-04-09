import axios from 'axios';
import { useState } from 'react';
import { domain } from '../../config/config';
import {
  Center,
  Flex,
  Image,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import logoHome from '../pictures/smart-home.png';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/User/userSlice';

export function Login() {
  const [show, setShow] = useState(false);
  const [loginText, setLoginText] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  function handleShowClick() {
    setShow(!show);
  }

  function handleLoginClick() {
    axios
      .post(`${domain}/user/login`, { name: loginText, password: password })
      .then((response) => {
        setIsError(false);
        dispatch(
          login({
            loggedIn: true,
            name: response.data.name,
            id: response.data.id,
            permission: response.data.permission,
          })
        );
      })
      .catch((error) => {
        const errorJson = error.response.data;
        setErrorMsg(errorJson.error);
        setIsError(true);
      });
  }

  return (
    <Center mt={20}>
      <Flex align="center" flexDirection="column">
        <Image w="5.5rem" h="5.5rem" src={logoHome} />
        <Text
          fontFamily="sans-serif"
          fontSize="2.5vw"
          fontWeight="bold"
          w="20vw"
          textAlign="center"
        >
          Управление умным домом
        </Text>
        <Box
          backgroundColor="rgba(160, 209, 214, 0.88)"
          w="auto"
          h="auto"
          p="4vw"
          pl="6vw"
          pr="6vw"
          borderRadius={15}
        >
          <Flex align="center" flexDirection="column">
            <Text fontSize="1.7vw" fontWeight="600" w="100%">
              Добро пожаловать!
            </Text>
            <Text fontSize="0.9vw" mt={1} w="100%" textAlign="center">
              Пожалуйста, авторизуйтесь...
            </Text>
            <Box w="16vw">
              <FormControl isInvalid={isError}>
                <Input
                  fontSize={15}
                  placeholder="Логин"
                  _placeholder={{ color: 'black' }}
                  borderColor="black"
                  size="sm"
                  color="black"
                  variant="flushed"
                  mt={35}
                  onChange={(e) => setLoginText(e.target.value)}
                />
                <InputGroup size="md">
                  <Input
                    placeholder="Пароль"
                    _placeholder={{ color: 'black' }}
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
                      fontSize={12}
                      h="1.75rem"
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
            </Box>
            <Button
              mt="4vh"
              w="7vw"
              h="6vh"
              fontSize={26}
              backgroundColor="#56999f"
              _hover={{ backgroundColor: '#56999f' }}
              _active={{ backgroundColor: '#508489' }}
              onClick={handleLoginClick}
            >
              Войти
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Center>
  );
}
