import React from 'react'
import ReactDOM from 'react-dom'

class Result extends React.Component {
  render() {
    return (
      <div style={{
        backgroundColor: "#F9F4F5",
        color: "black",
        borderColor: "#502F4C",
        borderWidth: 2,
        borderStyle: "solid",
        height: "50px",
        width: "196px",
        textAlign: "right",
        fontSize: "50px",
      }}>
        {this.props.value}
      </div>
    )
  }
}

class Clear extends React.Component {
  render() {
    return (
      <button style={{
        backgroundColor: "#F9F4F5",
        color: "black",
        borderColor: "#502F4C",
        height: "50px",
        width: "150px",
        textAlign: "center",
        fontSize: "35px",
      }}
        onClick = {this.props.onClickEvent} >
        clear
      </button>
    )
  }
}

class Numbers extends React.Component {
  render() {
    return (
      <button style={{
        backgroundColor: "#70587C",
        color: "white",
        borderColor: "#502F4C",
        height: "50px",
        width: "50px",
        textAlign: "center",
        fontSize: "40px",
      }} onClick = {() => this.props.onClickEvent(this.props.value)
      }>
        {this.props.value}
      </button>
    )
  }
}

class Operators extends React.Component {
  render() {
    return (
      <button style={{
        backgroundColor: "#C8B8DB",
        color: "black",
        borderColor: "502F4C",
        height: "50px",
        width: "50px",
        textAlign: "center",
        fontSize: "40px",
      }} 
        onClick = {() => this.props.onClickEvent(this.props.sign)}>
        {this.props.sign} 
      </button>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleSignClick = this.handleSignClick.bind(this);
    this.state= {
      result: 0,
      firstNumber: 0,
      sign: null,
      isFirstNumber: true,
      newNumber: true
      };
  }

  handleClearClick() {
    this.setState({
      result: 0
    });
  }

  handleNumberClick(num) {
    let prevNumbersClicked = this.state.result;
    if (prevNumbersClicked && !(this.state.newNumber)) {
      this.setState({
        result: prevNumbersClicked + String(num)
      })
    } else {
      this.setState({
        result: num,
        newNumber: false
      })
    };
  }

  renderNumberButton(num) {
    return <Numbers 
      onClickEvent = {this.handleNumberClick}
      value={num}
    />
  }

  handleSignClick(sign) {
    if (this.state.isFirstNumber && sign !== ":)" && sign !== "=") {
      this.setState({
        sign: sign,
        isFirstNumber: false,
        firstNumber: this.state.result,
        newNumber: true
      })
    } else {
      this.setState({
        result: eval(Number(this.state.firstNumber) + this.state.sign + Number(this.state.result)),
        sign: null,
        isFirstNumber: true,
        newNumber: true
      })
    }
  }

  renderSignButton(sign) {
    return (
      <Operators 
      onClickEvent = {this.handleSignClick}
      sign={sign} />)
  }

  render() {
    return (
      <div style={{
        margin: 100,
        }}>
        <div style={{
        display: "flex",
        }}>
          <Result value={this.state.result}/>
        </div>

        <div style={{
        display: "flex",
        }}>
          {this.renderNumberButton(1)}
          {this.renderNumberButton(2)}
          {this.renderNumberButton(3)}
          {this.renderSignButton("*")}
        </div>

        <div style={{
        display: "flex",
        }}>
          {this.renderNumberButton(4)}
          {this.renderNumberButton(5)}
          {this.renderNumberButton(6)}
          {this.renderSignButton("-")}        
        </div>
        <div style={{
        display: "flex",
        }}>
          {this.renderNumberButton(7)}
          {this.renderNumberButton(8)}
          {this.renderNumberButton(9)}
          {this.renderSignButton("+")}
        </div>

        <div style={{
        display: "flex",
        }}>
          {this.renderNumberButton(".")}
          {this.renderNumberButton(0)}
          {this.renderSignButton(":)")}
          {this.renderSignButton("/")}
        </div>

        <div style={{
        display: "flex",
        }}>
          <Clear onClickEvent={this.handleClearClick}/>
          {this.renderSignButton("=")}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
