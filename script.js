/* ==========================================================================
   ✨ 終極修正：確保全站 HTML 元素完全加載完畢後，才啟動控制引擎
   ========================================================================== */
window.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       模組 A: 網頁主輪播圖控制 (Slider)
       ========================================================================== */
    const wrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slider-wrapper img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (wrapper && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        const updateSlider = () => {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }

    /* ==========================================================================
       模組 B: 橫向滾動圖片點擊放大與左右切換引擎 (Lightbox)
       ========================================================================== */
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const lbPrevBtn = document.querySelector('.lightbox-prev');
    const lbNextBtn = document.querySelector('.lightbox-next');

    if (lightbox && lightboxImg && closeBtn && lbPrevBtn && lbNextBtn) {
        // ✨ 在網頁完全加載後，精確抓取畫面上現有的 9 張圖片元件
        const allGalleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
        let currentLightboxIndex = 0;

        const updateLightboxImage = () => {
            const targetImg = allGalleryImgs[currentLightboxIndex];
            if (targetImg) {
                lightboxImg.src = targetImg.src;
                lightboxImg.alt = targetImg.alt;
            }
        };

        // 1. 監聽點擊動作
        allGalleryImgs.forEach((img, index) => {
            img.addEventListener('click', function (e) {
                e.preventDefault();
                currentLightboxIndex = index;
                lightbox.style.display = 'flex';
                updateLightboxImage();
            });
        });

        // 2. 右按鈕
        lbNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentLightboxIndex = (currentLightboxIndex + 1) % allGalleryImgs.length;
            updateLightboxImage();
        });

        // 3. 左按鈕
        lbPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentLightboxIndex = (currentLightboxIndex - 1 + allGalleryImgs.length) % allGalleryImgs.length;
            updateLightboxImage();
        });

        // 4. 關閉按鈕
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // 5. 背景關閉
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== lbPrevBtn && e.target !== lbNextBtn) {
                lightbox.style.display = 'none';
            }
        });

        // 6. 鍵盤控制
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowRight') {
                    currentLightboxIndex = (currentLightboxIndex + 1) % allGalleryImgs.length;
                    updateLightboxImage();
                } else if (e.key === 'ArrowLeft') {
                    currentLightboxIndex = (currentLightboxIndex - 1 + allGalleryImgs.length) % allGalleryImgs.length;
                    updateLightboxImage();
                } else if (e.key === 'Escape') {
                    lightbox.style.display = 'none';
                }
            }
        });
    }

}); // DOMContentLoaded 結束
