$(document).ready(function() {
  var $main_name = $("#main-visual .inner div h2"),
  $main_line = $("#main-visual .inner div span"),
  $main_title1 = $("#main-visual .inner div .visual-title1"),
  $main_title2 = $("#main-visual .inner div .visual-title2");

  $main_name.animate({ bottom: "0", opacity: "1"}, 300, "swing");
  $main_line.delay(1000).animate({ width: "100px" }, 500, "swing");
  $main_title1.delay(300).animate({ bottom: "0", opacity: "1"}, 300, "swing");
  $main_title2.delay(500).animate({ bottom: "0", opacity: "1"}, 300, "swing");




  if ($('#skills .circle').length) {
    $c = $('#skills .circle');

    $(window).bind('scroll', function () {
        $c.each(function () {
            var $t = $(this);
            if (!$t.data('count') && $(window).scrollTop() + $(window).height() >= $t.offset().top) {
                $t.data('count', true);

                $('#skills .circle').circleProgress({
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
            }
        });
    });
  }

  var winW = $(window).width();
  if(winW < 1380) {
   $("#intro h2, #intro span").addClass("slide");
  }


  $(window).scroll(function() {
    $(".slideon").each(function(){
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 700) {
            $(this).addClass("slide");
        }
    });

  });
});

$(window).resize(function() {
  var winW = $(window).width();
  if(winW < 1380) {
   $("#intro h2, #intro span").addClass("slide");
  }
});