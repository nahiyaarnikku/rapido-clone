import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import './Chatbot.css';

const initialMessage = {
  text: "Hello! What would you like to know about Rapigo?",
  isUser: false,
  options: [
    "What is Rapigo?",
    "How does it work?",
    "Is it safe?",
    "How much does it cost?",
    "Where is it available?"
  ]
};

const responses = {
  "What is Rapigo?": {
    text: "Rapigo is a bike taxi service app similar to the original Rapido. It allows users to book motorcycle rides for quick and affordable transportation in urban areas.",
    isUser: false,
    options: ["How does it work?", "Is it safe?", "How much does it cost?"]
  },
  "How does it work?": {
    text: "Users can book a ride through the app by entering their pickup and drop-off locations. A nearby registered driver (called a Captain) accepts the ride and picks up the user. The user rides as a pillion passenger to their destination.",
    isUser: false,
    options: ["Is it safe?", "How much does it cost?", "Where is it available?"]
  },
  "Is it safe?": {
    text: "Safety is a top priority. All Captains are verified, and the app includes features like live tracking, emergency contacts, and helmet provision. However, as with any transportation, users should always remain cautious.",
    isUser: false,
    options: ["How does it work?", "How much does it cost?", "Where is it available?"]
  },
  "How much does it cost?": {
    text: "The cost varies depending on the distance and location, but it's generally more affordable than traditional taxis. The app provides a fare estimate before booking, and users can pay through the app or in cash.",
    isUser: false,
    options: ["What is Rapigo?", "How does it work?", "Where is it available?"]
  },
  "Where is it available?": {
    text: "The availability depends on the specific Rapido clone implementation, but typically these services are available in major cities and urban areas where there's a demand for quick, affordable transportation.",
    isUser: false,
    options: ["What is Rapigo?", "How does it work?", "Is it safe?"]
  }
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);

  const handleOptionClick = (option) => {
    setMessages(prev => [...prev, { text: option, isUser: true }, responses[option]]);
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>Rapigo Bot</h3>
            <button onClick={() => setIsOpen(false)}>
              <X />
            </button>
          </div>
          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chatbox-message ${message.isUser ? 'user' : 'bot'}`}>
                <div className="chatbox-message-text">{message.text}</div>
                {message.options && (
                  <div className="chatbox-options">
                    {message.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        className="chatbox-option-button"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <button className="chatbot-toggle-button" onClick={() => setIsOpen(true)}>
          <MessageCircle />
        </button>
      )}
    </div>
  );
}
