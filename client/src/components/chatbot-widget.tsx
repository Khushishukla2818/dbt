import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X, Send } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { generateBotResponse, chatbotResponses } from "@/lib/chatbot-responses";

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { language } = useLanguage();

  const initializeChat = () => {
    if (messages.length === 0) {
      setMessages([{
        text: chatbotResponses.welcome[language],
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    initializeChat();
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Generate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        text: generateBotResponse(inputValue, language),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={handleOpen}
          size="lg"
          className="w-16 h-16 rounded-full shadow-lg gradient-bg hover:opacity-90"
          data-testid="chatbot-toggle"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-80 shadow-2xl">
          <CardHeader className="gradient-bg text-primary-foreground">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                {getTranslation('chatbot.title', language)}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-white/20"
                data-testid="chatbot-close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3" data-testid="chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground ml-8'
                      : 'bg-muted mr-8'
                  }`}
                  data-testid={`message-${message.sender}-${index}`}
                >
                  {message.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getTranslation('chatbot.placeholder', language)}
                  className="flex-1"
                  data-testid="chat-input"
                />
                <Button onClick={handleSendMessage} size="sm" data-testid="chat-send">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
