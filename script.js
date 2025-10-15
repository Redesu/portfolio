const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
};

let navLinks = document.querySelectorAll('header nav a');
let sections = document.querySelectorAll('section');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    navbar.classList.remove('active');
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const btn = this.querySelector('input[type="submit"]');
    const response = document.getElementById('formResponse');

    btn.value = 'Enviando...';
    btn.disabled = true;

    const formData = new FormData(this);

    // Honeypot field check
    if (formData.get('website')) {
        response.innerHTML = '<p class="error">Erro ao enviar a mensagem. Tente novamente mais tarde.</p>';
    }

    const token = document.querySelector('[name="cf-turnstile-response"]').value;

    if (!token) {
        response.innerHTML = '<p class="error">Por favor, complete o captcha.</p>';
        btn.value = 'Enviar Mensagem';
        btn.disabled = false;
        return;
    }

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    }

    try {
        const res = await fetch('https://x58we3oo6d.execute-api.us-east-2.amazonaws.com/default/portfolio-contact-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                email: data.email,
                message: data.message,
                website: data.website,
                captchaToken: token
            })
        });

        const result = await res.json();

        if (result.success) {
            response.innerHTML = '<p class="success">Mensagem enviada com sucesso!</p>';
            this.reset();
        } else {
            response.innerHTML = '<p class="error">Erro ao enviar a mensagem. Tente novamente mais tarde.</p>';
            this.reset();
        }
    } catch (error) {
        response.innerHTML = '<p class="error">Erro de conexão. Tente novamente mais tarde.</p>';
        this.reset();
    } finally {
        setTimeout(() => {
            response.innerHTML = '';
        }, 5000);
        btn.value = 'Enviar Mensagem';
        btn.disabled = false;
    }
});

let lastScroll = 0;
const whatsappBtn = document.querySelector('.whatsapp-float');

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
        whatsappBtn.style.opacity = '0';
        whatsappBtn.style.pointerEvents = 'none';
    } else {
        whatsappBtn.style.opacity = '1';
        whatsappBtn.style.pointerEvents = 'auto';
    }


    lastScroll = currentScroll;
});

function openLightbox(container) {
    const img = container.querySelector('img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');

    lightboxImg.src = img.src;
    caption.textContent = img.getAttribute('data-caption') || img.alt;
    lightbox.classList.add('active');

    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');

    document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

document.querySelector('.lightbox-content').addEventListener('click', function (e) {
    e.stopPropagation();
});