import React from 'react';
// import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import style from '../style/Footer.module.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className={ style.container_footer }>
        <div className={ style.title_footer }>
          <p>Grupo 1 turma 25A</p>
        </div>
        <div className={ style.info_team }>
          <p>Gabriela Gontijo</p>
          {/* <div className={ style.social }>
            <AiFillLinkedin className={ style.icon_in } />
            <AiFillGithub className={ style.icon_git } />
          </div> */}
        </div>
        <div className={ style.info_team }>
          <p> Joelna Mota</p>
        </div>
        <div className={ style.info_team }>
          <p>Karoline Stangherlin</p>
        </div>
        <div className={ style.info_team }>
          <p> Matheus Chaves</p>
        </div>
        <div className={ style.info_team }>
          <p> Wanderson Ricardo</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
