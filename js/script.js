//Swipper

function swiper(){
	const swiper = new Swiper('.swiper', {
		loop: false,
		effect: 'fade',
		navigation:{
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
	});
}

//Menu 

function tlMenu(){
	var tlmenu = new TimelineMax({
		paused:true
	})

	tlmenu.fromTo('.menu', 0.5, 
		{ display: 'none', opacity:0 },
		{ display: 'flex', opacity:1, ease: 'power2.out' },
		.1
	)

	tlmenu.staggerFromTo('.menu li', 0.2,
		{ opacity: 0, x: 0 },
		{ opacity: 1, x: 10, ease: 'power2.out' },
		.2
	)

	var menuToggle = document.querySelector('.burger');

	menuToggle.onclick = () => {
		menuToggle.classList.toggle('active');
		menuToggle.classList.contains('active') ? tlmenu.play(0) : tlmenu.reverse(0);
	}
}

//Scroll menu

function scrollMenu(){
	const menuItens = document.querySelectorAll('.menu a[href^="#"]');

	function getHref(element){
		const id = element.getAttribute('href');
		return document.querySelector(id).offsetTop;
	}

	function scrollPosition(to){
		window.scroll({
			top: to,
			behavior: 'smooth',
		})
	}

	function scrollSection(event){
		event.preventDefault();
		const to = getHref(event.currentTarget);
		scrollPosition(to);

		document.querySelector('.burger').classList.remove('active');

		gsap.to(".menu", {
			opacity: 0,
			display: 'none',
			ease: 'power2.out',
			duration: 1
		});
	}

	menuItens.forEach(item => {
		item.addEventListener('click', scrollSection);
	})
}

//Load 

function init(){
	gsap.to('.init-load span', {
		opacity: 0,
		display: 'none',
		ease: 'power2.out',
		delay: 1,
		duration: 1
	});

	gsap.to('.init-load', {
		width: '0',
		display: 'none',
		ease: 'power2.out',
		delay: 2, 
		duration: 1
	});

	function loaderIn(){
		gsap.to('.init-load', {
			width: '100%',
			display: 'flex',
			ease: 'power2.out',
			duration: 1
		});
		gsap.to('.init-load span', {
			opacity: 1, 
			display: 'block',
			ease: 'power2.out',
			delay: 1,
			duration: 1
		});
	}

	function loaderAway(){
		gsap.to('.init-load span', {
			opacity: 0,
			display: 'none',
			ease: 'power2.out',
			delay: 1, 
			duration: 1
		});
		gsap.to('.init-load', {
			width: '0',
			delay: 'none',
			ease: 'power2.out',
			delay: 2,
			duration: 1
		});
	}

	// barba.js

	var htmlTransition = document.querySelector('html');

	barba.hooks.before(() => {

	});

	barba.hooks.after(() => {
		swiper()
		tlMenu()
		scrollMenu()
		AOS.init()
	})

	barba.hooks.enter(() => {
		window.scrollTo(0, 0);
	});

	function delay(n){
		n = n || 2000;
		return new Promise((done) => {
			setTimeout(() => {
				done();
			}, n);
		});
	}

	barba.init({
		sync: true,
		transitions: [{
			name: 'transitionDefault',
			async leave(data) {
				const done = this.async();
				await loaderIn();
				await delay(800);
				done();
			},
			async enter(data){
				loaderAway();
			},
		}]
	})
}

window.addEventListener('load', function(){
	swiper();
	tlMenu();
	scrollMenu();
	AOS.init();
	init();
});
