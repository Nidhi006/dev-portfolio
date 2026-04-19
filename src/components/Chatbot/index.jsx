import { useState, useRef, useEffect } from "react";
import { SKILLS_DATA, EXPERIENCE_DATA, PROJECTS_DATA, CERTS_DATA } from "../../data/portfolioData";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

function buildSystemPrompt() {
  const skills = Object.values(SKILLS_DATA).map(cat =>
    `${cat.name}: ${cat.skills.map(s => `${s.name} (${s.level}/5)`).join(", ")}`
  ).join("\n");
  const experience = EXPERIENCE_DATA.map(e =>
    `${e.role} at ${e.company} (${e.period}) — ${e.highlights.join("; ")}`
  ).join("\n");
  const projects = PROJECTS_DATA.filter(p => p.status !== "Coming Soon").map(p =>
    `${p.name}${p.org ? ` (${p.org})` : ""}: ${p.desc} [${p.tech.join(", ")}]`
  ).join("\n");
  const certs = CERTS_DATA.map(c => `${c.name} — ${c.org}`).join(", ");

  return `You are an RPG-style NPC guide in Nidhi Agarwal's developer portfolio. Answer questions about Nidhi in a friendly, slightly RPG-themed tone. Keep answers concise (2-4 sentences). Use the following info:

NAME: Nidhi Agarwal
TITLE: Full Stack Software Engineer (~4 years experience)
LOCATION: India (Remote)

SKILLS:
${skills}

EXPERIENCE:
${experience}

PROJECTS:
${projects}

CERTIFICATIONS: ${certs}

EDUCATION: BCA — CGPA 9.11/10, University of Madras

If asked something not related to Nidhi or her portfolio, politely redirect to portfolio-related topics. Do NOT invent information not listed above.`;
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Greetings, traveler! 🧙‍♀️ I'm Nidhi's quest guide. Ask me anything about her skills, experience, or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("API key not configured");

      const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: buildSystemPrompt() }] },
          contents: [{ parts: [{ text }] }],
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
        }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "The crystal ball is cloudy... try again!";
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
        console.error("Chatbot error:", err);
      setMessages(prev => [...prev, { role: "bot", text: "⚠️ The magical connection failed. Please try again later!" }]);
    } finally {
      setLoading(false);
    }
  };

  const panel = {
    position: "fixed", bottom: 80, right: 16, width: 340, maxWidth: "calc(100vw - 32px)",
    height: 420, maxHeight: "60vh", background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
    borderRadius: 16, border: "2px solid rgba(108,99,255,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    display: "flex", flexDirection: "column", zIndex: 9999, fontFamily: "'Nunito',sans-serif",
    animation: "fadeInQuick 0.3s ease",
  };

  const msgStyle = (isUser) => ({
    alignSelf: isUser ? "flex-end" : "flex-start",
    background: isUser ? "linear-gradient(135deg,#6C63FF,#9B8FFF)" : "rgba(255,255,255,0.08)",
    color: isUser ? "#fff" : "#e0e0e0", borderRadius: 12, padding: "8px 12px",
    maxWidth: "80%", fontSize: 13, lineHeight: 1.5, wordBreak: "break-word",
    border: isUser ? "none" : "1px solid rgba(255,255,255,0.06)",
  });

  return (
    <>
      {open && (
        <div style={panel}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Silkscreen',cursive", fontSize: 12, color: "#9B8FFF" }}>🧙‍♀️ Quest Guide</span>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#888", fontSize: 18, cursor: "pointer", padding: 4 }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {messages.map((m, i) => (
              <div key={i} style={msgStyle(m.role === "user")}>{m.text}</div>
            ))}
            {loading && <div style={{ ...msgStyle(false), fontStyle: "italic", opacity: 0.6 }}>Consulting the ancient scrolls...</div>}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: 10, borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about Nidhi..."
              style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, outline: "none", fontFamily: "'Nunito',sans-serif" }}
            />
            <button onClick={sendMessage} disabled={loading} style={{ background: "linear-gradient(135deg,#6C63FF,#9B8FFF)", border: "none", borderRadius: 8, padding: "8px 14px", color: "#fff", cursor: loading ? "wait" : "pointer", fontFamily: "'Silkscreen',cursive", fontSize: 11 }}>Send</button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 16, right: 16, zIndex: 9999, width: 52, height: 52,
          borderRadius: "50%", border: "2px solid rgba(108,99,255,0.4)",
          background: "linear-gradient(135deg,#6C63FF,#9B8FFF)", color: "#fff",
          fontSize: 24, cursor: "pointer", boxShadow: "0 4px 20px rgba(108,99,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s", animation: "bob 2.5s ease-in-out infinite",
        }}
        onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.target.style.transform = "scale(1)"}
        aria-label="Chat with AI guide"
      >
        {open ? "✕" : "🧙"}
      </button>
    </>
  );
}