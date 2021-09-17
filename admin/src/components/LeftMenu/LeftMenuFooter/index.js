/**
 *
 * LeftMenuFooter
 *
 */

import React from 'react';
import Wrapper from './Wrapper';
import LogoJP from '../../../assets/images/logo-light.png';
import Img from './Img';

function LeftMenuFooter() {
  // PROJECT_TYPE is an env variable defined in the webpack config
  // eslint-disable-next-line no-undef
  // const projectType = PROJECT_TYPE;

  return (
    <Wrapper>
      <div className="">
        <Img src={LogoJP} alt="Logo JP Sistemas" />
      </div>
    </Wrapper>
  );
}

export default LeftMenuFooter;
