import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { GiRoundStar } from 'react-icons/gi';
import { IoMdSettings } from 'react-icons/io';
import logoTrivia from '../img/logoTrivia.png';
import style from '../style/Header.module.css';

class Header extends React.Component {
  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, score, email } = this.props;
    // console.log(this.props);
    const hash = md5(email).toString();
    return (
      <header className={ style.container_header }>
        <div>
          <img src={ logoTrivia } alt="logo-trivia" className={ style.logo_header } />
        </div>
        <div className={ style.container_user_info }>
          <div className={ style.box_user }>
            <img
              className={ style.logo_user }
              data-testid="header-profile-picture"
              src={ `https://www.gravatar.com/avatar/${hash}` }
              alt="imagem de perfil"
            />
            <p data-testid="header-player-name">{`Nome: ${name}`}</p>
          </div>
          <div className={ style.box_score }>
            <GiRoundStar className={ style.icon_star } />
            <p data-testid="header-score" value={ score }>
              {score}
            </p>
          </div>
          <div className={ style.box_btn_settings }>
            <IoMdSettings
              className={ style.btn_settings }
              data-testid="btn-settings"
              type="button"
              onClick={ this.handleSettings }
            />
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.email,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
