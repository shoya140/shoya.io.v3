$(function(){

  // entry fade
  $(".post-list-item").hover(function(){
    rollIn($(this), "#9694b1");
  }, function(){
    rollOut($(this), "#4a4a46");
  });
  $(".post-list-item").click(function(){
    rollOut($(this));
  });

  $(".page-button").hover(function(){
    rollIn($(this), "#9694b1");
  }, function(){
    rollOut($(this), "#4a4a46");
  });
  $(".page-button").click(function(){
    rollOut($(this), "#4a4a46");
  });

  $(".tweet-button").hover(function(){
    rollIn($(this), "#55acee");
  }, function(){
    rollOut($(this), "#9694b1");
  });
  $(".tweet-button").click(function(){
    rollOut($(this), "#9694b1");
  });

  $(".facebook-button").hover(function(){
    rollIn($(this), "#3b5998");
  }, function(){
    rollOut($(this), "#9694b1");
  });
  $(".facebook-button").click(function(){
    rollOut($(this), "#9694b1");
  });

  $(".hatenabookmark-button").hover(function(){
    rollIn($(this), "#00a8df");
  }, function(){
    rollOut($(this), "#9694b1");
  });
  $(".hatenabookmark-button").click(function(){
    rollOut($(this), "#9694b1");
  });


  // hatena ster
  Hatena.Star.EntryLoader.headerTagAndClassName = ['div','hatena-star'];

  // image fade
  $(".image-fade").css('visibility','visible').hide().fadeIn(800);

  // twitter
  $(".twitter-tweet").addClass('tw-align-center');

  // getTitleofLinkedPage
  var $titles = $(".linkedTitle");
  $titles.each(function(i){
    var title = "";
    $.ajax({
      type:'GET',
      url:$(this).attr("href"),
      dataType:'html',
      success:function(data, textStatus, jqXHR){
        var title = data.match(/<title>(.*) - SHOYA.IO<\/title>/)[1];
        if(title != ""){
          $($titles[i]).text(title);
        }else{
          $($titles[i]).parent('li').remove();
        }
      }
    });
  });
});

function rollIn(body, color){
  body.stop().animate({backgroundColor:color, color:"#fdfdfd"}, 50);
  body.children("a").stop().animate({color:"#fdfdfd"}, 50);
  body.children("h2").stop().animate({color:"#fdfdfd"}, 50);
}

function rollOut(body, color){
  body.stop().animate({backgroundColor:"#fdfdfd", color:color}, 100);
  body.children("a").stop().animate({color:color}, 100);
  body.children("h2").stop().animate({color:color}, 100);
}
