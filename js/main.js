document.addEventListener('DOMContentLoaded', () => {
    initProductFilter();
    initContactForm();
});

/**
 * 1. Logic lọc sản phẩm tĩnh cho trang products.html
 */
function initProductFilter() {
    const categorySelect = document.getElementById('category-select');
    const priceSelect = document.getElementById('price-select');
    const filterBtn = document.querySelector('.filter-sidebar button');
    const productCards = document.querySelectorAll('.product-grid .product-card');

    if (!filterBtn || productCards.length === 0) return;

    filterBtn.addEventListener('click', () => {
        const selectedCategory = categorySelect ? categorySelect.value : 'all';
        const selectedPrice = priceSelect ? priceSelect.value : 'all';

        productCards.forEach(card => {
            // Lấy thông tin tiêu đề và giá sản phẩm
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const priceText = card.querySelector('.price')?.textContent || '0';
            const priceValue = parseInt(priceText.replace(/\D/g, ''), 10) || 0;

            let matchesCategory = false;
            let matchesPrice = false;

            // 1. Kiểm tra danh mục theo dữ liệu sản phẩm thực tế
            if (selectedCategory === 'all') {
                matchesCategory = true;
            } else if (selectedCategory === 'coffee' && title.includes('cà phê')) {
                matchesCategory = true;
            } else if (selectedCategory === 'nuts' && (title.includes('mắc ca') || title.includes('macca') || title.includes('bơ'))) {
                matchesCategory = true;
            } else if (selectedCategory === 'spices' && (title.includes('tiêu') || title.includes('mật ong'))) {
                matchesCategory = true;
            }

            // 2. Kiểm tra khoảng giá
            if (selectedPrice === 'all') {
                matchesPrice = true;
            } else if (selectedPrice === 'under-150' && priceValue < 150000) {
                matchesPrice = true;
            } else if (selectedPrice === '150-300' && priceValue >= 150000 && priceValue <= 300000) {
                matchesPrice = true;
            }

            // Hiển thị hoặc ẩn thẻ sản phẩm
            if (matchesCategory && matchesPrice) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/**
 * 2. Xử lý phản hồi giả lập khi gửi form liên hệ (contact.html)
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Ngăn trang reload

        const fullname = document.getElementById('fullname')?.value;

        // Thông báo gửi thành công
        alert(`Cảm ơn bạn ${fullname}! Yêu cầu tư vấn/đặt hàng đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm nhất.`);

        // Reset form
        contactForm.reset();
    });
}