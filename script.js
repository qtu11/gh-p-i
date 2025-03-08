// Hiệu ứng cho trang chủ và các phần tử khác
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hiệu ứng cho section .hero khi hover
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mouseover', () => {
            hero.style.background = 'rgba(255, 255, 255, 0.1)';
            hero.style.transition = 'background 0.3s ease';
        });
        hero.addEventListener('mouseout', () => {
            hero.style.background = 'transparent';
        });

        // Hiệu ứng ánh sáng di theo chuột trong .hero
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.background = `radial-gradient(circle 100px at ${x}px ${y}px, rgba(255, 111, 97, 0.3), transparent)`;
        });
    }

    // 2. Hiệu ứng cho .member-card
    const memberCards = document.querySelectorAll('.member-card');
    if (memberCards.length > 0) {
        // Hiệu ứng cuộn: Fade In từ bên trái/phải
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const isLeft = entry.target.offsetLeft < window.innerWidth / 2;
                    entry.target.style.animation = isLeft 
                        ? `fadeInLeft 1s ease-out` 
                        : `fadeInRight 1s ease-out`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        memberCards.forEach(card => {
            observer.observe(card);

            // Hiệu ứng khi chuột lại gần: phóng to và rung
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const distance = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
                
                if (distance < 150) { // Chuột trong phạm vi 150px
                    card.style.transform = 'scale(1.05) rotate(1deg)';
                    card.style.animation = 'shake 0.5s infinite';
                    createRippleEffect(card, e.clientX - rect.left, e.clientY - rect.top);
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1) rotate(0deg)';
                card.style.animation = '';
            });
        });

        // Hiệu ứng avatar khi hover
        const avatars = document.querySelectorAll('.avatar-circle');
        avatars.forEach(avatar => {
            avatar.addEventListener('mouseover', () => {
                const randomAngle = Math.random() * 10 - 5;
                avatar.style.transform = `rotate(${randomAngle}deg) scale(1.1)`;
                avatar.querySelector('img').style.filter = `brightness(${110 + Math.random() * 10}%) sepia(${Math.random() * 15}%)`;
                createHeartEffect(avatar);
            });
            avatar.addEventListener('mouseout', () => {
                avatar.style.transform = 'rotate(0deg) scale(1)';
                avatar.querySelector('img').style.filter = 'brightness(100%) sepia(0%)';
            });
        });
    }

    // 3. Hiệu ứng cho .team-table và .assignment-table khi cuộn
    const tables = document.querySelectorAll('.team-table, .assignment-table');
    tables.forEach(table => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'spinIn 1s ease-out';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(table);
    });

    // 4. Hiệu ứng nút khi chuột lại gần
    const buttons = document.querySelectorAll('.explore-button, .match-button, .detail-button');
    buttons.forEach(button => {
        button.classList.add('glow');
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const distance = Math.sqrt((e.clientX - (rect.left + rect.width / 2)) ** 2 + (e.clientY - (rect.top + rect.height / 2)) ** 2);
            if (distance < 100) {
                button.style.transform = 'scale(1.1)';
                button.style.animation = 'pulseGlow 0.8s infinite';
            }
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.animation = '';
        });
    });

    // 5. Hiệu ứng trái tim rơi ngẫu nhiên
    function createFallingHearts() {
        const heart = document.createElement('div');
        heart.classList.add('heart-falling');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.background = `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.8)`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
    setInterval(createFallingHearts, 800);

    // Hàm tạo sóng lan tỏa
    function createRippleEffect(element, x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }

    // Hàm tạo trái tim quanh avatar
    function createHeartEffect(element) {
        for (let i = 0; i < 7; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.style.left = Math.random() * 120 + 'px';
            heart.style.animationDelay = Math.random() * 0.7 + 's';
            heart.style.background = `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 0.8)`;
            element.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
        }
    }
});

// Danh sách Facebook URL cho từng thành viên
const memberFacebookLinks = {
    'Nguyễn Quang Tú': 'https://www.facebook.com/tu.quangg.195068',
    'Nguyễn Văn Tùng': 'https://www.facebook.com/nguyen.tung.016',
    'Phạm Ngọc Trúc My': 'https://www.facebook.com/liberosis.292',
    'Nguyễn Võ Hồng Thi': 'https://www.facebook.com/hong.thi.221903',
    'Ngô Phan Thái Bình': 'https://www.facebook.com/thaibinh.ngo.395017',
    'Bùi Chí Dũng': 'https://www.facebook.com/chidung.bui.50767',
    'Nguyễn Quang Tuấn': 'https://www.facebook.com/your.username.tuan',
    'Huỳnh Long Nhật': 'https://www.facebook.com/nhat.huynh.221425',
    'Nguyễn Hữu Khanh': 'https://www.facebook.com/khanh.nguyen.908386',
    'Phùng Gia Khánh': 'https://www.facebook.com/Yuki.Hide.0511'
};

