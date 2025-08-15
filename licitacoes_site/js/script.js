// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function() {
    // Inicializa todas as funcionalidades
    initMobileMenu();
    initScrollAnimations();
    initSmoothScrolling();
    initHeaderScroll();
    initCounterAnimations();
    initScrollToTop();
    // initTooltips(); // Desativado por enquanto, pode ser adicionado se necessário
    // initAccordions(); // Desativado por enquanto, pode ser adicionado se necessário
    // initModalFunctionality(); // Desativado por enquanto, pode ser adicionado se necessário
    // initFormValidation(); // Desativado por enquanto, pode ser adicionado se necessário
    // initSearchFunctionality(); // Desativado por enquanto, pode ser adicionado se necessário
    // initThemeToggle(); // Desativado por enquanto, pode ser adicionado se necessário
});

// Funcionalidade do menu mobile
function initMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function() {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
        });

        navLinks.forEach(link => {
            link.addEventListener("click", function() {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "";
            });
        });

        document.addEventListener("click", function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
}

// Animações de scroll (Intersection Observer)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-fade-in-up");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        ".feature-card, .modality-card, .content-card, .stat-item, .timeline-item, .change-card, .document-card, .example-card, .step-card, .story-card, .guide-item, .principle-item, .participant-card, .summary-card, .tip-card, .extinct-card, .transition-phase, .resource-card"
    );

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll suave para âncoras
function initSmoothScrolling() {
    const links = document.querySelectorAll("a[href^=\"#\"]");
    
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
}

// Efeito do header no scroll
function initHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 50; // Pixels para começar a mudar o header

    window.addEventListener("scroll", function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > scrollThreshold) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        // Opcional: Esconder/mostrar header ao rolar
        // if (scrollTop > lastScrollTop && scrollTop > 200) {
        //     header.style.transform = "translateY(-100%)";
        // } else {
        //     header.style.transform = "translateY(0)";
        // }
        // lastScrollTop = scrollTop;
    });
}

// Animação de contadores
function initCounterAnimations() {
    const counters = document.querySelectorAll(".stat-number");
    
    const counterObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                const duration = 1500; // 1.5 segundos
                let start = null;

                function animate(currentTime) {
                    if (!start) start = currentTime;
                    const progress = (currentTime - start) / duration;
                    const value = Math.min(progress, 1) * target;
                    counter.textContent = Math.floor(value);
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        counter.textContent = target;
                    }
                }
                requestAnimationFrame(animate);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.7 }); // Ativa quando 70% do elemento está visível

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Botão de scroll to top
function initScrollToTop() {
    const scrollButton = document.createElement("button");
    scrollButton.innerHTML = "<i class=\"fas fa-arrow-up\"></i>";
    scrollButton.className = "scroll-to-top";
    scrollButton.setAttribute("aria-label", "Voltar ao topo");
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener("scroll", throttle(() => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add("show");
        } else {
            scrollButton.classList.remove("show");
        }
    }, 100));
    
    scrollButton.addEventListener("click", scrollToTop);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Função para throttle (limitar chamadas de função)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Adiciona estilos CSS para elementos criados dinamicamente (se necessário)
const dynamicStyles = `
    .scroll-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-md);
    }
    
    .scroll-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .scroll-to-top:hover {
        background: var(--primary-dark);
        transform: translateY(-2px);
    }

    .header.scrolled {
        box-shadow: var(--shadow-md);
        background: rgba(255, 255, 255, 0.95);
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Funções utilitárias (mantidas para referência, mas não usadas diretamente no HTML)
// function showNotification(message, type = "info") { /* ... */ }
// function copyToClipboard(text) { /* ... */ }
// function formatNumber(num) { /* ... */ }
// function formatCurrency(value) { /* ... */ }
// function isMobile() { /* ... */ }
// function isOnline() { /* ... */ }
// function trackEvent(category, action, label) { /* ... */ }
// function measurePerformance() { /* ... */ }


