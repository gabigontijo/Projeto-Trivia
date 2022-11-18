import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

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
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="imagem de perfil"
        />
        <p data-testid="header-player-name">{`Nome: ${name}`}</p>
        <p data-testid="header-score" value={ score }>
          {score}
        </p>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleSettings }
        >
          Settings
        </button>
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
