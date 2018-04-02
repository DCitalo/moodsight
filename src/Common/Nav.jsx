import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import ReactSVG from 'react-svg';
//import Logo from './Logo-SVG';

class Nav extends Component {
  constructor(props){
        super(props);

        this.state = {

        }
      }
  render() {
    return (
      <header role="menubar" id='menu' className='PF DF FW background-4'>
       <nav className='navigation-menu DF FW container-100'>      
          <Link role='menuitem' to="/Sobre" className='container-100 text-center menu-item color-1 Upper DF FW'>
            <i class="fas fa-info-circle tamfont4 container-100 MRL-auto"></i>
            <span className='container-100 tamfont1 font-1'>Sobre</span>
          </Link>
          <Link role='menuitem' to="/Ajuda" className='container-100 text-center menu-item color-1 Upper DF FW'>
            <i class="fas fa-question-circle tamfont4 container-100 MRL-auto"></i>
            <span className='container-100 tamfont1 font-1'>Ajuda</span>
          </Link>
          <Link role='menuitem' to="/Contato" className='container-100 text-center menu-item color-1 Upper DF FW'>
            <i class="fas fa-envelope tamfont4 container-100 MRL-auto"></i>
            <span className='container-100 tamfont1 font-1'>Contato</span>
          </Link>
       </nav>
        <Link to='/' className='logo-cont'>
          <img src='img/icon-100x100.png'  alt='Logo MoodSight'/>
        </Link>
      </header>
    );
    }
}

export default Nav;
