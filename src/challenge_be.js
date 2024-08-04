

document.addEventListener('DOMContentLoaded', async function () {
    // 세션 스토리지에서 사용자 ID 가져오기
    const userId = sessionStorage.getItem('userId') || 1; // 예시로 userId 1을 사용합니다. 실제로는 로그인 정보 등에서 가져와야 합니다.
    
    if (userId) {
        await fetchProgress(userId);
        document.getElementById('userId').value = userId; // 사용자 ID를 hidden input에 설정
        await getChallengeInfo(userId);
    } else {
        alert('로그인이 필요합니다.');
        window.location.href = 'login.html';
    }
  
    function updateProgressBar(percentage) {
  
        percentage = Math.max(0, Math.min(100, percentage));
  
      
        const containerWidth = document.querySelector('.Rectangle68').offsetWidth;
        const progressBarWidth = (containerWidth * percentage) / 100;
  
        const progressBar = document.querySelector('.Rectangle69');
        progressBar.style.width = progressBarWidth + 'px';
  
        const progressPercent = document.querySelector('.progress-percent');
        progressPercent.textContent = percentage + '%';
    }
  
      // LocalStorage에서 진행률 값을 가져옴
      const progressPercentage = localStorage.getItem('progressPercentage');
      if (progressPercentage !== null) {
          const dataValue = parseFloat(progressPercentage); // LocalStorage에서 가져온 값을 숫자로 변환
          updateProgressBar(dataValue);
      }


    // 사용자 챌린지 정보를 서버에서 가져오는 함수
    async function getChallengeInfo(userId) {
        try {
            const response = await axios.get(`http://13.209.134.32:8080/api/challenge?userId=${userId}`, {
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
        if (!userNameElement) console.error('Element userName not found');
        if (!userBirthdateElement) console.error('Element userBirthdate not found');
        if (!userGenderElement) console.error('Element userGender not found');
        if (!userCountElement) console.error('Element userCount not found');
        if (!userAgeElement) console.error('Element userAge not found');

        if (!userNameElement || !userBirthdateElement || !userGenderElement || !userCountElement || !userAgeElement) {
            console.error('One or more elements are null:', {
                userNameElement,
                userBirthdateElement,
                userGenderElement,
                userCountElement,
                userAgeElement
            });
            return;
        }

        userNameElement.textContent = user.nickname;
        userBirthdateElement.textContent = `생년월일 : ${user.birthdate}`;
        userGenderElement.textContent = `성별 : ${user.gender}`;
        userCountElement.textContent = `챌린지 수 : ${user.count}`;
        userAgeElement.textContent = `나이 : ${calculateAge(user.birthdate)}`;

        // 전체 카운트 수는 고정값으로 설정 (예: 100)
        const totalCount = 12;
        const userCount = parseInt(user.count, 10) || 0; // user.count를 정수로 변환, 유효하지 않으면 0으로 설정
        const percentage = Math.floor((userCount / totalCount) * 100);

        // 진행률을 localStorage에 저장
        localStorage.setItem('progressPercentage', percentage);
        updateProgressBar(percentage);
    }

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

    function fetchProgress(userId) {
        axios.get(`http://13.209.134.32:8080/api/challenge?userId=${userId}`)
            .then(response => {
                const count = response.data.user.count;
                updateCircles(count);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function updateCircles(count) {
        for (let i = 1; i <= count; i++) {
            const circle = document.getElementById(`circle-${Math.ceil(i / 3)}-${i % 3 === 0 ? 3 : i % 3}`);
            if (circle) {
                circle.classList.add('checked');
                // 해당 엘리먼트의 자식 중 stamp 클래스를 가진 요소를 찾아 표시합니다.
                const stamp = circle.querySelector('.stamp');
                if (stamp) {
                    stamp.style.display = 'block';
                }
            }
        }
    }

    // 인증사진 업로드 폼 제출
    const uploadForm = document.getElementById('upload-form');
    let currentChallengeId = null;

    // 챌린지 인증하기 버튼 클릭 이벤트
    const uploadButtons = document.querySelectorAll('.upload-button');
    uploadButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentChallengeId = this.getAttribute('data-challenge-id');
            document.getElementById('challengeId').value = currentChallengeId; // 챌린지 ID를 hidden input에 설정
            openModal();
        });
    });

    if (uploadForm) {
        uploadForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);

            axios.post('http://13.209.134.32:8080/api/challenge/upload', formData, { withCredentials: true })
                .then(response => {
                    if (response.data.status === 'success') {
                        fetchProgress(userId);
                        closeModal();
                    } else {
                        alert('업로드 실패!');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    } else {
        console.error('Form element not found');
    }
});
