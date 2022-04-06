import { Flex, Box, Button, useDisclosure, Image } from '@chakra-ui/react';
import homeLogo from '../../../pictures/smart-home.png';
import robotLogo from '../../../pictures/robot.png';
import { useDispatch } from 'react-redux';
import { setIndex, setRobot } from '../../../../redux/slices/Index/indexSlice';

export function Sidebar() {
  const dispatch = useDispatch();

  function handleHomeButtonClick() {
    dispatch(setIndex());
  }

  function handleRobotButtonClick() {
    dispatch(setRobot());
  }

  return (
    <Flex h="fit-content" alignItems="center" mt="2vh" borderRadius={20}>
      <Box
        backgroundColor="#9ECFD4"
        p="10px"
        pl="20px"
        pr="20px"
        borderRadius={15}
      >
        <Button
          borderRadius="full"
          size="lg"
          h="60px"
          w="60px"
          backgroundColor="#56999f"
          _hover={{ backgroundColor: '#56999f' }}
          _active={{ backgroundColor: '#508489' }}
          onClick={handleHomeButtonClick}
        >
          <Image src={homeLogo} w="40px" h="40px" position="absolute" />
        </Button>
        <Button
          borderRadius="full"
          size="lg"
          h="60px"
          w="60px"
          ml="2vw"
          backgroundColor="#56999f"
          _hover={{ backgroundColor: '#56999f' }}
          _active={{ backgroundColor: '#508489' }}
          onClick={handleRobotButtonClick}
        >
          <Image src={robotLogo} w="40px" h="40px" position="absolute" />
        </Button>
      </Box>
    </Flex>
  );
}
