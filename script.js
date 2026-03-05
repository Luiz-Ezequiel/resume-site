const doc = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const storageKey = 'theme-preference';


const getTheme = () => {
    const saved = localStorage.getItem(storageKey);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
    doc.classList.remove('light', 'dark');
    doc.classList.add(theme);
};

applyTheme(getTheme());

function toggleTheme() {
    const current = doc.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    const updateDOM = () => {
        applyTheme(next);
        localStorage.setItem(storageKey, next);
    };

    // Use View Transition API if available
    if (document.startViewTransition) {
        document.startViewTransition(updateDOM);
    } else {
        updateDOM();
    }
}

themeBtn.addEventListener('click', toggleTheme);
