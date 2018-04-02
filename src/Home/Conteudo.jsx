import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ConteudoHome extends Component {
  constructor(props){
        super(props);

        this.state = {

        }
      }
  render() {
    return (
      <section id='conteudo-body'>
        <div className='h-50 DF FW'>
          <div className='container-100'>
            <button className='btn btn-login DF'>
              <Link role='menuitem' to='/Dashboard' className='container-100 text-center color-2 tamfont2 font-1 Upper'>
                  Fazer Login 
                  <i className="fas fa-sign-in-alt"></i>
              </Link>
            </button>
          </div>
          <div className='grcontainer-50 MB20 DF FW'>
            <div className='container-100 DF FW CSP'>
                <div className='container-50'>
                  <img src='img/logo-full.png' alt='Logo completo da MoodSight' />
                </div>
                <h3 className='Upper container-50 font-2 text-center tamfont2 color-2'>É uma ferramenta criativa!</h3>
            </div>
            <ul className='DF FW CSP container-100 pal-home MTB10'>
              <li className='pal-item-home container-20 bgcolor-1'></li>
              <li className='pal-item-home container-20 bgcolor-2'></li>
              <li className='pal-item-home container-20 bgcolor-3'></li>
              <li className='pal-item-home container-20 bgcolor-4'></li>
              <li className='pal-item-home container-20 bgcolor-5'></li>
            </ul>
            <h4 className="Upper tamfont6 title-chamada MTB10 font-1 color-2">Expanda suas Possibilidades</h4>
            <p className="text-chamada font-1 tamfont2 color-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed ipsum sed sapien laoreet convallis. In suscipit magna sit amet diam tempus dapibus. In cursus laoreet fermentum. Donec sed augue nec magna porta semper. Morbi vel tincidunt augue, ut eleifend velit. Sed sit amet velit fringilla lectus venenatis scelerisque. Morbi tempus ut tellus dignissim commodo. Nunc di venenatis a, dignissim at ipsum. Duis ullamcorper ultrices urna, sed faucibus ex placerat non. Vivamus non accumsan ante. Praesent pellentesque fringilla erat sed egestas. Curabitur nisl sapien, volutpat nec nisi sit amet, molestie elementum sem. Cras sed vestibulum elit. Nullam lacinia libero in turpis luctus, et vestibulum sapien volutpat</p>
          </div>
          <div className='glcontainer-50 MB20'>
            <div className='video-container'></div>
          </div>
        </div>
        <div className='h-50 DF FW'>
          <div className="grcontainer-30">
            <ul className="DF FW CSP cont-icon-home MTB20">
              <li className='tamfont8'><i className="fas fa-paint-brush"></i></li>
              <li className='tamfont8'><i className="far fa-square"></i></li>
              <li className='tamfont8'><i className="fas fa-code"></i></li>
              <li className='tamfont8'><i className="fas fa-font"></i></li>
            </ul>
            <div className='MTB20'>
                <p className="Upper tamfont8 font-1 MTB10">Gere</p>
                <p className="Upper tamfont8 font-1 MTB10">Crie Paletas</p>
                <p className="Upper tamfont8 font-1 MTB10">Teste Elementos UI</p>
            </div>
            <div className="container-100 cont-elements">
              <ul className="DF FW CSP MTB20 container-100">
                <li className='bgcolor-4 cont-33-20x40'></li>
                <li className='bgcolor-3 cont-33-20x40'></li>
                <li className='bgcolor-2 cont-33-20x40'></li>
              </ul>
              <div className="contaner-100 MTB20 bgcolor-1 DF FW align-right menu-mb-home">
                <i class="fas fa-bars"></i>
              </div>
            </div>
          </div>
          <div className="glcontainer-70 MTB20">
            <div className='cont-info-home'>
              <ul className='PR'>
                <li className='item-home PA'></li>
                <li className='item-home PA'></li>
                <li className='item-home PA'></li>
                <li className='item-home PA'></li>
              </ul>
              <h4 className='Upper tamfont3 color-1'>Facilidade de Uso</h4>
              <p className='font-1 tamfont2 color-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed ipsum sed sapien laoreet convallis. In suscipit magna sit amet diam tempus dapibus. In cursus laoreet fermentum. Donec sed augue nec magna porta semper. Morbi vel tincidun
t augue, ut eleifend velit. Sed sit amet velit fringilla lectus venenatis scelerisque. Morbi tempus ut tellus dignissim commodo. Nunc diam dui, pos
uere sed venenatis a, dignissim at ipsum. Duis ullamcorper ultrices urna, sed faucibus ex placerat non. Vivamus non accumsan ante. Praesent pellentesque fringilla erat sed egestas. Curabitur nisl sapien, volutpat nec nisi sit amet, molestie elementum sem. Cras sed vestibulum elit. Nullam lacinia libero in turpis luctus, et vestibulum sapien volutpat</p>
            </div>
            <div>
            </div>
          </div>
        </div>
      </section>
    );
    }
}

export default ConteudoHome;
