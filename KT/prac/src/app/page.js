'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ username: '', intro: '' });
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [authData, setAuthData] = useState({ email: '', password: '' });

  // 사용자 인증 상태 확인
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchProfile(user.id);
      }
      setLoading(false);
    };

    getUser();

    // 인증 상태 변화 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile({ username: '', intro: '' });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 프로필 조회
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116은 "no rows returned" 에러
        throw error;
      }
      
      if (data) {
        setProfile({ username: data.username || '', intro: data.intro || '' });
      }
    } catch (error) {
      console.error('프로필 조회 실패:', error.message);
    }
  };

  // 회원가입
  const signUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
      });
      if (error) throw error;
      alert('회원가입 성공! 이메일을 확인해주세요.');
    } catch (error) {
      alert('회원가입 실패: ' + error.message);
    }
  };

  // 로그인
  const signIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: authData.email,
        password: authData.password,
      });
      if (error) throw error;
      alert('로그인 성공!');
    } catch (error) {
      alert('로그인 실패: ' + error.message);
    }
  };

  // 로그아웃
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      alert('로그아웃되었습니다.');
    } catch (error) {
      alert('로그아웃 실패: ' + error.message);
    }
  };

  // 프로필 생성/수정
  const saveProfile = async () => {
    if (!profile.username || !profile.intro) {
      alert('닉네임과 자기소개를 모두 입력해주세요.');
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: profile.username,
          intro: profile.intro,
        });
      if (error) throw error;
      alert('프로필이 저장되었습니다!');
    } catch (error) {
      alert('프로필 저장 실패: ' + error.message);
    }
  };

  // 프로필 삭제
  const deleteProfile = async () => {
    if (!confirm('정말 프로필을 삭제하시겠습니까?')) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);
      if (error) throw error;
      
      setProfile({ username: '', intro: '' });
      alert('프로필이 삭제되었습니다!');
    } catch (error) {
      alert('프로필 삭제 실패: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  // 로그인하지 않은 경우
  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">프로필 관리</h1>
        
        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 px-4 rounded ${
                authMode === 'signin' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 px-4 rounded ${
                authMode === 'signup' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              회원가입
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={authData.email}
            onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
            placeholder="이메일을 입력하세요"
          />
          <input
            type="password"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={authData.password}
            onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
            placeholder="비밀번호를 입력하세요"
          />
          <button
            onClick={authMode === 'signin' ? signIn : signUp}
            className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {authMode === 'signin' ? '로그인' : '회원가입'}
          </button>
        </div>
      </div>
    );
  }

  // 로그인한 경우
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">프로필 관리</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{user.email}</span>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">내 프로필</h2>
        
        <div className="space-y-4">
          <input
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            placeholder="닉네임을 입력하세요"
          />
          <textarea
            className="w-full border border-gray-300 p-3 rounded h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={profile.intro}
            onChange={(e) => setProfile({ ...profile, intro: e.target.value })}
            placeholder="자기소개를 입력하세요"
          />
          
          <div className="flex gap-2">
            <button
              onClick={saveProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              프로필 저장
            </button>
            <button
              onClick={deleteProfile}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              프로필 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

