var Github = {
	initialize() {
		this.fetch();
	},
	fetch() {
		$.getJSON('http://github.com/api/v1/json/quirkey?callback=?', Github.load);
	},
	load(github_data) {
		var gh = Github;
		var repositories = github_data.user.repositories;
		repositories.sort((a, b) => (a.watchers + a.forks) - (b.watchers + b.forks));
		$('.project_holder').hide();
		$.each(repositories, (i, repository) => {
			if (!repository.fork && !repository.private) {
				if (repository.watchers > 10) {
					// popular
					gh.displayRepository('popular', repository, true);
				} else {
					// other
					gh.displayRepository('other', repository, false);
				}
			}
		});
	},
	displayRepository(inside, repo, show_stats) {
		var repo_html = '<div class="repo"><h3><a href="' + repo.url + '">' + repo.name + '</a>';
		if (show_stats) {
			repo_html += ' (' + repo.watchers + ')';
		}
		repo_html += '</h3>';
		repo_html += '<p>' + repo.description + '</p>';
    if (repo.homepage) {
		  repo_html += '<p class="url"><a href="' + repo.homepage + '">&raquo; ' + repo.homepage + '</a></p>';
		}
		repo_html += '</div>';
		$('#projects_' + inside).prepend(repo_html);
	}
};

$(() => {
	Github.initialize();
})