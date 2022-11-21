import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import {
  getLocalStorage,
  saveRankingLocalStorage,
} from '../service/localStorage';
import logoTrivia from '../img/logoTrivia.png';
import style from '../style/Ranking.module.css';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      rankingPlayers: [],
    };
  }

  componentDidMount() {
    this.saveDataPlayerRanking();
  }

  fetchImgPlayerGravatar = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    const imgPlayerGravatar = `https://www.gravatar.com/avatar/${hash}`;
    return imgPlayerGravatar;
  };

  saveDataPlayerRanking = () => {
    const { name, score } = this.props;
    const imgPlayer = this.fetchImgPlayerGravatar();
    const playerData = {
      imgPlayer,
      name,
      score,
    };

    if (!JSON.parse(localStorage.getItem('ranking'))) {
      this.setState(
        (prev) => ({
          rankingPlayers: [...prev.rankingPlayers, playerData],
        }),
        () => {
          const { rankingPlayers } = this.state;
          saveRankingLocalStorage(rankingPlayers);
        },
      );
    } else {
      const ranking = JSON.parse(getLocalStorage('ranking'));
      this.setState(
        {
          rankingPlayers: [...ranking, playerData],
        },
        () => {
          const { rankingPlayers } = this.state;
          saveRankingLocalStorage(rankingPlayers);
        },
      );
    }
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  orderScorePlayers = (array) => {
    const arrayOrderScore = array.sort((a, b) => b.score - a.score);
    return arrayOrderScore;
  };

  render() {
    const { rankingPlayers } = this.state;
    return (
      <div className={ style.ranking }>
        <div className={ style.ranking__container }>
          <div className={ style.ranking__container__players }>
            <div className={ style.ranking__logo }>
              <img className="logo" src={ logoTrivia } alt="logo Trivia" />
            </div>
            <div className={ style.title__player }>
              <h1 data-testid="ranking-title">Ranking</h1>
            </div>
            <div className={ style.container__player }>
              {this.orderScorePlayers(rankingPlayers).map((player, index) => (
                <div className={ style.player } key={ index }>
                  <div className={ style.player__name }>
                    <img src={ player.imgPlayer } alt="icon-player" />
                    <p data-testid={ `player-name-${index}` }>{player.name}</p>
                  </div>
                  <div className={ style.player__score }>
                    <p data-testid={ `player-score-${index}` }>
                      <span className={ style.icon__star }>⭐</span>
                      {`${player.score} pontos`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className={ style.btn__player }>
              <button
                type="button"
                data-testid="btn-go-home"
                onClick={ this.handleClick }
              >
                Jogar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (stateGlobal) => ({
  name: stateGlobal.player.name,
  score: stateGlobal.player.score,
  email: stateGlobal.player.email,
});

Ranking.propTypes = {
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Ranking);
