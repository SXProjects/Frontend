import { Fragment, useEffect, useState } from 'react';
import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  Input,
  Button,
  Text,
  Flex,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import axios from 'axios';
import { newEspDomain } from '../../../../../config/config';

export function AddDevice() {
  const [show, setShow] = useState(false);
  const [ipAdress, setIpAdress] = useState('');
  const [port, setPort] = useState('');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (ipAdress === '' || password === '' || port === '' || ssid === '') {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  });

  function handleShowClick() {
    setShow(!show);
  }

  function handleConnectButtonCLick() {
    axios
      .post(`${newEspDomain}/`, {
        command_name: 'pair',
        ssid: ssid,
        password: password,
        ip: ipAdress,
        port: port,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  return (
    <Fragment>
      <ModalBody>
        <ModalOverlay />
        <ModalContent mt="20vh">
          <ModalHeader>Добавить устройство</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" align="center">
              <Flex flexDirection="row" align="center" justifyContent="center">
                <Flex flexDirection="column" flex={4}>
                  <Text textAlign="center" fontSize="1vw" fontWeight="bold">
                    IP-адрес хоста
                  </Text>
                  <Input
                    placeholder="Адрес"
                    mt="2vh"
                    _placeholder={{ color: 'black' }}
                    borderColor="black"
                    fontSize={15}
                    variant="flushed"
                  />
                </Flex>

                <Flex flexDirection="column" flex={1}>
                  <Text textAlign="center" fontSize="1vw" fontWeight="bold">
                    Порт
                  </Text>
                  <Input
                    placeholder="Порт"
                    mt="2vh"
                    _placeholder={{ color: 'black' }}
                    borderColor="black"
                    fontSize={15}
                  />
                </Flex>
              </Flex>
              <Text
                fontSize="1.2vw"
                fontWeight="bold"
                textAlign="center"
                mt="3vh"
              >
                SSID хоста
              </Text>
              <Input
                placeholder="SSID"
                mt="2vh"
                _placeholder={{ color: 'black' }}
                borderColor="black"
                fontSize={15}
                variant="flushed"
              />
              <Text
                fontSize="1.2vw"
                fontWeight="bold"
                textAlign="center"
                mt="3vh"
              >
                Пароль SSID
              </Text>
              <InputGroup>
                <Input
                  placeholder="Пароль"
                  _placeholder={{ color: 'black' }}
                  borderColor="black"
                  fontSize={15}
                  size="sm"
                  type={show ? 'text' : 'password'}
                  variant="flushed"
                  mt="2vh"
                />

                <InputRightElement w="auto">
                  <Button
                    fontSize={12}
                    h="1.75rem"
                    size="sm"
                    onClick={handleShowClick}
                    mt="2vh"
                    backgroundColor="#56999f"
                    _hover={{ backgroundColor: '#56999f' }}
                    _active={{ backgroundColor: '#508489' }}
                  >
                    {show ? 'Скрыть' : 'Показать'}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button
                w="8vw"
                h="5vh"
                mt="2vh"
                fontSize="1vw"
                backgroundColor="#56999f"
                _hover={{ backgroundColor: '#56999f' }}
                _active={{ backgroundColor: '#508489' }}
                disabled={isDisabled}
                onClick={handleConnectButtonCLick}
              >
                Подключить
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalBody>
    </Fragment>
  );
}
