'use strict';

document.addEventListener("DOMContentLoaded", function() {

	//----------------------SLIDER-hero----------------------
		var mySwiper = new Swiper('.hero__slider', {
			slidesPerView: 1,
			spaceBetween: 30,
			// loop: true,
			effect: 'fade',
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.hero__slider_pagination',
				clickable: 'true',
			},
		});

	//----------------------SLIDER-info----------------------
		var mySwiper = new Swiper('.info__slider', {
			slidesPerView: 1,
			spaceBetween: 30,
			autoplay: {
				delay: 5000,
			},
			breakpoints: {
				480: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 30
				},
			}
		});

	//----------------------SLIDER-tovar1----------------------
		var mySwiper = new Swiper('.tovar__container1', {
			slidesPerView: 1,
			spaceBetween: 30,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.tovar__container1_pagination',
				clickable: 'true',
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 30
				},
			}
		});

	//----------------------SLIDER-tovar2----------------------
		var mySwiper = new Swiper('.tovar__container2', {
			slidesPerView: 1,
			spaceBetween: 30,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: '.tovar__container2_pagination',
				clickable: 'true',
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
					spaceBetween: 15
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 30
				},
			}
		});

	//----------------------SLIDER-gallery----------------------
		var galleryThumbs = new Swiper('.gallery-thumbs', {
			spaceBetween: 5,
			slidesPerView: 5,
			freeMode: true,
			loopedSlides: 5,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			direction: 'horizontal',
			breakpoints: {
				1600: {
					slidesPerView: 4,
					spaceBetween: 10,
					direction: 'vertical',
				},
				1240: {
					slidesPerView: 3,
					spaceBetween: 10,
					direction: 'vertical',
				}, 
				576: {
					direction: 'vertical',
				}
			},
		});
		var galleryTop = new Swiper('.gallery-top', {
			spaceBetween: 40,
			loopedSlides: 5,
			thumbs: {
				swiper: galleryThumbs,
			},
		});

	//----------------------SCROLL-----------------------
		const scrollTo = (scrollTo) => {
			let list = document.querySelector(scrollTo);
			list = '.' + list.classList[0]  + ' li a[href^="#"';
	
			document.querySelectorAll(list).forEach(link => {
	
				link.addEventListener('click', function(e) {
						e.preventDefault();
						const scrollMenu = document.querySelector(scrollTo);
	
						let href = this.getAttribute('href').substring(1);
	
						const scrollTarget = document.getElementById(href);
	
						// const topOffset = scrollMenu.offsetHeight;
						const topOffset = 70;
						const elementPosition = scrollTarget.getBoundingClientRect().top;
						const offsetPosition = elementPosition - topOffset;
	
						window.scrollBy({
								top: offsetPosition,
								behavior: 'smooth'
						});
	
						
						let button = document.querySelector('.hamburger'),
								nav = document.querySelector('.header__nav'),
								header = document.querySelector('.header');
	
						button.classList.remove('hamburger--active');
						nav.classList.remove('header__nav--active');
						header.classList.remove('header--menu');
				});
			});
		};
		// scrollTo('.header__nav');

	//----------------------FIXED-HEADER-----------------------
		const headerFixed = (headerFixed, headerActive) => {
			const header =  document.querySelector(headerFixed),
						active = headerActive.replace(/\./, '');
	
			window.addEventListener('scroll', function() {
				const top = pageYOffset;
				
				if (top >= 90) {
					header.classList.add(active);
				} else {
					header.classList.remove(active);
				}
	
			});
	
		};
		headerFixed('.header', '.header--active');

	//----------------------HAMBURGER-----------------------
		const hamburger = (hamburgerButton, hamburgerNav, hamburgerHeader) => {
			const button = document.querySelector(hamburgerButton),
						nav = document.querySelector(hamburgerNav),
						header = document.querySelector(hamburgerHeader);

			button.addEventListener('click', (e) => {
				nav.classList.toggle('header__nav--active');
				header.classList.toggle('header--menu');
			});

			const headerWrap = document.querySelector('.header__nav');

			nav.addEventListener('click', (e) => {
				if (e.target === headerWrap) {
					nav.classList.remove('header__nav--active');
					header.classList.remove('header--menu');
				}
			});

		};
		hamburger('.header__hamburger', '.header__nav', '.header');
		hamburger('.header__nav_close', '.header__nav', '.header');

	//----------------------MODAL-----------------------
		const modals = (modalSelector) => {
			const	modal = document.querySelectorAll(modalSelector);

			if (modal) {
				let i = 1;

				modal.forEach(item => {
					const wrap = item.id;
					const link = document.querySelector('.' + wrap);
					let close = item.querySelector('.close');
					if (link) {
						link.addEventListener('click', (e) => {
							if (e.target) {
								e.preventDefault();
							}
							item.classList.add('active');
						});
					}

					if (close) {
						close.addEventListener('click', () => {
							item.classList.remove('active');
						});
					}

					item.addEventListener('click', (e) => {
						if (e.target === item) {
							item.classList.remove('active');
						}
					});
				});
			}

		};
		modals('.modal');
		modals('.search');
		modals('.cart');
		modals('.nav-catalog');

	//----------------------ACARDION-----------------------
		if( window.innerWidth <= 992 ){
			$(".block__content").slideUp("slow");
			// $(".block").first().addClass('active');
			$(".active .block__content").slideDown("slow");
	
			$(".block__header").on("click", function(){
				if ($(this).parent().hasClass('active')) {
					$(this).parent().removeClass('active');
					$(".block__content").slideUp("slow");
				}
				else {
					$(".active .block__content").slideUp("slow");
					$(".header__nav_list .active").removeClass('active');
					$(this).parent().addClass('active');
					$(".active .block__content").slideDown("slow");
				}
			});
		}

	//----------------------ACARDION-FILTER----------------------
		$(".filter__content").slideUp("slow");
		$(".filter--open .filter__content").slideDown("slow");
		$(".filter__header").on("click", function(){
			if ($(this).parent().hasClass('filter--open')) {
				$(this).parent().removeClass('filter--open');
				$(".filter__content").slideUp("slow");
			}
			else {
				$(".filter--open .filter__content").slideUp("slow");
				$(".filter--open").removeClass('filter--open');
				$(this).parent().addClass('filter--open');
				$(".filter--open .filter__content").slideDown("slow");
			}
		});

	//----------------------TABS-JS----------------------
		const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
			let checkHeaderSelector = document.querySelector(headerSelector);
			let checkTabSelector = document.querySelector(tabSelector);
			let checkContentSelector = document.querySelector(contentSelector);

			if (checkHeaderSelector && checkTabSelector && checkContentSelector) {
				const header = document.querySelector(headerSelector),
							tab = document.querySelectorAll(tabSelector),
							content = document.querySelectorAll(contentSelector);
			
				function hideTabContent() {
					content.forEach(item => {
						item.style.display = "none";
					});
			
					tab.forEach(item => {
						item.classList.remove(activeClass);
					});
				}
			
				function showTabContent(i = 0) {
					content[i].style.display = "flex";
					tab[i].classList.add(activeClass);
				}
			
				hideTabContent();
				showTabContent();
			
				header.addEventListener('click', (e) => {
					const target = e.target;
					if (target && 
						(target.classList.contains(tabSelector.replace(/\./, '')) || 
						target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
						tab.forEach((item, i) => {
							if (target == item || target.parentNode == item) {
								hideTabContent();
								showTabContent(i);
							}
						});
					}
				});
			}
		};
		tabs('.tabs', '.tabs__item', '.tabs__wrap', 'active');
		tabs('.header__nav_wrap', '.header__nav_tabs--item', '.header__nav_elem', 'active');
		tabs('.tovar__tabs', '.tovar__tabs_item', '.tovar__tabs_wrap', 'active');


	//----------------------TABLE-----------------------
		const table = (tableWrapInfo, tableListInfo, tableTableInfo) => {
			const tableWrap = document.querySelector(tableWrapInfo);
			const tableList = document.querySelector(tableListInfo);
			const tableTable = document.querySelector(tableTableInfo);

			if (tableWrap && tableList && tableTable) {
				tableList.addEventListener('click', (e) => {
					e.preventDefault();
					tableWrap.classList.add('market__wrap--min');
					tableList.classList.add('open');
					tableTable.classList.remove('open');
				});
	
				tableTable.addEventListener('click', (e) => {
					e.preventDefault();
					tableWrap.classList.remove('market__wrap--min');
					tableTable.classList.add('open');
					tableList.classList.remove('open');
				});
			}


		};
		table('.market__wrap', '.market__filter_list', '.market__filter_table');

	//----------------------sli-----------------------
		const sli = (sliSlider, sliOne, sliTwo) => {
			if (sliSlider) {
				if (sliOne) {
					if (sliTwo){
						var stepsSlider = document.getElementById(sliSlider);
						var input0 = document.getElementById(sliOne);
						var input1 = document.getElementById(sliTwo);
						var inputs = [input0, input1];
						noUiSlider.create(stepsSlider, {
								start: [20, 80],
								connect: true,
								// tooltips: [true, wNumb({decimals: 1})],
								range: {
										'min': [0],
										'max': 200
								}
						});
						stepsSlider.noUiSlider.on('update', function (values, handle) {
							inputs[handle].value = values[handle];
						});
					}
				}
			}
		};
		sli('steps-slider', 'input-with-keypress-0', 'input-with-keypress-1');
		sli('steps-slider2', 'input-with-keypress-3', 'input-with-keypress-4');

});
	