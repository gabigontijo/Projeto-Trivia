import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { MdOutlineTimer } from 'react-icons/md';
import { timerDesablesButton } from '../redux/action';
import style from '../style/Game.module.css';

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 30,
    };
  }

  // Esperando 5 segundos para INICIAR o timer na tela.
  componentDidMount() {
    const fivSeconds = 1000;
    setTimeout(() => {
      this.timerGame();
    }, fivSeconds);
  }

  // Função para fazer o decremento no estado local.
  timerGame = () => {
    const oneSecond = 1000;
    const countTimer = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count - 1,
      }), () => this.verifyCount(countTimer));
    }, oneSecond);
  };

  // Verificando se o contador chegou a zero.
  verifyCount = (timer) => {
    const { count } = this.state;
    const { dispatch } = this.props;
    if (count === 0) {
      clearInterval(timer);
      dispatch(timerDesablesButton(count));
    }
  };

  render() {
    const { count } = this.state;
    return (
      <div className={ style.timer }>
        <MdOutlineTimer className={ style.icon_timer } />
        <p>Tempo:</p>
        <p>{count}</p>
      </div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Timer);
