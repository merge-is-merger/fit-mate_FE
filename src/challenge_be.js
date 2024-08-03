document.addEventListener('DOMContentLoaded', function () {
    // 세션 스토리지에서 사용자 ID 가져오기
    const userId = sessionStorage.getItem('userId');
    
    if (userId) {
        fetchProgress(userId);
        document.getElementById('userId').value = userId; // 사용자 ID를 hidden input에 설정
    } else {
        alert('로그인이 필요합니다.');
        window.location.href = 'login.html';
    }

    function fetchProgress(userId) {
        axios.get(`http://localhost:8080/api/challenge?userId=${userId}`)
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

           axios.post('http://localhost:8080/api/challenge/upload', formData, { withCredentials: true })
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
