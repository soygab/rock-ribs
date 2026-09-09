document.addEventListener('DOMContentLoaded', function () {
  // Ano dinâmico no footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header: transforma ao rolar
  var header = document.getElementById('siteHeader');
  function onScroll(){
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  var hamburger = document.getElementById('hamburgerBtn');
  var panel = document.getElementById('mobilePanel');
  function closePanel(){
    panel.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  hamburger.addEventListener('click', function(){
    var isOpen = panel.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  panel.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closePanel); });

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function(el){ io.observe(el); });

  // Showcase: navegação horizontal
  var track = document.getElementById('showcaseTrack');
  var prev = document.getElementById('showPrev');
  var next = document.getElementById('showNext');
  function scrollAmount(){
    var card = track.querySelector('.show-card');
    return card ? card.getBoundingClientRect().width + 22 : 300;
  }
  prev.addEventListener('click', function(){ track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }); });
  next.addEventListener('click', function(){ track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }); });

  // Cardápio: filtro por categoria
  var menuTabs = document.getElementById('menuTabs');
  var menuItems = document.querySelectorAll('#menuGrid .menu-item');
  if (menuTabs){
    menuTabs.addEventListener('click', function(e){
      var btn = e.target.closest('.menu-tab');
      if (!btn) return;
      menuTabs.querySelectorAll('.menu-tab').forEach(function(t){ t.classList.remove('active'); });
      btn.classList.add('active');
      var cat = btn.dataset.cat;
      menuItems.forEach(function(item){
        var match = (cat === 'todos') || (item.dataset.cat === cat);
        item.classList.toggle('show', match);
      });
    });
  }

  // Galeria: filtro por categoria
  var galleryTabs = document.getElementById('galleryTabs');
  var galleryItems = document.querySelectorAll('#galleryGrid .gallery-item');
  galleryTabs.addEventListener('click', function(e){
    var btn = e.target.closest('.menu-tab');
    if (!btn) return;
    galleryTabs.querySelectorAll('.menu-tab').forEach(function(t){ t.classList.remove('active'); });
    btn.classList.add('active');
    var cat = btn.dataset.gcat;
    galleryItems.forEach(function(item){
      var match = (cat === 'todos') || (item.dataset.gcat === cat);
      item.classList.toggle('show', match);
    });
  });

  // Instagram: navegação horizontal do carrossel
  var instaTrack = document.getElementById('instaTrack');
  var instaPrev = document.querySelector('.insta-prev');
  var instaNext = document.querySelector('.insta-next');
  if (instaTrack && instaPrev && instaNext){
    function instaScrollAmount(){
      var post = instaTrack.querySelector('.insta-post');
      return post ? post.getBoundingClientRect().width + 14 : 220;
    }
    instaPrev.addEventListener('click', function(){ instaTrack.scrollBy({ left: -instaScrollAmount()*2, behavior: 'smooth' }); });
    instaNext.addEventListener('click', function(){ instaTrack.scrollBy({ left: instaScrollAmount()*2, behavior: 'smooth' }); });
  }
 

  // Reservas: seleção rápida de tipo
  var reserveOpts = document.querySelectorAll('.reserve-opt');
  var tipoSelect = document.getElementById('r-tipo');
  reserveOpts.forEach(function(opt){
    opt.addEventListener('click', function(){
      tipoSelect.value = opt.dataset.tipo;
      document.getElementById('reserveForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Formulário de reserva (sem backend — apenas feedback visual)
  var reserveForm = document.getElementById('reserveForm');
  var reserveMsg = document.getElementById('reserveMsg');
  reserveForm.addEventListener('submit', function(e){
    e.preventDefault();
    reserveMsg.classList.add('show');
    reserveForm.reset();
  });

  // Formulário de contato (sem backend — apenas feedback visual)
  var contactForm = document.getElementById('contactForm');
  var contactMsg = document.getElementById('contactMsg');
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    contactMsg.classList.add('show');
    contactForm.reset();
  });
});
