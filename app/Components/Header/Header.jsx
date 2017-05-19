import React, { Component } from 'react'

import UserIcon from '../../Icons/User'

import Styles from './header.scss'
import CSSModules from 'react-css-modules'

class Header extends Component {
   render() {
      return (
         <div styleName='header'>
            <div styleName='nav-toggle'>Toggle</div>
            <h1 styleName='headerTitle'></h1>
            <img src={logo} />
            <UserIcon styleName='userSvg'/>
            <div styleName='notifications'>Notifications</div>
         </div>
      );
   }
}


export default CSSModules(Header, Styles)
// export default Header
