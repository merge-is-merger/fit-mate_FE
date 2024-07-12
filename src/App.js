import React, { useEffect, useState } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const kakaoKey = '13f4b45375512b95b8368e23e04177d9'; // JavaScript 키

    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        try {
          window.Kakao.init(kakaoKey);
          console.log("Kakao SDK initialized:", window.Kakao.isInitialized()); // SDK 초기화 여부 확인
        } catch (error) {
          console.error("Kakao SDK initialization failed:", error);
        }
      } else {
        console.log("Kakao SDK already initialized.");
      }
    } else {
      console.error("Kakao SDK not loaded.");
    }
  }, []);

  const loginWithKakao = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.login({
        success: function(authObj) {
          console.log("Login success:", authObj); // 로그인 성공 시 받은 토큰 등 정보
          window.Kakao.API.request({
            url: '/v2/user/me',
            success: function(res) {
              console.log("User info:", res); // 사용자 정보
              const user_id = res.id;
              const access_token = authObj.access_token;
              setIsLoggedIn(true); // 로그인 성공시 상태 업데이트
              saveUserInfoToServer(user_id, access_token); // 로그인 후 서버에 사용자 정보 저장
            },
            fail: function(error) {
              console.error("User info request failed:", error);
            }
          });
        },
        fail: function(err) {
          console.error("Login failed:", err); // 로그인 실패 시 에러
        }
      });
    } else {
      console.error("Kakao SDK or Auth module not loaded.");
    }
  };

  function saveUserInfoToServer(user_id, access_token) {
    fetch('http://localhost:4000/saveUserInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, access_token }),
    })
    .then(res => res.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((err) => {
      console.error('Error:', err);
    });
  }

  const logoutWithKakao = () => {
    if (window.Kakao && window.Kakao.Auth && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(function() {
        console.log('로그아웃 되었습니다.');
        setIsLoggedIn(false); // 로그아웃 성공시 상태 업데이트
      });
    } else {
      console.error("Kakao SDK or Auth module not loaded, or not logged in.");
    }
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <h1>Kakao Login with React</h1>
        <button className="kakao-login-btn" onClick={loginWithKakao}>카카오 로그인</button>
        <button className="kakao-logout-btn" onClick={logoutWithKakao}>카카오 로그아웃</button>
        {isLoggedIn ? <h1>로그인 성공</h1> : <h1>로그아웃 성공</h1>}
      </div>
    </ErrorBoundary>
  );
}

export default App;
