import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <div className="nav-logo">
          <Image
            src="/Apple_logo_black.svg"
            alt="Apple Logo"
            width={20}
            height={24}
            priority
          />
        </div>
        <ul className="nav-links">
          <li><a href="#">스토어</a></li>
          <li><a href="#">Mac</a></li>
          <li><a href="#">iPad</a></li>
          <li><a href="#">iPhone</a></li>
          <li><a href="#">Watch</a></li>
          <li><a href="#">AirPods</a></li>
          <li><a href="#">TV 및 홈</a></li>
          <li><a href="#">엔터테인먼트</a></li>
          <li><a href="#">액세서리</a></li>
          <li><a href="#">고객지원</a></li>
        </ul>
        <div>🔍 🛒</div>
      </div>
    </nav>
  );
} 