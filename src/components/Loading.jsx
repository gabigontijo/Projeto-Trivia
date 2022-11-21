import React from 'react';
import style from '../style/Loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <div className={ style.container }>
        <div className={ style.double_up } />
      </div>
    );
  }
}

export default Loading;
