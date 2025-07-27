import { chatGemini } from '../../functions/chatGemini';
import './ChatWindow.css'
import { useState } from 'react';

function ChatWindow({sessionId}) {
  const [messages, setMessages] = useState([
    { text: "I am here to help with any questions", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Call your backend here
    try {
      setSent(true)
      const data = await chatGemini(sessionId, userMessage)
      setSent(false)
      const botMessage = { text: data, sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="chat-window">
      {isOpen ? <div className="message-list">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {sent ? <div className='message bot'>...</div> : ''}
      </div> : ''}
      <div className="input-area">
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? '-' : '+'}</button>
        <input
          type="text"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow