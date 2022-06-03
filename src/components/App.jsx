import React from 'react';
import './App.css';

class Result extends React.Component {
  render() {
    return <div className="result">{this.props.value}</div>;
  }
}

class Clear extends React.Component {
  render() {
    return (
      <button className='clear' onClick={this.props.onClickEvent}>
        clear
      </button>
    );
  }
}

class Numbers extends React.Component {
  render() {
    return (
      <button className='number' onClick={() => this.props.onClickEvent(this.props.value)}>
        {this.props.value}
      </button>
    );
  }
}

class Operators extends React.Component {
  render() {
    return (
      <button className='operators' onClick={() => this.props.onClickEvent(this.props.sign)}>
        {this.props.sign}
      </button>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.state = {
      result: 0,
      newNumber: true,
      firstNumber: null,
      sign: false,
      decimal: false
    };
  }

  handleClearClick() {
    this.setState({
      result: 0,
      newNumber: true,
      firstNumber: null,
      sign: null,
      decimal: false
    });
  }

  handleNumberClick(num) {
    let prevNumbersClicked = this.state.result;
    if (this.state.newNumber && num != '.' && num != '+/-') {
      this.setState({
        result: num,
        newNumber: false
      });
    } else if (num === '.' && !this.state.decimal) {
      this.setState({
        result: prevNumbersClicked + '.',
        decimal: true,
        newNumber: false
      });
    } else if (prevNumbersClicked.toString().length < 8 && num != '+/-') {
      this.setState({
        result: prevNumbersClicked + String(num),
        newNumber: false
      });
    } else if (num === '+/-' && prevNumbersClicked != 0) {
      var multiplicativeInverse = Number(prevNumbersClicked) * (-1);
      this.setState({
        result: multiplicativeInverse,
        newNumber: false
      });
    }
  }

  renderNumberButton(num) {
    return <Numbers onClickEvent={this.handleNumberClick} value={num} />;
  }

  handleSignClick(sign) {
    if (!this.state.sign) {
      this.setState({
        sign: sign,
        newNumber: true,
        firstNumber: this.state.result,
        result: 0
      });
    } else {
      var secondNumber = this.state.result;
      var finalResult = eval(Number(this.state.firstNumber) + this.state.sign + Number(this.state.result))
      this.setState({
        result: finalResult,
        sign: sign,
        decimal: false,
        newNumber: true
      })
      this.setState({
        firstNumber: finalResult,
      })
      if (sign === '=') {
        this.setState({
          sign: null
        })
      };
      if (this.state.result) {
        let numberPrecised = this.state.result.toPrecision(6)
      }

    }
  }

  renderSignButton(sign) {
    return <Operators onClickEvent={this.handleSignClick} sign={sign} />;
  }

  render() {
    return (
      <div className='container'>
        <div>
          <Result value={this.state.result} />
        </div>

        <div>
          {this.renderNumberButton(1)}
          {this.renderNumberButton(2)}
          {this.renderNumberButton(3)}
          {this.renderSignButton('+')}
        </div>

        <div>
          {this.renderNumberButton(4)}
          {this.renderNumberButton(5)}
          {this.renderNumberButton(6)}
          {this.renderSignButton('-')}
        </div>
        
        <div>
          {this.renderNumberButton(7)}
          {this.renderNumberButton(8)}
          {this.renderNumberButton(9)}
          {this.renderSignButton('*')}
        </div>

        <div>
          {this.renderNumberButton('.')}
          {this.renderNumberButton(0)}
          {this.renderNumberButton('+/-')}
          {this.renderSignButton('/')}
        </div>

        <div>
          <Clear onClickEvent={this.handleClearClick} />
          {this.renderSignButton('=')}
        </div>
      </div>
    );
  }
}

export default Calculator;
