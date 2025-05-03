import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import Logout from './Logout';
import ChatInput from './ChatInput';
import Messages from './Messages';
import { getUpcomingMatches } from '../utils/ApiRoutes';
import { MdLiveTv } from "react-icons/md";

const INITIAL_MENU = {
    text: 'Olá! Como posso ajudar você hoje?',
    options: [
        { label: '🎮 Próximos jogos', value: 'nextGames' },
        { label: '📰 Notícias recentes', value: 'news' },
        { label: '💬 Fale comigo', value: 'chat' }
    ],
    disabled: false
};

export default function ChatContainer() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([{from: 'bot', ...INITIAL_MENU}]);
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

        setTimeout( async () => {
            let botResponse;
            switch (optionValue) {
                case 'nextGames':
                    try {
                        const response = await axios.get(getUpcomingMatches);
                        const data = response.data;
                        const upcomingMatchesHtml = data.slice(0, 2).map((match, index) => {
                            const opponents = match.opponents.map(op => op.opponent?.name || 'A ser definido');
                            const logos = match.opponents.map(op => op.opponent?.image_url || '');
                            const date = new Date(match.begin_at);
                            const formattedDate = date.toLocaleDateString('pt-BR', {
                                weekday: 'long',
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                            }).replace(/^\w/, c => c.toUpperCase())
                            const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                            const tournament = `${match.league.name} ${match.serie.name || ''}`.trim();
                            const matchFormat = match.number_of_games === 3 ? 'MD3' : 'MD' + match.number_of_games;
                            const streamsList = match.streams_list;
                            const mainStream = streamsList[0];
                            const streamUrl = mainStream.raw_url;
                            return (
                                <div class="match-card">
                                    <div class="match-date">{formattedDate}</div>
                                    <div class="match-details">
                                        <div class="match-time">🕒 {time}</div>
                                        <div class="match-teams">
                                            {opponents.length === 2 ? (
                                                <>
                                                    <span className="team-with-logo">
                                                        <img src={logos[0]} alt={`${opponents[0]} logo`} className="team-logo" />
                                                        {opponents[0]}
                                                    </span>
                                                    <span className="team-separator">x</span>
                                                    <span className="team-with-logo">
                                                        <img src={logos[1]} alt={`${opponents[1]} logo`} className="team-logo" />
                                                        {opponents[1]}
                                                    </span>
                                                </>
                                            ) : (
                                                <span>{opponents.join(' x ')}</span>
                                            )}
                                        </div>
                                        <div class="match-format">{matchFormat}</div>
                                        <div class="match-tournament">🏆 {tournament}</div>
                                        <a href={streamUrl} target="_blank" className="match-stream" rel="noreferrer">
                                            <MdLiveTv size={25} color="#6200ea" />
                                        </a>
                                    </div>
                                </div>
                            );
                        });

                        botResponse = {
                            from: 'bot',
                            text: (
                                <div className="matches-container">
                                    <h4>Próximos jogos</h4>
                                    {upcomingMatchesHtml.length > 0 ? upcomingMatchesHtml : <p>Nenhum jogo encontrado.</p>}
                                </div>
                            ),
                            options: [{ label: 'Voltar ao menu inicial', value: 'start' }],
                            disabled: false,
                        };
                    } catch (error) {
                        botResponse = {
                            from: 'bot',
                            text: error.message || 'Erro ao carregar os próximos jogos.',
                            options: [{ label: 'Voltar ao menu inicial', value: 'start' }],
                            disabled: false,
                        };
                    }
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
                    botResponse = {from: 'bot', ...INITIAL_MENU};
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
                    ...INITIAL_MENU,
                    text: 'Entendi! Vamos voltar ao menu inicial.'
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
    .matches-container {
        color: white;
        h4 {
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
        }
    }
    .match-card {
        background: #1a1a1a;
        border-radius: 8px;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        border: 1px solid #444;
    }
    .match-date {
        font-size: 0.9rem;
        color: #bbb;
        margin: 0.5rem 0.3rem;
    }
    .match-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
        padding: 0.5rem;
    }
    .match-time {
        color: #bbb;
        margin: 0 0.5rem;
    }
    .match-teams {
        display: flex;
        flex: 1;
        text-align: center;
        color: white;
        margin: 0 0.5rem;
        gap: 0.5rem;
    }
    .team-with-logo {
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }
    .team-logo {
        width: 20px;
        height: 20px;
        object-fit: contain;
        border-radius: 4px;
    }
    .match-score {
        margin-left: 0.5rem;
        color: #888;
    }
    .match-format {
        background: #6200ea;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        margin: 0 0.5rem;
    }
    .match-tournament {
        color: #bbb;
        font-size: 0.8rem;
        margin: 0 0.5rem;
    }
`;