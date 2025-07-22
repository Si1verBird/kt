"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ username: "", intro: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMessage("로그인이 필요합니다.");
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) setProfile(data);
      if (error) setMessage("프로필을 불러오지 못했습니다.");
      setLoading(false);
    };
    getProfile();
  }, []);

  const handleUpdate = async () => {
    setMessage("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage("로그인이 필요합니다.");
      return;
    }
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      ...profile,
    });
    if (error) setMessage("저장 실패: " + error.message);
    else setMessage("저장 완료!");
  };

  return (
    <main style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", background: "#f7f7fa"
    }}>
      <div style={{
        background: "#fff", padding: 36, borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)", minWidth: 340, textAlign: "center"
      }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>프로필 편집</h1>
        <input
          className="border p-2 w-full mb-2"
          style={{
            padding: "12px 16px", borderRadius: 8, border: "1.5px solid #d1d5db",
            fontSize: 16, outline: "none", marginBottom: 12, width: "100%"
          }}
          value={profile.username}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          placeholder="닉네임"
        />
        <textarea
          className="border p-2 w-full"
          style={{
            padding: "12px 16px", borderRadius: 8, border: "1.5px solid #d1d5db",
            fontSize: 16, outline: "none", width: "100%", minHeight: 80
          }}
          value={profile.intro}
          onChange={(e) => setProfile({ ...profile, intro: e.target.value })}
          placeholder="자기소개"
        />
        <button
          onClick={handleUpdate}
          className="main-btn main-btn--primary"
          style={{ marginTop: 24, width: "100%" }}
          disabled={loading}
        >
          {loading ? "로딩 중..." : "저장하기"}
        </button>
        {message && (
          <p style={{ marginTop: 16, color: message.includes("완료") ? "#22c55e" : "#ef4444" }}>
            {message}
          </p>
        )}
      </div>
    </main>
  );
} 