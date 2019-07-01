(function() {

$('#toggleArchives').click(function() {
	if($(this).hasClass('toggled')) $('#main .projects .item.archive').fadeOut();
	else $('#main .projects .item.archive').fadeIn();
	$(this).toggleClass('toggled');
});
$('#toggleForks').click(function() {
	if($(this).hasClass('toggled')) $('#main .projects .item.fork').fadeOut();
	else $('#main .projects .item.fork').fadeIn();
	$(this).toggleClass('toggled');
});

$.get('https://api.github.com/users/matiboux').done(function(response) {
	$('#avatar').attr('src', response.avatar_url);
});

$('#main > section').each(function() {
	var id = $(this).attr('id');
	console.log(id);
	$.get('https://api.github.com/users/' + id + '/repos').done(function(response) {
		var $element = $('<div>').addClass('projects');
		$.each(response, function(i, data) {
			$element.append(
				$('<article>').addClass('item').addClass(data.archived ? 'archive' : '').addClass(data.fork ? 'fork' : '').css('display', (data.archived || data.fork) ? 'none' : 'block').append(
					$('<h3>').append($('<a>').attr('href', data.html_url).html(data.name)),
					$('<p>').html(data.description),
					/*$('<ul>').append(
						$('<li>').html('Last udpated: ' + data.updated_at)
					),*/
					$('<ul>').addClass('infos').append(
						data.archived ? $('<li>').addClass('active').append($('<i>').addClass('fas fa-archive fa-fw')) : [],
						data.fork ? $('<li>').addClass('active').append($('<i>').addClass('fas fa-code-branch fa-fw')) : [],
						$('<li>').addClass(data.language ? 'active' : '').append($('<i>').addClass('fas fa-code fa-fw'), ' ', data.language ? data.language : ''),
						$('<li>').addClass(data.license ? 'active' : '').append($('<i>').addClass('fas fa-balance-scale fa-fw'), ' ', data.license ? data.license.spdx_id : 'None'),
						data.homepage ? $('<li>').addClass('active').append($('<a>').attr('href', data.homepage).append($('<i>').addClass('fas fa-globe fa-fw'), ' Website')) : [],
						
					),
					$('<ul>').addClass('stats').append(
						$('<li>').addClass(data.stargazers_count > 0 ? 'active' : '').append($('<i>').addClass('fas fa-star fa-fw'), ' ', data.stargazers_count),
						$('<li>').addClass(data.watchers_count > 0 ? 'active' : '').append($('<i>').addClass('fas fa-eye fa-fw'), ' ', data.watchers_count),
						$('<li>').addClass(data.forks_count > 0 ? 'active' : '').append($('<i>').addClass('fas fa-code-branch fa-fw'), ' ', data.forks_count)
					)
				)
			)
		});
		$('#' + id).append($element);
	}).fail(function() {
		$('#' + id).append($('<p>').addClass('error').html('An error occurred.'));
	});
});

})();
