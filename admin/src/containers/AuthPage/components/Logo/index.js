import React from 'react';
import LogoJP from '../../../../assets/images/logo-dark.png';
import Bandeira from '../../../../assets/images/bandeira.png';
import Img from './Img';

const Logo = () => <>
  <Img src={Bandeira} alt="Brasão do estado de Alagoas" />
  <h1 style={{fontWeight: 'bold'}}>{

    // eslint-disable-next-line no-undef
    CUSTOM_VARIABLES.ORGAN_NAME
  }</h1>
  <span>Gestão de Compras</span>
  <br/>
  <br/>
  <Img src={LogoJP} alt="Logo JP Sistemas" />
</>;

export default Logo;
