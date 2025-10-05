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
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.success) {
            response.innerHTML = '<p class="success">Mensagem enviada com sucesso!</p>';
            console.log('Success:', result);
            this.reset();
        } else {
            response.innerHTML = '<p class="error">Erro ao enviar a mensagem. Tente novamente mais tarde.</p>';
            console.error('Error:', result);
            this.reset();
        }
    } catch (error) {
        response.innerHTML = '<p class="error">Erro de conexão. Tente novamente mais tarde.</p>';
        console.error('Error:', error);
        this.reset();
    } finally {
        setTimeout(() => {
            response.innerHTML = '';
        }, 5000);
        btn.value = 'Enviar Mensagem';
        btn.disabled = false;
    }
});