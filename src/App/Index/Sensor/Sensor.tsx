import { Box, Flex, Text, Square, Circle, Center } from '@chakra-ui/react';
import { useState, useEffect, FunctionComponent } from 'react';
import React from 'react';
import axios from 'axios';
import { domain } from '../../../config/config';
import { useAppSelector } from '../../../redux/hooks';

export function Sensor() {
  const [sensors, setSensors] = useState([] as any[]);
  const currentRoom = useAppSelector((state) => state.room);

  useEffect(() => {
    axios
      .get(`${domain}/parameters/get`)
      .then((response) => {
        console.log(currentRoom.active);
        setSensors(response.data as any[]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  function translateName(dataType: string) {
    if (dataType === 'temperature') {
      return 'Температура';
    }

    if (dataType === 'humidity') {
      return 'Влажность';
    }

    if (dataType === 'gas') {
      return 'Газ';
    }

    if (dataType === 'distance') {
      return 'Расстояние';
    }
  }

  return (
    <Center>
      <Flex flexDirection="row" justifyContent="center" mt="25vh">
        {sensors.map((sensor, index) => (
          <Flex
            flexDirection="column"
            textAlign="center"
            justifyContent="center"
            key={index}
          >
            {sensor.room === currentRoom.active && (
              <Square
                size="auto"
                p="3vw"
                bg="green"
                backgroundColor="#56999f"
                m="1.5vh"
              >
                <Box
                  flex-direction="column"
                  fontWeight="Light"
                  fontSize="2.5vw"
                  textAlign="center"
                >
                  <Text fontWeight="Bold" fontSize="2.2vh">
                    {translateName(sensor.data_type)}
                  </Text>
                  <Flex
                    flexDirection="column"
                    align="center"
                    textAlign="center"
                  >
                    <Text
                      fontSize="4.5vh"
                      textAlign="center"
                      fontWeight="light"
                    >
                      {sensor.data_type === 'temperature'
                        ? sensor.data + '°С'
                        : sensor.data}
                    </Text>

                    {sensor.data_type === 'smoke' && (
                      <Circle
                        size="30"
                        style={{
                          backgroundColor: (sensor.data as boolean)
                            ? 'green'
                            : 'red',
                        }}
                      />
                    )}
                  </Flex>
                </Box>
              </Square>
            )}
          </Flex>
        ))}
      </Flex>
    </Center>
  );
}