// Các hàm hiển thị nội dung
function showPage(pageId) {
    const pages = document.querySelectorAll('#content section');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function showMemberDetail(name, avatarSrc, age, birthday, advantages, disadvantages) {
    document.getElementById('detail-name').textContent = name;
    document.getElementById('detail-avatar').src = avatarSrc;
    document.getElementById('detail-age').textContent = age;
    document.getElementById('detail-birthday').textContent = birthday;
    document.getElementById('detail-advantages').textContent = advantages;
    document.getElementById('detail-disadvantages').textContent = disadvantages;
    showPage('member-detail');
}

function showAssignmentDetail(name, role, avatarSrc) {
    const roleDescriptions = {
        'Lập trình Frontend': 'Phát triển giao diện web sử dụng HTML, CSS, JavaScript để tạo trải nghiệm người dùng mượt mà.',
        'Trưởng nhóm': 'Quản lý và điều phối công việc của nhóm, đảm bảo tiến độ và chất lượng dự án.',
        'Thiết kế giao diện (UI/UX Designer)': 'Thiết kế giao diện thân thiện, đẹp mắt và tối ưu trải nghiệm người dùng.',
        'Soạn nội dung': 'Viết và chỉnh sửa nội dung hấp dẫn, phù hợp với mục đích dự án.',
        'Kiểm thử (Tester)': 'Kiểm tra và đảm bảo website hoạt động ổn định, không có lỗi.',
        'Báo cáo và trình bày': 'Chuẩn bị tài liệu, slide trình bày và báo cáo tiến độ dự án.'
    };
    document.getElementById('assignment-name').textContent = name;
    document.getElementById('assignment-avatar').src = avatarSrc;
    document.getElementById('assignment-role').textContent = role;
    document.getElementById('assignment-description').textContent = roleDescriptions[role];
    showPage('assignment-detail');
}

function showAssignmentDetailOverview() {
    showPage('assignments');
}

// Hàm xử lý nút "Xét cặp hẹn hò ngay" để chuyển hướng đến Facebook
function matchNow() {
    const nameElement = document.getElementById('detail-name');
    if (nameElement) {
        const name = nameElement.textContent.trim();
        console.log('Tên thành viên:', name); // Debugging
        const facebookLink = memberFacebookLinks[name];
        console.log('Liên kết Facebook:', facebookLink); // Debugging
        if (facebookLink) {
            window.open(facebookLink, '_blank'); // Mở liên kết trong tab mới
        } else {
            alert(`Không tìm thấy liên kết Facebook cho ${name}!`);
        }
    } else {
        console.error('Không tìm thấy phần tử detail-name!');
        alert('Có lỗi xảy ra khi lấy thông tin thành viên!');
    }
}

// Thêm keyframes cho các hiệu ứng mới
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInLeft {
        0% { opacity: 0; transform: translateX(-50px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeInRight {
        0% { opacity: 0; transform: translateX(50px); }
        100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes spinIn {
        0% { opacity: 0; transform: rotate(-15deg) scale(0.8); }
        100% { opacity: 1; transform: rotate(0deg) scale(1); }
    }
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-2px); }
        50% { transform: translateX(2px); }
        75% { transform: translateX(-2px); }
        100% { transform: translateX(0); }
    }
    @keyframes pulseGlow {
        0% { box-shadow: 0 0 10px rgba(255, 63, 104, 0.3); }
        50% { box-shadow: 0 0 20px rgba(255, 63, 104, 0.8); }
        100% { box-shadow: 0 0 10px rgba(255, 63, 104, 0.3); }
    }
    @keyframes floatUp {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-50px) scale(0); opacity: 0; }
    }
    @keyframes fall {
        0% { top: -20px; opacity: 0; }
        20% { opacity: 1; }
        100% { top: 100vh; opacity: 0; }
    }
    .heart {
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        animation: floatUp 1.5s ease-out;
    }
    .heart-falling {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        animation: fall 5s linear;
    }
    .ripple {
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(255, 111, 97, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        animation: rippleExpand 1s ease-out;
    }
    @keyframes rippleExpand {
        0% { width: 20px; height: 20px; opacity: 1; }
        100% { width: 100px; height: 100px; opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// Khởi tạo trang mặc định khi tải
window.onload = () => showPage('home');