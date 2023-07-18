// ドロワーjs
document.addEventListener('DOMContentLoaded', function() {
	
	var bg = $('.drawer__overlay');
	var btn = $('.drawer__btn');
	var menu = $('.drawer__menu');
	var body = $('body');
	var active = 'is-drawer-active';

	function toggle() {
		if (!btn.hasClass(active)) {
			menu.addClass(active);
			bg.addClass(active);
			btn.addClass(active);
			body.addClass(active);

		} else {
			menu.removeClass(active);
			bg.removeClass(active);
			btn.removeClass(active);
			body.removeClass(active);
		}
	}

	bg.on('click', toggle);
	btn.on('click', toggle);


});

// Swiperの初期化コード
function initializeSwiper() {
	var testSwiper = new Swiper('#swiper-container', {
		initialSlide: 0,
		spaceBetween: 10,
		slidesPerView: 2.5,
		speed: 400,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
		loop: true,
	});

	// Swiperを表示する
	$('#swiper-container').show();

	// スケルトンスクリーンを非表示にする
	$('#skeleton-screen').hide();
}

// ページの読み込みが完了した時に実行
$(window).on('load', function() {
	// スケルトンスクリーンを表示する
	$('#skeleton-screen').show();

	// 800ミリ秒の遅延後にSwiperを初期化
	setTimeout(initializeSwiper, 800);
});

