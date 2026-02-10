import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Bot, User, Sprout, Landmark, Bug } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = { role: "user" | "assistant"; content: string };

const suggestedQuestions = [
  { icon: Sprout, text: "Best crop for black soil in Maharashtra?" },
  { icon: Landmark, text: "Which government schemes am I eligible for?" },
  { icon: Bug, text: "How to treat leaf blight in rice?" },
];

const mockResponses: Record<string, string> = {
  default: "I can help you with crop recommendations, disease management, government schemes, and weather advisories. What would you like to know?",
  crop: "Based on your profile (Black soil, Pune, Maharashtra, 5 acres), I recommend:\n\n🌾 **Rice** — Best for Kharif season with your soil type. Expected yield: 4.5 tons/ha.\n\n🌾 **Wheat** — Great for Rabi season. Apply NPK 120:60:40 fertilizer.\n\n💡 **Tip:** Get your soil tested through the Soil Health Card Scheme for precise recommendations.",
  scheme: "Based on your profile, you're eligible for:\n\n1. 🛡️ **PMFBY** — Crop insurance at just 2% premium for Kharif crops\n2. 💳 **Kisan Credit Card** — Get up to ₹3 lakhs at 4% interest\n3. 💧 **PMKSY** — 55% subsidy on drip irrigation systems\n4. 🧪 **Soil Health Card** — Free soil testing & nutrient recommendations\n\nWould you like details on any specific scheme?",
  disease: "For **Leaf Blight in Rice**, here's what you should do:\n\n1. 💊 Apply **Streptocycline @ 0.5g/L** mixed with Copper oxychloride\n2. 🌊 **Drain excess water** from the field immediately\n3. 🧪 Apply **potash fertilizer** to strengthen resistance\n4. 🌱 For next season, use resistant varieties like **IR64**\n\n⚠️ Severity is typically high — don't delay treatment. You can also claim compensation under PMFBY.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("crop") || lower.includes("soil") || lower.includes("best")) return mockResponses.crop;
  if (lower.includes("scheme") || lower.includes("eligible") || lower.includes("government")) return mockResponses.scheme;
  if (lower.includes("disease") || lower.includes("blight") || lower.includes("treat")) return mockResponses.disease;
  return mockResponses.default;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your Digital Farming Assistant 🌱\n\nI can help you with crop recommendations, disease management, government schemes, and weather advisories. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(msg) }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2"><MessageCircle className="h-6 w-6 text-primary" /> AI Farming Assistant</h1>
          <p className="text-muted-foreground">Ask any farming question and get instant expert advice.</p>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-card rounded-2xl border border-border p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${
                msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
              }`}>
                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-md"
                  : "bg-muted rounded-tl-md"
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-md p-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {suggestedQuestions.map((q) => (
              <button
                key={q.text}
                onClick={() => handleSend(q.text)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <q.icon className="h-4 w-4" /> {q.text}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2 mt-3"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about crops, diseases, schemes..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!input.trim() || isTyping} className="bg-gradient-hero text-primary-foreground px-4">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}
