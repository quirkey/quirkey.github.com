var Quirkey = {
	initialize: function() {
		this.quirkey_nav.initialize();
		this.github.initialize();
	},
	quirkey_nav: {
		opened: false,
		initialize: function() {
			var port = this;
			$('.quirkey_nav_open').click(function() {
				if (port.opened) {
					port.close();
				} else {
					port.open();
				}
			});
			$('.quirkey_nav_close').click(function() {
				port.close();
			});
		},
		open: function() {
			this.initial_top = $('#logo').css('top');
			$('#logo').animate({'top': '0px'}, 400);
			$('#quirkey_nav').slideDown(400, function() {
				$('.quirkey_nav_close').slideDown();
			});
			this.opened = true;
		},
		close: function() {
			$('.quirkey_nav_close').hide();
			$('#logo').animate({'top': this.initial_top}, 400);
			$('#quirkey_nav').slideUp(400);
			this.opened = false;
		}
	},
	github: {
		initialize: function () {
			this.fetch();
		},
		fetch: function() {
			$.getJSON('http://github.com/api/v1/json/quirkey?callback=?', Quirkey.github.load);
		},
		load: function(github_data) {
			var gh = Quirkey.github;
			var repositories = github_data.user.repositories;
			repositories.sort(function(a,b) {
				return b.watchers - a.watchers;
			});
			$.each(repositories, function(i, repository) {
				if (!repository.fork && !repository.private) {
					if (repository.watchers > 2) {
						// popular
						gh.displayRepository('popular', repository);
					} else {
						// other
						gh.displayRepository('other', repository);
					}
				}
			});
		},
		displayRepository: function(inside, repo) {
			var repo_html = '<div class="repo"><h3><a href="' + repo.url + '">' + repo.name + '</a> (' + repo.watchers + ')</h3>';
			repo_html += '<p>' + repo.description + '</p></div>';
			$('#projects_' + inside).append(repo_html);
		}
	}
};


$(function() {
	Quirkey.initialize();
})