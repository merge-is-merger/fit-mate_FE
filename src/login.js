document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // 폼의 기본 동작(페이지 리로드)을 막습니다.

    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);

    try {
        const response = await axios.post('https://port-0-fitmate-lzfthvw51f8ed8b2.sel4.cloudtype.app/api/auth/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true // 쿠키를 포함하여 요청
        });

        console.log(response.data);
        alert('로그인에 성공했습니다.');
        
        // 서버로부터 사용자 ID를 응답 데이터에서 가져오기
        const userId = response.data.userId;
        // 사용자 ID를 세션 스토리지에 저장
        sessionStorage.setItem('userId', userId);

        // 로그인 후 리다이렉션
        window.location.href = 'index.html';
    } catch (error) {
        console.error('로그인 중 오류가 발생했습니다!', error);
        alert('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
});

// document.addEventListener('DOMContentLoaded', function() {
//     const challengeNavLink = document.querySelector('.nav-challenge');

//     function checkSessionAndRedirect(event) {
//         event.preventDefault(); // 기본 동작 방지
//         axios.get('https://port-0-fitmate-lzfthvw51f8ed8b2.sel4.cloudtype.app/api/auth/session/status', {
//             withCredentials: true
//         })
//         .then(response => {
//             console.log('Session status response:', response); // 응답 로그 출력
//             if (response.data === 'Logged in') {
//                 const userId = sessionStorage.getItem('userId');
//                 if (!userId) {
//                     alert('로그인이 필요합니다.');
//                     window.location.href = 'login.html';
//                 } else {
//                     setTimeout(() => {
//                         window.location.href = 'challenge.html';
//                     }, 100); // 100ms 지연 후 페이지 이동
//                 }
//             } else {
//                 window.location.href = 'login.html'; // 세션이 유효하지 않은 경우 로그인 페이지로 이동
//             }
//         })
//         .catch(error => {
//             console.error('세션 상태 확인 중 오류 발생:', error);
//             window.location.href = 'login.html'; // 오류 발생 시 로그인 페이지로 이동
//         });
//     }

//     if (challengeNavLink) {
//         challengeNavLink.addEventListener('click', checkSessionAndRedirect);
//     }

// });