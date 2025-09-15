"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Minimize2, Maximize2, X, MessageCircle } from 'lucide-react';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    context?: string;
}

interface AIAssistantProps {
    context?: 'general' | 'roadmap' | 'interview' | 'blog';
    className?: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
    context = 'general',
    className = '' 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: `Hello! I'm your AI assistant for the Dev Roadmap Platform. How can I help you today?`,
            sender: 'ai',
            timestamp: new Date(),
            context: 'general'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!inputText.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
            context
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: inputText,
                    context: context
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: data.response,
                sender: 'ai',
                timestamp: new Date(),
                context: data.context
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            
            let errorMessage = 'Sorry, I encountered an error. Please try again.';
            
            // Try to get more specific error message
            if (error instanceof Error) {
                errorMessage = `Error: ${error.message}`;
            }
            
            const errorMessageObj: Message = {
                id: (Date.now() + 1).toString(),
                text: errorMessage,
                sender: 'ai',
                timestamp: new Date(),
                context: 'error'
            };
            setMessages(prev => [...prev, errorMessageObj]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const contextLabels = {
        general: 'General Assistant',
        roadmap: 'Roadmap Helper',
        interview: 'Interview Prep',
        blog: 'Blog Writing'
    };

    if (!isOpen) {
        return (
            <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
                <button
                    onClick={toggleChat}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    aria-label="Open AI Assistant"
                >
                    <MessageCircle size={24} />
                </button>
            </div>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
            <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
                isMinimized ? 'h-16' : 'h-96 w-80'
            }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/20">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <Bot size={16} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                            <p className="text-white/70 text-xs">{contextLabels[context]}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setIsMinimized(!isMinimized)}
                            className="text-white/70 hover:text-white transition-colors"
                            aria-label={isMinimized ? "Maximize" : "Minimize"}
                        >
                            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                        </button>
                        <button
                            onClick={toggleChat}
                            className="text-white/70 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X size={16} />
                        </button>
                    </div>
                </div>

                {!isMinimized && (
                    <>
                        {/* Messages */}
                        <div className="h-64 overflow-y-auto p-4 space-y-3">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                                        message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                                    }`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                            message.sender === 'user' 
                                                ? 'bg-blue-500' 
                                                : 'bg-gradient-to-r from-purple-500 to-pink-500'
                                        }`}>
                                            {message.sender === 'user' ? (
                                                <User size={12} className="text-white" />
                                            ) : (
                                                <Bot size={12} className="text-white" />
                                            )}
                                        </div>
                                        <div className={`p-3 rounded-lg ${
                                            message.sender === 'user'
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white/10 text-white border border-white/20'
                                        }`}>
                                            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                                            <p className="text-xs opacity-70 mt-1">
                                                {message.timestamp.toLocaleTimeString([], { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                            <Bot size={12} className="text-white" />
                                        </div>
                                        <div className="bg-white/10 border border-white/20 rounded-lg p-3">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/20">
                            <div className="flex items-center space-x-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!inputText.trim() || isLoading}
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Send message"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AIAssistant;