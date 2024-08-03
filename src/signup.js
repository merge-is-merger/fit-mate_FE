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
        const response = await axios.post('http://localhost:8080/api/auth/register', formData, {
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
