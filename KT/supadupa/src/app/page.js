import Image from "next/image"; 

export default function Home() {
  return (
    <main style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", background: "#f7f7fa"
    }}>
      <div style={{
        background: "#fff", padding: 40, borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)", minWidth: 320, textAlign: "center"
      }}>
        <h1 style={{
          fontSize: 32, fontWeight: 700, marginBottom: 24, color: "#222"
        }}>환영합니다!</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <a href="/signup" className="main-btn main-btn--primary">회원가입</a>
          <a href="/login" className="main-btn main-btn--secondary">로그인</a>
        </div>
      </div>
    </main>
  );
}
