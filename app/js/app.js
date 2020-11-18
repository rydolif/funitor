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
			// navigation: {
			// 	nextEl: '.hero__next',
			// 	prevEl: '.hero__prev',
			// },
			// breakpoints: {
			// 	320: {
			// 		slidesPerView: 1,
			// 		spaceBetween: 20
			// 	},
			// }
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
		// const hamburger = (hamburgerButton, hamburgerNav, hamburgerHeader) => {
		// 	const button = document.querySelector(hamburgerButton),
		// 				nav = document.querySelector(hamburgerNav),
		// 				header = document.querySelector(hamburgerHeader);
	
		// 	button.addEventListener('click', (e) => {
		// 		// button.classList.toggle('hamburger--active');
		// 		nav.classList.toggle('nav-catalog--active');
		// 		header.classList.toggle('header--menu');
		// 	});
	
		// };
		// hamburger('.header__hamburger', '.nav-catalog', '.header');

	//----------------------HAMBURGER-REMOVE----------------------
		const hamburgerClose = (hamburgerCloseButton, hamburgerCloseNav, hamburgerCloseHeader) => {
			const buttonClose = document.querySelector(hamburgerCloseButton),
						navClose = document.querySelector(hamburgerCloseNav),
						headerClose = document.querySelector(hamburgerCloseHeader);
	
			buttonClose.addEventListener('click', (e) => {
				// buttonClose.classList.remove('hamburger--active');
				navClose.classList.remove('nav-catalog--active');
				headerClose.classList.remove('header--menu');
			});
	
		};
		hamburgerClose('.nav-catalog__hamburger', '.nav-catalog', '.header');
		
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
							item.style.display = 'flex';
							document.body.classList.add('modal--open')
						});
					}

					close.addEventListener('click', () => {
						item.style.display = 'none';
						document.body.classList.remove('modal--open');
					});

					item.addEventListener('click', (e) => {
						if (e.target === item) {
							item.style.display = 'none';
							document.body.classList.remove('modal--open');
						}
					});
				});
			}

		};
		modals('.modal');

	//----------------------FORM-----------------------
		const forms = (formsSelector) => {
			const form = document.querySelectorAll(formsSelector);
			let i = 1;
			let img = 1;
			let lebel = 1;
			let prev = 1;

			form.forEach(item => {
				const elem = 'form--' + i++;
				item.classList.add(elem);

				let formId = item.id = (elem);
				let formParent = document.querySelector('#' + formId);

				formParent.addEventListener('submit', formSend);

				async function formSend(e) {
					e.preventDefault();
			
					let error = formValidate(item);
			
					let formData = new FormData(item);
					formData.append('image', formImageAdd.files[0]);

					if (error === 0) {
						item.classList.add('_sending');
						let response = await fetch('sendmail.php', {
							method: 'POST',
							body: formData
						});
			
						if (response.ok) {
							let modalThanks = document.querySelector('#modal--thanks');
							formParent.parentNode.style.display = 'none';

							modalThanks.style.display = 'flex';
							document.body.classList.add('modal--open');
							formPreview.innerHTML = '';
							item.reset();
							item.classList.remove('_sending');
						} else {
							alert('Ошибка при отправке');
							item.classList.remove('_sending');
						}
			
					}
				}
			
				function formValidate(item) {
					let error = 0;
					let formReq = formParent.querySelectorAll('._req');

					for (let index = 0; index < formReq.length; index++) {
						const input = formReq[index];
						// formRemoveError(input);
			
						if (input.classList.contains('_email')) {
							if(emailTest(input)) {
								formAddErrorEmail(input);
								error++;
							}
						} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
							formAddErrorCheck(input);
							error++;
						} else {
							if (input.value === '') {
								formAddError(input);
								error++;
							}
						}
					}
					return error;
				}
			
				//картинка в форме
				const formImage = formParent.querySelector('.formImage');
				const formLebel = formParent.querySelector('.formLebel');
				const formPreview = formParent.querySelector('.formPreview');

				let formImageNumber = 'formImage--' + img++;
				let formPreviewNumber = 'formPreview--' + prev++;
				
				formImage.id = (formImageNumber);
				formLebel.htmlFor = ('formImage--' + lebel++);
				formPreview.id = (formPreviewNumber);
				const formImageAdd = document.querySelector('#' + formImageNumber);

				// изменения в инпуте файл
				formImageAdd.addEventListener('change', () =>  {
					uploadFile(formImage.files[0]);
				});
			
				function uploadFile(file) {
			
					if (!['image/jpeg', 'image/png', 'image/gif', 'image/ico'].includes(file.type)) {
						alert('Только изображения');
						formImage.value = '';
						return;
					}
			
					if (file.size > 2 * 1024 * 1024) {
						alert('Размер менее 2 мб.');
						return;
					}
			
					var reader = new FileReader();
					reader.onload = function (e) {
						formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
					};
					reader.onerror = function (e) {
						alert('Ошибка');
					};
					reader.readAsDataURL(file);
				}
			
				function formAddError(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введите данные в поле";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}
			
				function formAddErrorEmail(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Введите свою почту";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}
			
				function formAddErrorCheck(input) {
					let div = document.createElement('div');
					div.classList.add("form__error");
					div.innerHTML = "Согласие на обработку персональных данных";

					input.parentElement.append(div);
					input.parentElement.classList.add('_error');
					input.classList.add('_error');
				}
			
				function emailTest(input) {
					return !/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/. test(input.value);
				}
			
				// function phoneTest(input) {
				// 	return !/\+[0-9]{1}\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}/. test(input.value);
				// }
			});
		};
		forms('.form');

	//----------------------ACARDION-----------------------
		$(".block__content").slideUp("slow");
		$(".block").first().addClass('active');
		$(".active .block__content").slideDown("slow");

		$(".block__header").on("click", function(){
			if ($(this).parent().hasClass('active')) {
				$(this).parent().removeClass('active');
				$(".block__content").slideUp("slow");
			}
			else {
				$(".active .block__content").slideUp("slow");
				$(".active").removeClass('active');
				$(this).parent().addClass('active');
				$(".active .block__content").slideDown("slow");
			}
		});

	//----------------------slider-----------------------
		var stepsSlider = document.getElementById('steps-slider');
		var input0 = document.getElementById('input-with-keypress-0');
		var input1 = document.getElementById('input-with-keypress-1');
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
	
	//----------------------TABS-JS----------------------
		const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
			let check = document.querySelector(headerSelector);

			if (check) {
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



});
	