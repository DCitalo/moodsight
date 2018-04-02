import React, { Component } from 'react';
import Nav from './Common/Nav';
import ConteudoHome from './Home/Conteudo';
import Dashboard from './Dashboard/Conteudo'
import Ajuda from './Informacoes/Ajuda';
import Contato from './Informacoes/Contato';
import Sobre from './Informacoes/Sobre';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom'; 

class App extends Component {
  componentDidUpdate() {
    window.scrollTo(0,0);
  }
  render() {
    return ([
          <Nav  key='menu'/>,
          <Switch key='body'>
            <Route exact path="/" component={ConteudoHome}/>
            <Route path="/Dashboard" component={Dashboard}/>
            <Route path="/Ajuda" component={Ajuda}/>
            <Route path="/Contato" component={Contato}/>
            <Route path="/Sobre" component={Sobre}/>
          </Switch>
        ]);
  }
}
export default App;
