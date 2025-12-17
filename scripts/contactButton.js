// Angel Temizlik - Contact Buttons (WhatsApp & Phone)
// Bu script tüm sayfalarda WhatsApp ve telefon butonlarını ekler

document.addEventListener('DOMContentLoaded', function () {
    createContactButtons();

    // Window resize'da pozisyonları yeniden hesapla
    window.addEventListener('resize', adjustButtonPositions);
});

function createContactButtons() {
    // WhatsApp Button (Sağ Alt)
    const whatsappButton = document.createElement('div');
    whatsappButton.className = 'contact-button whatsapp-button';
    whatsappButton.innerHTML = `
        <div class="button-icon">
            <i class="fab fa-whatsapp"></i>
        </div>
        <div class="button-tooltip">WhatsApp ile iletişim</div>
    `;

    // Phone Button (Sol Alt)
    const phoneButton = document.createElement('div');
    phoneButton.className = 'contact-button phone-button';
    phoneButton.innerHTML = `
        <div class="button-icon">
            <i class="fas fa-phone"></i>
        </div>
        <div class="button-tooltip">Hemen ara</div>
    `;

    // Butonları body'ye ekle
    document.body.appendChild(whatsappButton);
    document.body.appendChild(phoneButton);

    // Event listeners ekle
    addContactButtonEvents();
}

function addContactButtonEvents() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    const phoneButton = document.querySelector('.phone-button');

    // WhatsApp Button Click
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function () {
            const phoneNumber = '905545013325';
            const message = encodeURIComponent('Merhaba Angel Temizlik! Web sitenizden ulaşıyorum. Temizlik hizmetleri hakkında bilgi almak istiyorum.');
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

            // Animasyon efekti
            this.classList.add('button-clicked');

            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                this.classList.remove('button-clicked');
            }, 200);
        });

        // Hover efektleri
        whatsappButton.addEventListener('mouseenter', function () {
            this.classList.add('button-hover');
            showTooltip(this);
        });

        whatsappButton.addEventListener('mouseleave', function () {
            this.classList.remove('button-hover');
            hideTooltip(this);
        });
    }

    // Phone Button Click
    if (phoneButton) {
        phoneButton.addEventListener('click', function () {
            const phoneNumber = '05394873558';

            // Animasyon efekti
            this.classList.add('button-clicked');

            setTimeout(() => {
                window.location.href = `tel:${phoneNumber}`;
                this.classList.remove('button-clicked');
            }, 200);
        });

        // Hover efektleri
        phoneButton.addEventListener('mouseenter', function () {
            this.classList.add('button-hover');
            showTooltip(this);
        });

        phoneButton.addEventListener('mouseleave', function () {
            this.classList.remove('button-hover');
            hideTooltip(this);
        });
    }

    // Touch device desteği
    addTouchSupport();
}

function showTooltip(button) {
    const tooltip = button.querySelector('.button-tooltip');
    if (tooltip) {
        tooltip.classList.add('tooltip-visible');
    }
}

function hideTooltip(button) {
    const tooltip = button.querySelector('.button-tooltip');
    if (tooltip) {
        tooltip.classList.remove('tooltip-visible');
    }
}

function addTouchSupport() {
    const buttons = document.querySelectorAll('.contact-button');

    buttons.forEach(button => {
        // Touch start - hover efekti başlat
        button.addEventListener('touchstart', function (e) {
            e.preventDefault();
            this.classList.add('button-hover');
            showTooltip(this);
        });

        // Touch end - hover efekti bitir ve click işlemi
        button.addEventListener('touchend', function (e) {
            e.preventDefault();

            const rect = this.getBoundingClientRect();
            const touch = e.changedTouches[0];

            // Touch pozisyonu buton içinde mi kontrolü
            if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                touch.clientY >= rect.top && touch.clientY <= rect.bottom) {

                // Click event'ini trigger et
                this.click();
            }

            // Hover efektini kaldır
            setTimeout(() => {
                this.classList.remove('button-hover');
                hideTooltip(this);
            }, 300);
        });

        // Touch cancel - hover efekti temizle
        button.addEventListener('touchcancel', function () {
            this.classList.remove('button-hover');
            hideTooltip(this);
        });
    });
}

function adjustButtonPositions() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    const phoneButton = document.querySelector('.phone-button');

    // Mobil cihazlarda buton boyutlarını ayarla
    if (window.innerWidth <= 768) {
        if (whatsappButton) whatsappButton.classList.add('mobile-size');
        if (phoneButton) phoneButton.classList.add('mobile-size');
    } else {
        if (whatsappButton) whatsappButton.classList.remove('mobile-size');
        if (phoneButton) phoneButton.classList.remove('mobile-size');
    }

    // Scroll pozisyonuna göre butonları ayarla
    adjustButtonsOnScroll();
}

function adjustButtonsOnScroll() {
    let ticking = false;

    function updateButtons() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const buttons = document.querySelectorAll('.contact-button');

        // Footer'a yaklaşıldığında butonları yukarı kaydır
        const footerDistance = documentHeight - (scrollY + windowHeight);

        buttons.forEach(button => {
            if (footerDistance < 100) {
                button.style.transform = `translateY(-${100 - footerDistance}px)`;
            } else {
                button.style.transform = 'translateY(0)';
            }
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateButtons);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Butonları gizleme/gösterme fonksiyonları (isteğe bağlı)
window.hideContactButtons = function () {
    const buttons = document.querySelectorAll('.contact-button');
    buttons.forEach(button => {
        button.style.display = 'none';
    });
};

window.showContactButtons = function () {
    const buttons = document.querySelectorAll('.contact-button');
    buttons.forEach(button => {
        button.style.display = 'flex';
    });
};

// Buton renklerini özelleştirme fonksiyonu
window.customizeContactButtons = function (whatsappColor, phoneColor) {
    const whatsappButton = document.querySelector('.whatsapp-button .button-icon');
    const phoneButton = document.querySelector('.phone-button .button-icon');

    if (whatsappButton && whatsappColor) {
        whatsappButton.style.backgroundColor = whatsappColor;
    }

    if (phoneButton && phoneColor) {
        phoneButton.style.backgroundColor = phoneColor;
    }
};

// Sayfa yüklendiğinde scroll listener'ı başlat
document.addEventListener('DOMContentLoaded', function () {
    adjustButtonsOnScroll();
});