// Erk Çelik Metal - Header ve Footer Component Script
// Bu script tüm sayfalara eklenecek ve otomatik olarak header/footer ekleyecek

document.addEventListener('DOMContentLoaded', function () {
    createHeader();
    createFooter();
    addBodyPadding();

    // Window resize'da padding'i yeniden hesapla
    window.addEventListener('resize', addBodyPadding);
});

function createHeader() {
    const header = document.createElement('header');
    header.className = 'angel-header';
    header.innerHTML = `
        <!-- Top Bar -->

        
        <!-- Main Header -->
        <div class="main-header">
            <div class="header-container">
                <div class="logo-section">
                    <a href="index.html" class="logo">
                        <img src="assets/images/logo.png" alt="Erk Çelik Metal" class="logo-image">
                    </a>
                </div>
                
                <nav class="main-navigation">
                    <ul class="nav-menu">
                        <li><a href="index.html" class="nav-link">Ana Sayfa</a></li>
                        <li><a href="hizmetlerimiz.html" class="nav-link">Hizmetlerimiz</a></li>
                        <li><a href="galeri.html" class="nav-link">Galeri</a></li>
                        <li><a href="iletisim.html" class="nav-link">İletişim</a></li>
                    </ul>
                    
         
                    
                    <div class="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </nav>
            </div>
        </div>
    `;

    // Header'ı body'nin en başına ekle
    document.body.insertBefore(header, document.body.firstChild);

    // Mobile menu toggle functionality
    const mobileToggle = header.querySelector('.mobile-menu-toggle');
    const navMenu = header.querySelector('.nav-menu');

    mobileToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Aktif sayfa linkini vurgula
    highlightActiveLink();
}

function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'erk-footer';
    footer.innerHTML = `
        <div class="footer-main">
            <div class="footer-container">
                <div class="footer-grid">
                    <!-- Şirket Bilgileri -->
                    <div class="footer-column footer-about">
                        <div class="footer-logo">
                            <img src="assets/images/logo.png" alt="Erk Çelik Metal" class="footer-logo-img">
                        </div>
                        <p class="footer-description">
                            Profesyonel çelik konstrüksiyon ve metal işleri alanında uzman ekibimizle 
                            Türkiye genelinde hizmet veriyoruz. Kalite ve güvenilirlik bizim için her şeyden önce gelir.
                        </p>
                        <div class="footer-social">
                            <a href="https://wa.me/905336691659" class="social-btn whatsapp" target="_blank" aria-label="WhatsApp">
                                <i class="fab fa-whatsapp"></i>
                            </a>
                            <a href="https://instagram.com" class="social-btn instagram" target="_blank" aria-label="Instagram">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="https://facebook.com" class="social-btn facebook" target="_blank" aria-label="Facebook">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Hızlı Linkler -->
                    <div class="footer-column">
                        <h4 class="footer-title">Hızlı Linkler</h4>
                        <ul class="footer-links">
                            <li><a href="index.html"><i class="fas fa-angle-right"></i> Ana Sayfa</a></li>
                            <li><a href="hizmetlerimiz.html"><i class="fas fa-angle-right"></i> Hizmetlerimiz</a></li>
                            <li><a href="galeri.html"><i class="fas fa-angle-right"></i> Galeri</a></li>
                            <li><a href="iletisim.html"><i class="fas fa-angle-right"></i> İletişim</a></li>
                        </ul>
                    </div>
                    
                    <!-- İletişim Bilgileri -->
                    <div class="footer-column">
                        <h4 class="footer-title">İletişim</h4>
                        <div class="footer-contact-list">
                            <div class="footer-contact-item">
                                <div class="contact-icon">
                                    <i class="fas fa-phone-alt"></i>
                                </div>
                                <div class="contact-text">
                                    <span class="contact-label">Telefon</span>
                                    <a href="tel:+905336691659">0533 669 16 59</a>
                                </div>
                            </div>
                            <div class="footer-contact-item">
                                <div class="contact-icon">
                                    <i class="fas fa-envelope"></i>
                                </div>
                                <div class="contact-text">
                                    <span class="contact-label">E-posta</span>
                                    <a href="mailto:info@erkcelikmetal.com">info@erkcelikmetal.com</a>
                                </div>
                            </div>
                            <div class="footer-contact-item">
                                <div class="contact-icon">
                                    <i class="fas fa-map-marker-alt"></i>
                                </div>
                                <div class="contact-text">
                                    <span class="contact-label">Hizmet Alanı</span>
                                    <span>Türkiye Geneli</span>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Footer Bottom -->
        <div class="footer-bottom">
            <div class="footer-container">
                <div class="footer-bottom-inner">
                    <p class="copyright">&copy; 2025 Erk Çelik Metal. Tüm hakları saklıdır.</p>
                    <p class="credits">
                        <a href="https://sakarydigital.com" target="_blank">Sakarya Digital</a> tarafından hazırlanmıştır.
                    </p>
                </div>
            </div>
        </div>
    `;

    // Footer'ı body'nin en sonuna ekle
    document.body.appendChild(footer);
}

function addBodyPadding() {
    // Ana sayfada header transparan olduğu için padding ekleme
    const isHomePage = window.location.pathname.endsWith('index.html') || 
                       window.location.pathname === '/' || 
                       window.location.pathname.endsWith('/');
    
    if (isHomePage) {
        document.body.style.paddingTop = '0';
        document.body.classList.add('home-page');
        document.querySelector('.angel-header').classList.add('transparent-header');
    } else {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            document.body.style.paddingTop = '70px'; // Mobile header yüksekliği
        } else {
            // Top bar (44px) + Main header (140px) = 184px
            document.body.style.paddingTop = '140px'; // Desktop header yüksekliği
        }
    }

    document.body.style.paddingBottom = '0'; // Footer fixed değil
}

function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Scroll efekti için header'a class ekle
window.addEventListener('scroll', function () {
    const header = document.querySelector('.angel-header');
    const isHomePage = document.body.classList.contains('home-page');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        if (isHomePage) {
            header.classList.remove('transparent-header');
        }
    } else {
        header.classList.remove('scrolled');
        if (isHomePage) {
            header.classList.add('transparent-header');
        }
    }
});

// Smooth Scroll Function - Anchor linkler için
document.addEventListener('DOMContentLoaded', function () {
    // Tüm anchor linkleri seç
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Header yüksekliğini hesaba kat
                const headerHeight = document.querySelector('.angel-header').offsetHeight;
                const offsetTop = targetElement.offsetTop - headerHeight - 20; // 20px extra padding

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', function () {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
});