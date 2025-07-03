document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle');

  const applyTheme = (dark) => {
    if (dark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Load theme preference
  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme === 'dark');

  // Theme toggle
  toggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    applyTheme(!isDark);
  });

  // Modal logic
  const modal = document.getElementById('modal');
  const modalContent = document.querySelector('.modal-content');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');

  document.querySelectorAll('.link-card').forEach(card => {
    card.addEventListener('click', () => {
      modalImg.src = card.dataset.img;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalLink.href = card.dataset.url;
      modal.classList.add('active');
    });
  });

  // Close on mouseleave (desktop only)
  modalContent.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
      modal.classList.remove('active');
    }
  });

  // Close on outside click (mobile)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});
