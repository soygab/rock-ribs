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

  // Showcase: navegação horizontal e avanço automático
  var track = document.getElementById('showcaseTrack');
  var prev = document.getElementById('showPrev');
  var next = document.getElementById('showNext');
  var octoberShows = [
    ['01','19:30','Pedro Basílio','Show ao vivo','01','crop-top-left'],
    ['02','19:30','Ranieri e Banda Os Dinossauros','Show ao vivo','01','crop-top-center'],
    ['03','13:00 e 19:30','Fábia e Cod','Especial Beatles às 19:30','01','crop-top-right'],
    ['04','13:00','Carlos Bianchini','Show ao vivo','01','crop-bottom-left'],
    ['05','19:30','Maria Clara','Show ao vivo','01','crop-bottom-center'],
    ['06','19:30','Najulia Freitas','Show ao vivo','01','crop-bottom-right'],
    ['07','19:30','Fábia e Cod','Show ao vivo','02','crop-top-left'],
    ['08','19:30','Pammy Trio','Show ao vivo','02','crop-top-center'],
    ['09','19:30','Prima Dama','Show ao vivo','02','crop-top-right'],
    ['10','13:00 e 19:30','Tia Malu Infantil + Banda Haven','Programação infantil e show ao vivo','02','crop-bottom-left'],
    ['11','13:00, 17:00 e 19:30','Tia Malu Infantil, Thiago Procópio e Placa Preta','Programação especial','02','crop-bottom-center'],
    ['12','13:00 e 19:30','Tia Malu Infantil + Lenny','Programação infantil e show ao vivo','02','crop-bottom-right'],
    ['13','19:30','Matheus Dias','Show ao vivo','03','crop-top-left'],
    ['14','19:30','Evento Pró Música Kids & Teen','Evento musical','03','crop-top-center'],
    ['15','19:30','Fialho Trio Banda','Show ao vivo','03','crop-top-right'],
    ['16','19:30','Matheus Castro Trio','Show ao vivo','03','crop-bottom-left'],
    ['17','13:00 e 19:30','Melissa Ribeiro + Red Fenders','Dois shows no mesmo dia','03','crop-bottom-center'],
    ['18','13:00','Julio Aroeira Solo','Show ao vivo','03','crop-bottom-right'],
    ['19','19:30','Ranieri Solo','Show ao vivo','04','crop-top-left'],
    ['20','19:30','Milena Telhado','Show ao vivo','04','crop-top-center'],
    ['21','19:30','Marcos Prado Dupla','Show ao vivo','04','crop-top-right'],
    ['23','19:30','C4ten4','Show ao vivo','04','crop-bottom-center'],
    ['24','13:00 e 19:30','Will Quinto + Prima Dama','Dois shows no mesmo dia','04','crop-bottom-right'],
    ['25','13:00','Nicole Mattos','Show ao vivo','05','crop-top-left'],
    ['26','19:30','Dinho','Show ao vivo','05','crop-top-center'],
    ['27','19:30','Desfile Garota Amélie','Evento especial','05','crop-top-right'],
    ['28','19:30','João e Cod','Show ao vivo','05','crop-bottom-left'],
    ['29','19:30','Pedro Basílio','Show ao vivo','05','crop-bottom-center'],
    ['30','19:30','Iza Vitória','Show ao vivo','05','crop-bottom-right'],
    ['31','13:00 e 19:30','Fábia e Cod + Matheus Castro Trio','Dois shows no mesmo dia','05','crop-bottom-right']
  ];
  var octoberImages = {
    '01':'pedro-basilio.jpg', '02':'ranieri-dinossauros.jpg',
    '04':'carlos-bianchini.jpg', '05':'maria-clara.jpg', '06':'najulia-freitas.jpg',
    '07':'fabia-cod-07.jpg', '08':'pammy-trio.jpg', '09':'prima-dama-09.jpg',
    '13':'matheus-dias.jpg', '14':'pro-musica.jpg', '15':'fialho-trio.jpg',
    '16':'matheus-castro.jpg', '18':'julio-aroeira.jpg',
    '19':'ranieri-solo.jpg', '20':'milena-telhado.jpg', '21':'marcos-prado.jpg',
    '23':'c4ten4.jpg', '25':'nicole-mattos.jpg',
    '26':'dinho.jpg', '27':'garota-amelie.jpg', '28':'joao-cod.jpg',
    '29':'pedro-basilio-29.jpg', '30':'iza-vitoria.jpg'
  };
  // Dias com várias atrações usam o card original da programação para
  // preservar os logos, fotos e ordem visual fornecidos pelo Rock & Ribs.
  var multiShowPrograms = {
    '03':'dia-03-clean.png', '10':'dia-10-clean.png', '11':'dia-11-clean.png', '12':'dia-12-clean.png',
    '17':'dia-17-clean.png', '24':'dia-24-clean.png', '31':'dia-31-clean.png'
  };
  // Duplicamos a lista para permitir que a faixa volte ao início sem cortes visíveis.
  var loopingShows = octoberShows.concat(octoberShows);
  track.innerHTML = loopingShows.map(function(show, index){
    var isMultiShow = Boolean(multiShowPrograms[show[0]]);
    var imagePath = isMultiShow
      ? 'public/image/showcase/outubro/multi-show-clean/' + multiShowPrograms[show[0]]
      : 'public/image/showcase/outubro/artists-clean/' + octoberImages[show[0]];
    var imageClass = isMultiShow ? 'show-multi-program' : 'show-artist-photo';
    return '<article class="show-card' + (isMultiShow ? ' show-card-multi' : '') + '">' +
      '<img class="' + imageClass + '" src="' + imagePath + '" alt="' + show[2] + '" loading="' + (index < 8 ? 'eager' : 'lazy') + '">' +
      '<div class="show-body">' +
        '<span class="show-weekday">' + show[0] + ' de outubro · ' + show[1] + '</span>' +
        '<h3 class="show-name">' + show[2] + '</h3>' +
        '<p class="show-genre">' + show[3] + '</p>' +
        '<p class="show-desc">Programação oficial de outubro. Sujeita a alterações.</p>' +
        '<div class="show-footer"><span class="show-venue">Rock &amp; Ribs VR</span><a href="#reservas" class="show-link">Reservar</a></div>' +
      '</div>' +
    '</article>';
  }).join('');
  function scrollAmount(){
    var card = track.querySelector('.show-card');
    return card ? card.getBoundingClientRect().width + 22 : 300;
  }
  function advanceShowcase(){ track.scrollBy({ left: scrollAmount(), behavior: 'smooth' }); }
  prev.addEventListener('click', function(){ track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }); });
  next.addEventListener('click', advanceShowcase);

  var showcaseFrame;
  var showcaseLastTime;
  var showcasePosition = 0;
  function loopShowcase(timestamp){
    if (!showcaseLastTime) {
      showcaseLastTime = timestamp;
      showcasePosition = track.scrollLeft;
    }
    var elapsed = timestamp - showcaseLastTime;
    showcaseLastTime = timestamp;
    // 28 px/s deixa a programação legível e cria uma passagem contínua.
    showcasePosition += (elapsed * 0.028);
    var firstSetWidth = track.scrollWidth / 2;
    if (showcasePosition >= firstSetWidth) showcasePosition -= firstSetWidth;
    track.scrollLeft = showcasePosition;
    showcaseFrame = window.requestAnimationFrame(loopShowcase);
  }
  function startShowcaseAutoplay(){
    if (showcaseFrame) return;
    showcaseLastTime = 0;
    showcaseFrame = window.requestAnimationFrame(loopShowcase);
  }
  startShowcaseAutoplay();

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
