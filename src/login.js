document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // 폼의 기본 동작(페이지 리로드)을 막습니다.

    const formData = new FormData();
    formData.append('username', document.getElementById('username').value);
    formData.append('password', document.getElementById('password').value);

    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', formData, {
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