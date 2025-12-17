// Hero Slider Functionality
class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.hero-slide');
        this.counterCurrent = document.querySelector('.slider-counter .current-slide');
        this.autoSlideInterval = null;
        this.slideInterval = 4000; // 4 saniye

        this.init();
    }

    init() {
        // Slider varsa başlat
        if (this.slides.length > 0) {
            this.setupEventListeners();
            this.startAutoSlide();
            this.updateCounter();
        }
    }

    updateCounter() {
        if (this.counterCurrent) {
            this.counterCurrent.textContent = this.currentSlide + 1;
        }
    }

    setupEventListeners() {
        // Ok butonlarına tıklama eventi
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.nextSlide();
            });
        }

        // Mouse hover durumunda otomatik geçişi durdur
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                this.stopAutoSlide();
            });

            heroSection.addEventListener('mouseleave', () => {
                this.startAutoSlide();
            });
        }

        // Touch events for mobile
        let startX = null;
        let startY = null;

        heroSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        heroSection.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            // Horizontal swipe detected
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.prevSlide();
                }
            }

            startX = null;
            startY = null;
        });
    }

    goToSlide(slideIndex) {
        // Aktif slide'ı kaldır
        this.slides[this.currentSlide].classList.remove('active');

        // Yeni slide'ı aktif yap
        this.currentSlide = slideIndex;
        this.slides[this.currentSlide].classList.add('active');
        
        // Sayacı güncelle
        this.updateCounter();

        // Auto slide'ı yeniden başlat
        this.restartAutoSlide();
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    restartAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Sayfa yüklendiğinde slider'ı başlat
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
    new ServicesSlider();
});

// Services Card Slider
class ServicesSlider {
    constructor() {
        this.track = document.querySelector('.services-track');
        this.cards = document.querySelectorAll('.services-track .service-card');
        this.prevBtn = document.querySelector('.services-prev');
        this.nextBtn = document.querySelector('.services-next');
        this.pagination = document.querySelector('.services-pagination');
        this.currentIndex = 0;
        this.dots = [];
        
        if (this.track && this.cards.length > 0) {
            this.init();
        }
    }

    init() {
        this.calculateVisibleCards();
        this.createDots();
        this.setupEventListeners();
        this.updateButtons();
        this.updateDots();
        
        // Resize event
        window.addEventListener('resize', () => {
            this.calculateVisibleCards();
            this.createDots();
            this.goToSlide(0);
        });
    }

    createDots() {
        if (!this.pagination) return;
        
        this.pagination.innerHTML = '';
        this.dots = [];
        
        // Sadece anlamlı pozisyonlar için nokta oluştur (maxIndex + 1 kadar)
        const totalDots = this.maxIndex + 1;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'services-dot';
            dot.setAttribute('aria-label', `Pozisyon ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i));
            this.pagination.appendChild(dot);
            this.dots.push(dot);
        }
        this.updateDots();
    }

    calculateVisibleCards() {
        const width = window.innerWidth;
        if (width <= 576) {
            this.visibleCards = 1;
        } else if (width <= 992) {
            this.visibleCards = 2;
        } else if (width <= 1200) {
            this.visibleCards = 3;
        } else {
            this.visibleCards = 4;
        }
        this.maxIndex = Math.max(0, this.cards.length - this.visibleCards);
    }

    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
    }

    goToSlide(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
        const cardWidth = this.cards[0].offsetWidth;
        const gap = window.innerWidth <= 576 ? 0 : 20;
        const offset = this.currentIndex * (cardWidth + gap);
        this.track.style.transform = `translateX(-${offset}px)`;
        this.updateButtons();
        this.updateDots();
    }

    prev() {
        this.goToSlide(this.currentIndex - 1);
    }

    next() {
        this.goToSlide(this.currentIndex + 1);
    }

    updateButtons() {
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentIndex === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
        }
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            // Sadece aktif pozisyonu işaretle (tekli)
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Sayfa görünürlük değiştiğinde (tab değiştirme) slider'ı kontrol et
document.addEventListener('visibilitychange', () => {
    const slider = window.heroSlider;
    if (slider) {
        if (document.hidden) {
            slider.stopAutoSlide();
        } else {
            slider.startAutoSlide();
        }
    }
});