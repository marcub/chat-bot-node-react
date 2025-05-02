import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';

export default function ChatContainer() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                from: 'bot',
                text: 'Olá! Como posso ajudar você hoje?',
                options: [
                    { label: '🎮 Próximos jogos', value: 'nextGames' },
                    { label: '📰 Notícias recentes', value: 'news' },
                    { label: '💬 Fale comigo', value: 'chat' }
                ],
                disabled: false
            }
        ])
    }, []);

    const handleOptionClick = (optionValue, optionText, messageIndex) => {

        setMessages((prev) => {
            const updatedMessages = [...prev];
            updatedMessages[messageIndex].disabled = true;
            return updatedMessages;
        });

        setMessages((prev) => [
            ...prev,
            { from: 'user', text: optionText, options: [], disabled: false },
        ]);

        setTimeout(() => {
            let botResponse;
            switch (optionValue) {
                case 'nextGames':
                    botResponse = {
                        from: 'bot',
                        text: 'Próximos jogos do Flamengo:\n1. Flamengo x Corinthians - 10/05/2025\n2. Flamengo x Vasco - 15/05/2025',
                        options: [
                            { label: 'Voltar ao menu inicial', value: 'start' },
                        ],
                        disabled: false
                    };
                    break;
                case 'news':
                    botResponse = {
                        from: 'bot',
                        text: 'Aqui estão algumas notícias recentes:\n1. Flamengo vence o Brasileirão 2024!\n2. São Paulo contrata novo técnico.',
                        options: [
                            { label: 'Voltar ao menu inicial', value: 'start' },
                        ],
                        disabled: false
                    };
                    break;
                case 'chat':
                    botResponse = {
                        from: 'bot',
                        text: 'Claro, sobre o que você gostaria de conversar?',
                        options: [],
                        disabled: false
                    };
                    break;
                case 'start':
                    botResponse = {
                        from: 'bot',
                        text: 'Olá! Como posso ajudar você hoje?',
                        options: [
                            { label: 'Próximos jogos', value: 'nextGames' },
                            { label: 'Notícias recentes', value: 'news' },
                            { label: 'Fale comigo', value: 'chat' },
                        ],
                        disabled: false
                    };
                    break;
                default:
                    botResponse = {
                        from: 'bot',
                        text: 'Desculpe, não entendi. Vamos tentar novamente?',
                        options: [
                            { label: 'Voltar ao menu inicial', value: 'start' },
                        ],
                        disabled: false
                    };
            }
            setMessages((prev) => [...prev, botResponse]);
        }, 500);
    };

    const handleSendMsg = (msg) => {
        setMessages((prev) => [
            ...prev,
            { from: 'user', text: msg, options: [], disabled: false },
        ]);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    from: 'bot',
                    text: 'Entendi! Vamos voltar ao menu inicial.',
                    options: [
                        { label: 'Próximos jogos', value: 'nextGames' },
                        { label: 'Notícias recentes', value: 'news' },
                        { label: 'Fale comigo', value: 'chat' },
                    ],
                    disabled: false
                },
            ]);
        }, 500);
    };

    
    return (
        <Container>
            <div className="chat-header">
                <div className="chat-details">
                    <div className="avatar">
                        <img src={Logo} alt="avatar" />
                    </div>
                    <div className="name-chat">
                        <h3>Clutch Chat</h3>
                    </div>
                </div>
                <Logout />
            </div>
            <Messages messages={messages} onOptionClick={handleOptionClick} />
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
    )
}


const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 10% 80% 10%;
    gap: 0.5rem; 
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .chat-details {
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar {
                img {
                    height: 3rem;
                }
            }
            .name-chat {
                h3 {
                    color: white;
                }
            }
        }
    }
`;