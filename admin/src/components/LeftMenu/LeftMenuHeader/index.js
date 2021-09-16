import React from 'react';
import { Link } from 'react-router-dom';
import Img from './Img';
import Bandeira from '../../../assets/images/bandeira.png';

import Wrapper from './Wrapper';

const LeftMenuHeader = () => (
  <Wrapper>
    <Link to="/" className="leftMenuHeaderLink">
      <Img src={Bandeira} alt="Brasão do estado de Alagoas" />
      <h3 style={{fontWeight: 'bold', color: 'white'}}>{CUSTOM_VARIABLES.ORGAN_NAME}</h3>
      <span style={{color: 'lightgrey'}}>Gestão de Compras</span>
      <br/>

    </Link>
  </Wrapper>
);

export default LeftMenuHeader;
