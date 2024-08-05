document.getElementById('signup-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);
    formData.append('confirmPassword', document.getElementById('confirm-password').value);
    formData.append('gender', document.getElementById('gender').value);
    formData.append('nickname', document.getElementById('nickname').value);
    formData.append('birthdate', document.getElementById('birthdate').value);
    
// FormData 내용 확인
    for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }

    try {
        const response = await axios.post('https://port-0-fitmate-lzfthvw51f8ed8b2.sel4.cloudtype.app/api/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(response.data);
        alert('회원가입이 성공적으로 완료되었습니다.');
        window.location.href = 'index.html';    // 회원가입 완료 후 index.html로 이동
    } catch (error) {
        console.error('회원가입 중 오류가 발생했습니다!', error);
        alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
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