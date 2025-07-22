"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(`회원가입 실패: ${error.message}`);
    } else {
      setMessage("회원가입 성공! 이메일을 확인하세요.");
    }
    setLoading(false);
  };

  return (
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f7f7fa" }}>
      <div style={{ background: "#fff", padding: 36, borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", minWidth: 340, textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, color: "#222" }}>회원가입</h2>
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              border: "1.5px solid #d1d5db",
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s"
            }}
            onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
            onBlur={e => e.target.style.border = '1.5px solid #d1d5db'}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: 8,
              border: "1.5px solid #d1d5db",
              fontSize: 16,
              outline: "none",
              transition: "border 0.2s"
            }}
            onFocus={e => e.target.style.border = '1.5px solid #6366f1'}
            onBlur={e => e.target.style.border = '1.5px solid #d1d5db'}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#a5b4fc" : "#6366f1",
              color: "#fff",
              padding: "12px 0",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s"
            }}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>
        {message && <p style={{ marginTop: 18, color: message.includes('성공') ? '#22c55e' : '#ef4444', fontWeight: 500 }}>{message}</p>}
        <p style={{ marginTop: 24, fontSize: 15 }}>
          이미 계정이 있으신가요? <a href="/login" style={{ color: "#6366f1", textDecoration: "underline" }}>로그인</a>
        </p>
      </div>
    </main>
  );
} 