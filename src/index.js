document.addEventListener('DOMContentLoaded', function() {
    const tryNowButtons = document.querySelectorAll('.TryNow, .TryNow2');
    const challengeNavLink = document.querySelector('.nav-challenge');

    function checkSessionAndRedirect(event) {
        event.preventDefault(); // 기본 동작 방지
        axios.get('https://port-0-fitmate-lzfthvw51f8ed8b2.sel4.cloudtype.app/api/auth/session/status', {
            withCredentials: true
        })
        .then(response => {
            console.log('Session status response:', response); // 응답 로그 출력
            if (response.data === 'Logged in') {
                const userId = sessionStorage.getItem('userId');
                if (!userId) {
                    alert('로그인이 필요합니다.');
                    window.location.href = 'login.html';
                } else {
                    window.location.href = 'challenge.html';
                }
            } else {
                window.location.href = 'login.html'; // 세션이 유효하지 않은 경우 로그인 페이지로 이동
            }
        })
        .catch(error => {
            console.error('세션 상태 확인 중 오류 발생:', error);
            window.location.href = 'login.html'; // 오류 발생 시 로그인 페이지로 이동
        });
    }

    tryNowButtons.forEach(button => {
        button.addEventListener('click', checkSessionAndRedirect);
    });

    if (challengeNavLink) {
        challengeNavLink.addEventListener('click', checkSessionAndRedirect);
    }

});
