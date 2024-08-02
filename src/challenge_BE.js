// 사용자 챌린지 정보를 서버에서 가져오는 함수
async function getChallengeInfo(userId) {
    try {
        const response = await axios.get(`http://localhost:8080/api/challenge?userId=${userId}`, {
            withCredentials: true // 쿠키를 포함하여 요청
        });

        console.log('Response data:', response.data); // 응답 데이터 로깅
        displayUserInfo(response.data.user);
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류가 발생했습니다!', error);
        if (error.response) {
            console.error('Error response data:', error.response.data); // 오류 응답 데이터 로깅
        }
        alert('사용자 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요.');
    }
}

// 가져온 사용자 정보를 화면에 표시하는 함수
function displayUserInfo(user) {
    console.log('User data:', user); // 사용자 데이터 로깅

    const userNameElement = document.getElementById('userName');
    const userBirthdateElement = document.getElementById('userBirthdate');
    const userGenderElement = document.getElementById('userGender');
    const userCountElement = document.getElementById('userCount');
    const userAgeElement = document.getElementById('userAge'); 


    // 디버깅: 각 요소가 null인지 확인
    if (!userNameElement) {
        console.error('Element userName not found');
    }
    if (!userBirthdateElement) {
        console.error('Element userBirthdate not found');
    }
    if (!userGenderElement) {
        console.error('Element userGender not found');
    }
    if (!userCountElement) {
        console.error('Element userCount not found');
    }
    if (!userAgeElement) { 
        console.error('Element userAge not found');
    }

    if (!userNameElement || !userBirthdateElement || !userGenderElement || !userCountElement) {
        console.error('One or more elements are null:', {
            userNameElement,
            userBirthdateElement,
            userGenderElement,
            userCountElement,
            userAgeElement

        });
        return;
    }

    userNameElement.textContent = user.name;
    userBirthdateElement.textContent = `생년월일 : ${user.birthdate}`;
    userGenderElement.textContent = `성별 : ${user.gender}`;
    userCountElement.textContent = `챌린지 수 : ${user.count}`;
    userAgeElement.textContent = `나이 : ${calculateAge(user.birthdate)}`;

}

// DOM이 완전히 로드된 후에 자바스크립트 코드 실행
document.addEventListener('DOMContentLoaded', async function() {
    const userId = 1; // 예시로 userId 1을 사용합니다. 실제로는 로그인 정보 등에서 가져와야 합니다.
    await getChallengeInfo(userId);
});

// 나이 계산 함수
function calculateAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}