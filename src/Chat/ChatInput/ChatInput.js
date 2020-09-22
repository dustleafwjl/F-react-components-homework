import React, { Component } from 'react';
import './ChatInput.scss';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  handleButtonClick = () => {
    if (this.state.inputValue === '') {
      return;
    }
    this.props.postMessage(this.state.inputValue);
  };

  render() {
    return (
      <footer className="ChatInput">
        <input value={this.state.inputValue} onChange={this.handleInputChange} type="text" />
        <button type="button" onClick={this.handleButtonClick}>
          Send
        </button>
      </footer>
    );
  }
}

export default ChatInput;
