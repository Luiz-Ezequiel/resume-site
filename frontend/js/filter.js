const tabs   = document.querySelectorAll('.filter-tab');
const cards  = document.querySelectorAll('.project-card');
const empty  = document.getElementById('emptyState');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        let visible = 0;

        cards.forEach(card => {
            const tags = card.dataset.tags || '';
            const match = filter === 'all' || tags.split(' ').includes(filter);
            if (match) {
                card.removeAttribute('data-hidden');
                visible++;
            } else {
                card.setAttribute('data-hidden', '');
            }
        });

        empty.classList.toggle('visible', visible === 0);
    });
});
