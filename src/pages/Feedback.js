import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import logoTrivia from '../img/logoTrivia.png';
import '../style/Feedback.css';

class Feedback extends React.Component {
  handleClickPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleClickRancking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score, email } = this.props;
    const acertos = 3;
    const hash = MD5(email).toString();
    return (
      <div className="feedback">
        <div className="feedback__container">
          <div className="feedback__logo">
            <img className="logo" src={ logoTrivia } alt="logo Trivia" />
          </div>
          <div className="feedback__pontos">
            <div
              className="feedback__containerAvatar"
            >
              <img
                data-testid="header-profile-picture"
                src={ `https://www.gravatar.com/avatar/${hash}` }
                alt="imagem de perfil"
                className={ assertions < acertos
                  ? 'feedback__containerAvatar_error'
                  : 'feedback__containerAvatar_acerto' }
              />
            </div>
            {
              assertions < acertos
                ? (
                  <h1
                    data-testid="feedback-text"
                    className="feekback__erros"
                  >
                    Podia ser melhor...

                  </h1>
                )

                : (
                  <h1
                    data-testid="feedback-text"
                    className="feekback__acertos"
                  >
                    Mandou Bem!

                  </h1>
                )
            }
            <p data-testid="feedback-total-question">
              {` Você acertou ${assertions} questões!` }

            </p>
            <p data-testid="feedback-total-score">
              {` Um total de ${score} pontos`}
            </p>
          </div>
          <div className="feedback__btns">
            <button
              data-testid="btn-ranking"
              type="button"
              onClick={ this.handleClickRancking }
            >
              Ver Ranking
            </button>
            <button
              data-testid="btn-play-again"
              type="button"
              onClick={ this.handleClickPlayAgain }
            >
              Jogar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  email: state.player.email,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
