const toTopBtn = document.getElementById('toTopBtn');

window.addEventListener('scroll', () => {
    toTopBtn.classList.toggle('visible', window.scrollY > 300);
});

toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
