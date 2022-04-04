import { Fragment } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { DIndex } from '../../redux/slices/Index/indexDictionary';
import { Profile } from './Navbar/Profile/Profile';
import { Navbar } from './Navbar/Navbar';

export function Index() {
  const index = useAppSelector((state) => state.index);

  if (index.active === DIndex.farm) {
    return (
      <Fragment>
        <Navbar />
        <p>farm</p>
      </Fragment>
    );
  } else if (index.active === DIndex.robot) {
    return (
      <Fragment>
        <Navbar />
        <p>robot</p>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Navbar />
      </Fragment>
    );
  }
}
