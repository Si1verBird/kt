import Image from "next/image";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const AppleLogo = ({style, width=24, height=24, alt="Apple Logo"}) => (
  <Image src="/Apple_logo_black.svg" alt={alt} width={width} height={height} style={style} />
);

export default function Home() {
  return (
    <div>
      {/* Navigation Bar */}
      <Navigation />

      {/* iPhone Section */}
      <section className="hero-section" style={{background: '#f5f5f7'}}>
        <div className="container">
          <h1 className="hero-title">iPhone</h1>
          <p className="hero-subtitle">iPhone 16 라인업을 만나볼까요?</p>
          <div className="cta-buttons">
            <a href="#" className="cta-link">더 알아보기</a>
            <a href="#" className="cta-link secondary">구입하기</a>
          </div>
          <div style={{marginTop: '10px'}}>
            <p className="gradient-text" style={{fontSize: '19px'}}>Apple Intelligence를 위한 탄생.</p>
            <p style={{color: '#86868b', fontSize: '17px', marginTop: '10px'}}>Apple Intelligence, 현재 한국어로 서비스중</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
            <Image 
              src="/iphone1.jpg" 
              alt="iPhone 16 시리즈" 
              width={900}
              height={600}
              style={{
                maxWidth: '900px',
                width: '100%',
                height: 'auto',
                borderRadius: '20px'
              }}
            />
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <div style={{width: '100%', height: '10pt', background: '#fff', margin: '0 auto'}}></div>

      {/* Apple Pay Section */}
      <section className="hero-section" style={{background: '#f5f5f7', color: '#1d1d1f', padding: '80px 0', marginBottom: '0'}}>
        <div className="container" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '1 0 auto'}}>
            <h2 style={{fontSize: '48px', fontWeight: '700', color: '#1d1d1f', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center'}}>
              <AppleLogo width={32} height={32} alt="Apple Logo" style={{verticalAlign: 'middle'}} /> Pay
            </h2>
            <p style={{fontSize: '28px', color: '#1d1d1f', marginBottom: '30px', textAlign: 'center'}}>이제 교통카드 도착.</p>
            <div className="cta-buttons" style={{justifyContent: 'center'}}>
              <a href="#" className="cta-link">더 알아보기</a>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '0'}}>
            <Image 
              src="/iphone2.jpg" 
              alt="Apple Intelligence iPhone" 
              width={600}
              height={750}
              style={{
                maxWidth: '100%',
                width: '600px',
                height: 'auto',
                borderRadius: '40px',
                marginBottom: 0
              }}
            />
          </div>
        </div>
      </section>

      {/* 구분선 */}
      <div style={{width: '100%', height: '10pt', background: '#f5f5f7', margin: '0 auto'}}></div>


      {/* MacBook Air Section */}
      <section className="hero-section light-blue-bg" style={{background: '#f0f8ff', padding: '80px 0'}}>
        <div className="container">
          <h2 className="hero-title">MacBook Air</h2>
          <p className="hero-subtitle">놀라울 정도로 얇다.</p>
          <p className="hero-subtitle">믿을 수 없을 만큼 빠르다.</p>
          <div className="cta-buttons">
            <a href="#" className="cta-link">더 알아보기</a>
            <a href="#" className="cta-link secondary">구입하기</a>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
          <Image
              src="/macbook-air.jpeg" 
              alt="MacBook Air" 
              width={600}
              height={400}
              style={{
                maxWidth: '600px',
                width: '100%',
                height: 'auto',
                borderRadius: '20px'
              }}
            />
          </div>
          <div style={{marginTop: '30px'}}>
            <p style={{color: '#06c', fontSize: '19px'}}>Apple Intelligence를 활용한 온기 기능도 곧 만나보세요.*</p>
            <p style={{color: '#86868b', fontSize: '17px', marginTop: '10px'}}>M3 및 M2 칩 탑재 MacBook Air에서 지원</p>
          </div>
        </div>
      </section>

      {/* iPad Pro & iPad Air Split Section */}
      <div className="split-section">
        {/* iPad Pro */}
        <div className="dark-bg">
          <div className="section-content">
            <h2 className="section-title">iPad Pro</h2>
            <p className="section-subtitle">얇다는게 이런걸까.</p>
            <div className="cta-buttons">
              <a href="#" className="cta-link white">더 알아보기</a>
              <a href="#" className="cta-link white secondary">구입하기</a>
            </div>
            <div style={{marginTop: '40px'}}>
              <div style={{
                width: '250px',
                height: '300px',
                background: 'linear-gradient(45deg, #2a2a2a, #1a1a1a)',
                borderRadius: '20px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  background: '#333',
                  borderRadius: '15px'
                }}></div>
              </div>
            </div>
            <p style={{color: '#06c', fontSize: '17px', marginTop: '20px'}}>Apple Intelligence를 활용한 온기 기능도 곧 만나보세요.*</p>
          </div>
        </div>

        {/* iPad Air */}
        <div style={{background: 'linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)'}}>
          <div className="section-content">
            <h2 className="section-title">iPad</h2>
            <h3 style={{fontSize: '32px', fontWeight: '400', color: '#007aff', marginBottom: '20px'}}>Air</h3>
            <p className="section-subtitle">두 가지 크기로 만나는 놀라운 휴대성.</p>
            <div className="cta-buttons">
              <a href="#" className="cta-link">더 알아보기</a>
              <a href="#" className="cta-link secondary">구입하기</a>
            </div>
            <div style={{marginTop: '40px'}}>
              <div style={{
                width: '250px',
                height: '300px',
                background: 'linear-gradient(45deg, #e6f3ff, #ffffff)',
                borderRadius: '20px',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  right: '20px',
                  bottom: '20px',
                  background: '#f0f8ff',
                  borderRadius: '15px'
                }}></div>
              </div>
            </div>
            <p style={{color: '#06c', fontSize: '17px', marginTop: '20px'}}>Apple Intelligence를 활용한 온기 기능도 곧 만나보세요.*</p>
          </div>
        </div>
      </div>

      {/* Apple Watch & MacBook Pro Split Section */}
      <div className="split-section">
        {/* Apple Watch */}
        <div style={{background: '#f5f5f7'}}>
          <div className="section-content">
            <h2 className="section-title" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <AppleLogo width={28} height={28} alt="Apple Logo" style={{verticalAlign: 'middle'}} /> WATCH
            </h2>
            <h3 style={{fontSize: '32px', fontWeight: '400', color: '#ff3b30', marginBottom: '20px'}}>SERIES 10</h3>
            <p className="section-subtitle">더 큰 생각을 담는다.</p>
            <div className="cta-buttons">
              <a href="#" className="cta-link">더 알아보기</a>
              <a href="#" className="cta-link secondary">구입하기</a>
            </div>
            <div style={{marginTop: '40px'}}>
              <div style={{
                width: '150px',
                height: '150px',
                background: '#000',
                borderRadius: '35px',
                position: 'relative',
                margin: '0 auto'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  right: '15px',
                  bottom: '15px',
                  background: '#1a1a1a',
                  borderRadius: '25px'
                }}></div>
                <div style={{
                  position: 'absolute',
                  top: '5px',
                  right: '-5px',
                  width: '8px',
                  height: '30px',
                  background: '#ff6b35',
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* MacBook Pro */}
        <div className="dark-bg">
          <div className="section-content">
            <h2 className="section-title">MacBook Pro</h2>
            <p className="section-subtitle">초강력 성능 M4 칩.</p>
            <div className="cta-buttons">
              <a href="#" className="cta-link white">더 알아보기</a>
              <a href="#" className="cta-link white secondary">구입하기</a>
            </div>
            <div style={{marginTop: '40px'}}>
              <div style={{
                width: '300px',
                height: '200px',
                background: 'linear-gradient(45deg, #2a2a2a, #1a1a1a)',
                borderRadius: '10px',
                position: 'relative',
                transform: 'perspective(1000px) rotateX(15deg)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  right: '15px',
                  height: '130px',
                  background: '#000',
                  borderRadius: '8px'
                }}></div>
              </div>
            </div>
            <p style={{color: '#06c', fontSize: '17px', marginTop: '20px'}}>Apple Intelligence를 활용한 온기 기능도 곧 만나보세요.*</p>
          </div>
        </div>
      </div>

      {/* AirPods 4 & Trade In Split Section */}
      <div className="split-section">
        {/* AirPods 4 */}
        <div style={{background: 'linear-gradient(135deg, #a6c1ee 0%, #fbc2eb 100%)'}}>
          <div className="section-content">
            <h2 className="section-title">AirPods 4</h2>
            <p className="section-subtitle">아이코닉 디자인이 다시 태어났다.</p>
            <div className="cta-buttons">
              <a href="#" className="cta-link">더 알아보기</a>
              <a href="#" className="cta-link secondary">구입하기</a>
            </div>
            <div style={{marginTop: '40px'}}>
              <div style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
                <div style={{
                  width: '60px',
                  height: '80px',
                  background: '#fff',
                  borderRadius: '30px 30px 8px 8px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '15px',
                    background: '#333',
                    borderRadius: '4px'
                  }}></div>
                </div>
                <div style={{
                  width: '60px',
                  height: '80px',
                  background: '#fff',
                  borderRadius: '30px 30px 8px 8px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '8px',
                    height: '15px',
                    background: '#333',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trade In */}
        <div style={{background: '#f5f5f7'}}>
          <div className="section-content">
            <h2 className="section-title" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <AppleLogo width={28} height={28} alt="Apple Logo" style={{verticalAlign: 'middle'}} /> Trade In
            </h2>
            <p className="section-subtitle">iPhone 12 이상의 부 특물 보상하실 수 있어요.</p>
            <p className="section-description">보상 판매를 주지 최대 ￦1,000,000</p>
            <div className="cta-buttons">
              <a href="#" className="cta-link">더 알아보기</a>
            </div>
            <div style={{marginTop: '40px'}}>
              <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                <div style={{
                  width: '80px',
                  height: '120px',
                  background: 'linear-gradient(45deg, #4a90e2, #7bb3f0)',
                  borderRadius: '15px'
                }}></div>
                <div style={{
                  width: '80px',
                  height: '120px',
                  background: 'linear-gradient(45deg, #d4af37, #ffd700)',
                  borderRadius: '15px'
                }}></div>
                <div style={{
                  width: '80px',
                  height: '120px',
                  background: 'linear-gradient(45deg, #2a2a2a, #1a1a1a)',
                  borderRadius: '15px'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apple TV+ Section */}
      <section className="hero-section" style={{background: '#000', color: '#f5f5f7', padding: '80px 0'}}>
        <div className="container">
          <h2 style={{fontSize: '48px', fontWeight: '700', color: '#f5f5f7', marginBottom: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
            <AppleLogo width={36} height={36} alt="Apple Logo" style={{verticalAlign: 'middle'}} /> TV+
          </h2>
          <div className="apple-tv-grid">
            <div className="tv-show-item" style={{background: 'linear-gradient(45deg, #8B4513, #A0522D)'}}>
              <div className="tv-show-overlay">
                <div className="tv-show-title">기밀작전: 비스트</div>
                <div className="tv-show-subtitle">지금 시청하기</div>
              </div>
            </div>
            <div className="tv-show-item" style={{background: 'linear-gradient(45deg, #2C3E50, #34495E)'}}>
              <div className="tv-show-overlay">
                <div className="tv-show-title">THE EDGE</div>
                <div className="tv-show-subtitle">지금 시청하기</div>
              </div>
            </div>
            <div className="tv-show-item" style={{background: 'linear-gradient(45deg, #1a1a1a, #333)'}}>
              <div className="tv-show-overlay">
                <div className="tv-show-title">애크샤 온 더 비치</div>
                <div className="tv-show-subtitle">지금 시청하기</div>
              </div>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: '40px'}}>
            <div className="cta-buttons">
              <a href="#" className="cta-link white">스트리밍하기</a>
              <a href="#" className="cta-link white secondary">최신 정보 받기</a>
            </div>
            <p style={{color: '#86868b', fontSize: '17px', marginTop: '20px'}}>
              iPhone 구매 시 3개월, Apple TV 4K 구매 시 6개월 무료이용.*
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
