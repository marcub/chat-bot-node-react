import React from 'react'
import styled from 'styled-components'

export default function Messages({ messages, onOptionClick }) {
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    return (
        <Container>
            {messages.map((message, index) => (
                <div className={`message-item ${message.from === 'user' ? 'user' : 'bot'} ${message.disabled ? 'disabled' : ''}`} key={index}>
                    <div className={`message-text ${message.disabled ? 'disabled' : ''}`}>{message.text}</div>
                    {!message.disabled && message.options.length > 0 && (
                        <div className="options-container">
                            {message.options.map((option, idx) => (
                                <button className="option-button" key={idx} onClick={() => onOptionClick(option.value, option.label, index)}>{option.label}</button>
                            ))}
                        </div>
                    )}
                    <div className="message-meta">
                        {message.from === 'user' && <span className="message-sender">{user.username}</span>}
                        <span className="message-time">{message.timestamp || 'N/A'}</span>
                    </div>
                </div>
            ))}
        </Container>
    )
}

const Container = styled.div`
    overflow-y: auto;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
    .message-item {
        display: flex;
        flex-direction: column;
        .message-text {
            background-color: #f4b31c33;
            padding: 0.5rem 1rem;
            border-radius: 10px;
            color: white;
            max-width: 70%;
        }
        .options-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.5rem;
            .option-button {
                background-color: #dfa223;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                transition: background-color 0.3s;
                &:hover {
                    background-color: #b3560b;
                }
            }
        }
        .message-meta {
            margin-top: 0.3rem;
            font-size: 0.75rem;
            color: #cccccc;
            display: flex;
            gap: 0.5rem;
        }
        .message-sender {
            font-weight: bold;
        }
        .message-time {
            opacity: 0.8;
        }
    }
    .disabled {
        opacity: 1;
        pointer-events: none;
    }
    .user {
        align-items: flex-end;
    }
    .bot {
        align-items: flex-start;
    }
`;

