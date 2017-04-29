var Quirkey = {
	initialize() {
		this.quirkey_nav.initialize();
	},
	quirkey_nav: {
		opened: false,
		initialize() {
			var port = this;
			$('.quirkey_nav_open').click(() => {
				if (port.opened) {
					port.close();
				} else {
					port.open();
				}
			});
			$('.quirkey_nav_close').click(() => {
				port.close();
			});
		},
		open() {
			this.initial_top = $('#logo').css('top');
			$('#logo').animate({'top': '0px'}, 400);
			$('#quirkey_nav').slideDown(400, () => {
				$('.quirkey_nav_close').slideDown();
			});
			this.opened = true;
		},
		close() {
			$('.quirkey_nav_close').hide();
			$('#logo').animate({'top': this.initial_top}, 400);
			$('#quirkey_nav').slideUp(400);
			this.opened = false;
		}
	}
};


$(() => {
	Quirkey.initialize();
})