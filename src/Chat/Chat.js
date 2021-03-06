import React, { Component } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBox from './ChatBox/ChatBox';
import ChatInput from './ChatInput/ChatInput';
import shopData from '../data/shop.json';
import answersData from '../data/answers.json';
import { ROLE } from '../constants';

class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shop: {},
      messages: [],
    };
  }

  componentDidMount() {
    const defaultMessage = answersData.find((answer) => answer.tags.includes('DEFAULT'));
    const messages = this.state.messages.concat(defaultMessage);

    setTimeout(() => {
      this.setState({
        shop: shopData,
        messages,
      });
    }, 1000);
  }

  postMessage = (text) => {
    const customerData = {
      tags: [],
      text,
      role: ROLE.CUSTOMER,
    };
    this.setState(
      {
        messages: [...this.state.messages, customerData],
      },
      () => {
        this.answerMessage(text);
      }
    );
  };

  answerMessage = (tag) => {
    const answerText = answersData.find((answer) => answer.tags.includes(tag));
    if (!answerText) {
      return;
    }
    this.setState({
      messages: [...this.state.messages, answerText],
    });
  };

  render() {
    const { shop, messages } = this.state;
    return (
      <main className="Chat">
        <ChatHeader shop={shop} />
        <ChatBox messages={messages} />
        <ChatInput postMessage={this.postMessage} />
      </main>
    );
  }
}

export default Chat;
