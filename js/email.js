const btn = document.getElementById('btnEnviar');
const feedback = document.getElementById('formFeedback');

btn.addEventListener('click', () => {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
        feedback.textContent = 'Preencha todos os campos.';
        feedback.className = 'form-feedback error';
        return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
        feedback.textContent = 'Insira um email válido.';
        feedback.className = 'form-feedback error';
        return;
    }

    const assunto = encodeURIComponent(`Contato de ${nome}`);
    const corpo = encodeURIComponent(`Nome: ${nome}\nEmail: ${email}\n\n${mensagem}`);
    const mailtoLink = `mailto:ezequiel.luizedu@gmail.com?subject=${assunto}&body=${corpo}`;

    btn.disabled = true;
    window.open(mailtoLink, '_blank')

    setTimeout(() => {
        feedback.textContent = 'Seu cliente de email foi aberto. Obrigado!';
        feedback.className = 'form-feedback success';
        btn.disabled = false;
    }, 800);
});
