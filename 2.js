const container = document.getElementById('container');
const startButton = document.getElementById('startButton');
const header = document.getElementById('header');
let intervalId = null;

function createMessage() {
    const message = document.createElement('div');
    message.classList.add('message');

    // Thêm nội dung "Anh nhớ em" vào thẻ span
    const text = document.createElement('span');
    text.textContent = 'Anh nhớ em';
    message.appendChild(text);

    // Vị trí ngẫu nhiên trên màn hình
    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 120);
    message.style.left = `${randomX}px`;
    message.style.top = `${randomY}px`;

    container.appendChild(message);

    // Xóa phần tử sau khi animation kết thúc
    message.addEventListener('animationend', () => {
        message.remove();
    });
}

startButton.addEventListener('click', () => {
    // Ẩn nút và tiêu đề sau khi bấm
    startButton.style.display = 'none';
    header.style.opacity = '0'; // Mờ dần
    setTimeout(() => {
        header.style.display = 'none'; // Ẩn hoàn toàn sau khi mờ
    }, 500); // Đồng bộ với thời gian transition

    // Bắt đầu tạo thông điệp liên tục
    if (!intervalId) {
        intervalId = setInterval(createMessage, 300); // Tạo mới mỗi 300ms
    }
});

window.addEventListener('resize', () => {
    const messages = document.querySelectorAll('.message');
    messages.forEach(message => {
        const messageWidth = parseInt(getComputedStyle(message).width);
        const messageHeight = parseInt(getComputedStyle(message).height);
        const currentX = parseFloat(message.style.left);
        const currentY = parseFloat(message.style.top);

        // Giới hạn vị trí khi thay đổi kích thước
        if (currentX + messageWidth > window.innerWidth) {
            message.style.left = `${window.innerWidth - messageWidth}px`;
        }
        if (currentY + messageHeight > window.innerHeight) {
            message.style.top = `${window.innerHeight - messageHeight}px`;
        }
    });
});