import {Box, Flex, Text, Square, Circle} from '@chakra-ui/react';
import {useState,useEffect} from "react";

export function Sensor(){
  const [sensors,setSensors] = useState([
    {"sensor_name": "light sensor",
      "sensor_type": "Lumen",
      "sensor_data": "800",
      "sensor_state": true
    },
    {"sensor_name": "Temperature sensor",
      "sensor_type": "Temperature",
      "sensor_data": "39 °C",
      "sensor_state": false
    },
    {"sensor_name": "Smoke detector",
      "sensor_type": "Smoke",
      "sensor_data": false,
      "sensor_state": false
    },
    {"sensor_name": "Humility sensor",
      "sensor_type": "Humility",
      "sensor_data": "40%",
      "sensor_state": true

    }
  ]);

  useEffect(() => {
  }, []);

  return(<Box className="sensor-container"
              fontFamily="sans-serif">
    <Flex ml="3vw"
          flexDirection="row"
          justifyContent="center"
          mt ='5vw'
    >
      {sensors.map((sensors,index) =>

        <Square size='350'
                bg='green'
                backgroundColor="#56999f"
                m ='1.5vw'
                display={{ md: "flex" }}
                flexDirection="column"

        >

          <Text  fontWeight="Bold"
                 fontSize="1.8vw"
                 ml='1vw' >
            {sensors.sensor_type}
          </Text>
          <Box display="flex"
               flex-direction="column"
               fontWeight="Light"
               fontSize="2.5vw"
               ml='1.6vw'
          >
            {typeof(sensors.sensor_data) == "string"
              ?sensors.sensor_data
              :sensors.sensor_data?
                "Дым+"
                :"Дым-"}
            <Circle
              size='30'
              mt="0.85vw"
              ml="1vw"
              style={{backgroundColor: sensors.sensor_state
                  ?"green"
                  :"red" }}
            />
            <Text>
              {sensors.sensor_state}
            </Text>
          </Box>
        </Square>
      )}
    </Flex>
  </Box>)
}