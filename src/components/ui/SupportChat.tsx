import * as React from "react";
import { MessageSquare, X, Send, CornerDownLeft, Sparkles, Receipt, RefreshCw, HelpCircle } from "lucide-react";
import { storesData } from "../../data/stores";
import { Link } from "./Link";

export function SupportChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Array<{ sender: "assistant" | "user"; text: string; link?: string }>>([
    {
      sender: "assistant",
      text: "Hello! I am your Return Policy Assistant. Need quick answers about store return windows, receipt lookups, or refund methods? Ask me or select a popular store below!",
    },
  ]);
  const [input, setInput] = React.useState("");
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const newMsgs = [...messages, { sender: "user" as const, text: textToSend }];
    setMessages(newMsgs);
    setInput("");

    // Simulate response based on stores database
    setTimeout(() => {
      const query = textToSend.toLowerCase();
      
      // Look for a matching store
      const matchedStore = storesData.find(
        (s) =>
          query.includes(s.brand.toLowerCase()) ||
          s.brand.toLowerCase().includes(query) ||
          s.slug.replace("-", " ").includes(query)
      );

      if (matchedStore) {
        const answer = `Here is what I found for **${matchedStore.brand}**:\n\n` +
          `• **Return Window**: ${matchedStore.quickAnswer.returnWindow}\n` +
          `• **Receipt Required?**: ${matchedStore.quickAnswer.receiptRequired ? "Yes (or digital card lookup)" : "No (with photo ID lookup)"}\n` +
          `• **Refund Method**: ${matchedStore.quickAnswer.refundMethod}\n` +
          `• **Restocking Fee?**: ${matchedStore.quickAnswer.restockingFee ? "Yes, on some categories" : "No restocking fees!"}\n` +
          `• **In-Store Returns**: ${matchedStore.quickAnswer.inStoreReturns ? "Supported" : "Not supported"}\n\n` +
          `You can view the full deep-dive policy guidelines page below.`;

        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            text: answer,
            link: `/stores/${matchedStore.slug}`,
          },
        ]);
      } else if (query.includes("receipt") || query.includes("no receipt")) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            text: "Generally, stores like Target, Home Depot, and Best Buy can lookup your purchase using your credit/debit card. Walmart allows up to 3 unreceipted returns under $25 per 45 days with a valid state ID. Sephora allows Beauty Insider lookup. I recommend checking our guides for deeper 'no-receipt' hacks!",
            link: "/blog",
          },
        ]);
      } else if (query.includes("international") || query.includes("canada") || query.includes("uk") || query.includes("australia")) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            text: "Yes, we now cover international branches including Walmart Canada, Sephora Canada, Target Australia, and Amazon UK. Use the filters on our Stores page or our side-by-side comparison pages to view the critical regional differences!",
            link: "/stores",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "assistant",
            text: "I couldn't find a direct match. Try searching for a specific major store (e.g. 'Target', 'Walmart', 'Sephora', 'Nike UK', 'Amazon UK') or ask about 'no receipt' policies.",
          },
        ]);
      }
    }, 600);
  };

  const popularStores = [
    { name: "Target", slug: "target" },
    { name: "Walmart", slug: "walmart" },
    { name: "Walmart CA", slug: "walmart-ca" },
    { name: "Sephora", slug: "sephora" },
    { name: "Nike UK", slug: "nike-uk" },
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#2A6F77] text-white p-4 rounded-full shadow-lg hover:bg-[#1D4F55] transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer flex items-center justify-center gap-2"
        id="support-chat-trigger"
        aria-label="Open return policy assistant"
      >
        <MessageSquare className="h-6 w-6 group-hover:rotate-12 transition-transform duration-200" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-sm font-semibold whitespace-nowrap">
          Ask Assistant
        </span>
      </button>

      {/* Chat Window Drawer */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[380px] h-[500px] bg-white border border-[#D6DCEA] rounded-xl shadow-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
          id="support-chat-window"
        >
          {/* Header */}
          <div className="bg-[#14213D] text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#2A6F77] fill-[#2A6F77]" />
              <div>
                <h4 className="text-sm font-bold tracking-tight">Return Policy Assistant</h4>
                <p className="text-[10px] text-white/60 font-mono">Offline Real-Time Agent</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF8F3] text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[85%] ${
                  m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg leading-relaxed shadow-3xs border ${
                    m.sender === "user"
                      ? "bg-[#2A6F77] text-white border-[#1D4F55] rounded-br-none"
                      : "bg-white text-[#14213D] border-[#D6DCEA] rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-line text-xs md:text-sm">{m.text}</p>
                </div>
                {m.link && (
                  <Link
                    href={m.link}
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-[#2A6F77] font-semibold hover:underline mt-1 flex items-center gap-1"
                  >
                    View Guidelines Page &rarr;
                  </Link>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Shortcuts Suggestions */}
          <div className="px-4 py-2 bg-white border-t border-[#D6DCEA] flex flex-wrap gap-1.5 items-center">
            <span className="text-[10px] font-bold text-[#3D4E77]/60 uppercase tracking-wider mr-1">Quick Select:</span>
            {popularStores.map((ps) => (
              <button
                key={ps.slug}
                onClick={() => handleSend(`Return policy for ${ps.name}`)}
                className="text-[11px] font-medium bg-[#FAF8F3] hover:bg-[#DCEEEF] text-[#2A6F77] border border-[#D6DCEA] rounded px-2 py-0.5 transition-colors cursor-pointer"
              >
                {ps.name}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-white border-t border-[#D6DCEA] flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a store or receipt policy..."
              className="flex-1 text-xs md:text-sm border border-[#D6DCEA] rounded-lg px-3 py-2 bg-[#FAF8F3] focus:outline-none focus:ring-2 focus:ring-[#2A6F77] text-[#14213D]"
            />
            <button
              type="submit"
              className="bg-[#14213D] hover:bg-[#232F4E] text-white p-2 rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
