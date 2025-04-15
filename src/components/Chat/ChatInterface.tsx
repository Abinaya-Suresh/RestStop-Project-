
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { ChatMessage } from "@/types";
import { generateChatResponse } from "@/utils/chat-utils";
import { mockMessages } from "@/data/mockData";
import { restroomData } from "@/data/restroomData";
import { useToast } from "@/hooks/use-toast";

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport=""]');
      if (scrollableElement) {
        scrollableElement.scrollTop = scrollableElement.scrollHeight;
      }
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate a delay before sending the AI response
    setTimeout(() => {
      try {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: generateChatResponse(input, restroomData),
          isUser: false,
          timestamp: new Date().toISOString()
        };
        setMessages((prev) => [...prev, aiResponse]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Sorry, I couldn't process that request. Please try again.",
          variant: "destructive",
        });
        console.error("Error generating response:", error);
      } finally {
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold">Chat Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Ask anything about restrooms, facilities, or get recommendations
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start max-w-[80%] ${
                    message.isUser ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {!message.isUser && (
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-reststop-primary text-white">
                        RS
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <Card
                    className={`${
                      message.isUser
                        ? "bg-reststop-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    <CardContent className="p-3">
                      <p>{message.text}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start max-w-[80%]">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="bg-reststop-primary text-white">
                      RS
                    </AvatarFallback>
                  </Avatar>
                  <Card className="bg-muted">
                    <CardContent className="p-3">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-reststop-primary animate-pulse"></div>
                        <div className="h-2 w-2 rounded-full bg-reststop-primary animate-pulse delay-150"></div>
                        <div className="h-2 w-2 rounded-full bg-reststop-primary animate-pulse delay-300"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
