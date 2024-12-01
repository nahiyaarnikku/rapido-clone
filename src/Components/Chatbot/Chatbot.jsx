import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const initialMessage = {
  text: "Hello! What would you like to know about Rapido clone?",
  isUser: false,
  options: [
    "What is Rapido clone?",
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
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white w-80 h-96 rounded-lg shadow-lg flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Rapido Clone Chat</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-4">
                <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-2`}>
                  <div className={`rounded-lg p-2 max-w-[80%] ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    {message.text}
                  </div>
                </div>
                {message.options && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleOptionClick(option)}
                        className="bg-gray-100 hover:bg-gray-200 text-sm py-1 px-2 rounded"
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
        <button onClick={() => setIsOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3">
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}