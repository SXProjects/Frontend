import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { DIndex } from '../../redux/slices/Index/indexDictionary';
import { Profile } from './Navbar/Profile/Profile';
import { Navbar } from './Navbar/Navbar';
import { Flex } from '@chakra-ui/react';
import { Sensor } from './Sensor/Sensor'

export function Index() {
  const index = useAppSelector((state) => state.index);

  if (index.active === DIndex.robot) {
    return (
      <Fragment>
        <Navbar />
        <p>robot</p>
        <Sensor/>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Navbar />
        <Sensor/>
      </Fragment>
    );
  }
}
