import React, { useState } from 'react';
import { Send, Loader, Leaf } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function TeaBrewingApp() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '🍃 Welcome to the AI Tea Brewing Guide! Tell me about the tea you want to brew, your preferences, or ask for brewing tips. I\'ll provide personalized recommendations for the best brewing method.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim() || loading) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      // Use PHP proxy for cPanel deployment, Node.js server for development
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? '/brewbuddy.magmedia.co.za/api.php'  // PHP proxy for cPanel subdirectory
        : 'http://localhost:5000/api/chat'; // Node.js server for development
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          max_tokens: 1000,
          messages: [
            {
              role: 'system',
              content: `You are an expert tea brewing specialist with deep knowledge of different tea types, brewing techniques, water temperatures, steeping times, and flavor profiles. When a user tells you about a tea they want to brew or asks for recommendations, provide:

              1. Tea type identification and characteristics
              2. Optimal water temperature (in both F and C)
              3. Recommended steeping time
              4. Amount of tea to use
              5. Water quality recommendations if relevant
              6. Tips for enhancing flavor
              7. Common mistakes to avoid

              Be friendly, engaging, and passionate about tea. Provide specific, actionable advice.`
            },
            ...newMessages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ]
        })
      });

      const data = await response.json();
      const assistantMessage = data.choices[0]?.message?.content || 'Unable to get a response';
      
      setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-amber-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-800 to-green-700 text-white p-6 shadow-lg">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <Leaf className="w-8 h-8" />
          <div>
            <h1 className="text-3xl font-bold">BrewBuddy - The AI-Powered Tea Brewing Guide</h1>
            <p className="text-amber-100">Perfect your brew with AI-powered recommendations</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-amber-600 text-white rounded-br-none'
                    : 'bg-white text-gray-800 shadow-md rounded-bl-none border border-amber-100'
                }`}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // Custom styling for markdown elements
                        h1: ({children}) => <h1 className="text-lg font-bold text-amber-800 mb-2">{children}</h1>,
                        h2: ({children}) => <h2 className="text-base font-bold text-amber-700 mb-2">{children}</h2>,
                        h3: ({children}) => <h3 className="text-sm font-bold text-amber-600 mb-1">{children}</h3>,
                        p: ({children}) => <p className="mb-2 leading-relaxed">{children}</p>,
                        ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="text-sm">{children}</li>,
                        strong: ({children}) => <strong className="font-semibold text-amber-700">{children}</strong>,
                        em: ({children}) => <em className="italic text-amber-600">{children}</em>,
                        code: ({children}) => <code className="bg-amber-100 text-amber-800 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                        pre: ({children}) => <pre className="bg-amber-50 p-2 rounded text-xs overflow-x-auto">{children}</pre>,
                        blockquote: ({children}) => <blockquote className="border-l-4 border-amber-300 pl-3 italic text-amber-700">{children}</blockquote>,
                        table: ({children}) => <table className="w-full border-collapse border border-amber-200 text-xs">{children}</table>,
                        th: ({children}) => <th className="border border-amber-200 bg-amber-50 px-2 py-1 font-semibold">{children}</th>,
                        td: ({children}) => <td className="border border-amber-200 px-2 py-1">{children}</td>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 px-4 py-3 rounded-lg shadow-md border border-amber-100 rounded-bl-none">
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin text-amber-600" />
                  <span>Brewing up some wisdom...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-amber-200 bg-white p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me about your tea... (e.g., 'I have a green tea, I like bold flavors')"
              className="flex-1 px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className="bg-gradient-to-r from-amber-600 to-green-600 hover:from-amber-700 hover:to-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
            >
              <Send className="w-4 h-4" />
              Brew
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}