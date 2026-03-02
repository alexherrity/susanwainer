(() => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const items = document.querySelectorAll('.gallery-item');
  const images = Array.from(items).map(item => item.querySelector('img'));
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.alt = images[currentIndex].alt;
      lightboxImg.style.opacity = '1';
    }, 200);
  }

  // Gallery click handlers
  items.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  // Lightbox controls
  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
  document.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

  // Click backdrop to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Scroll fade-in on rows
  const rows = document.querySelectorAll('.gallery-row');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  rows.forEach(row => observer.observe(row));
})();
