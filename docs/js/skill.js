(function($) {
	//Skill
	$('#skills .circle').eq(0).circleProgress({
		value: 0.85,
		size:170,
		thickness:8,
		fill: {color: "#27c5bc"}
	}).on('circle-animation-progress', function(event, progress){
		$(this).find('.percent').html(Math.round(85 * progress) + '%');
	});
	$('#skills .circle').eq(1).circleProgress({
		value: 0.85,
		size:170,
		thickness:8,
		fill: {color: "#27c5bc"}
	}).on('circle-animation-progress', function(event, progress){
		$(this).find('.percent').html(Math.round(85 * progress) + '%');
	});
	$('#skills .circle').eq(2).circleProgress({
		value: 0.7,
		size:170,
		thickness:8,
		fill: {color: "#27c5bc"}
	}).on('circle-animation-progress', function(event, progress){
		$(this).find('.percent').html(Math.round(70 * progress) + '%');
	});
	$('#skills .circle').eq(3).circleProgress({
		value: 0.75,
		size:170,
		thickness:8,
		fill: {color: "#27c5bc"}
	}).on('circle-animation-progress', function(event, progress){
		$(this).find('.percent').html(Math.round(75 * progress) + '%');
	});
	$('#skills .circle').eq(4).circleProgress({
		value: 0.6,
		size:170,
		thickness:8,
		fill: {color: "#27c5bc"}
	}).on('circle-animation-progress', function(event, progress){
		$(this).find('.percent').html(Math.round(60 * progress) + '%');
	});
})(jQuery);