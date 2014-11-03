$(function(){

  // entry fade
  $(".post-list-item").hover(function(){
    rollIn($(this));
  }, function(){
    rollOut($(this));
  });
  $(".post-list-item").click(function(){
    rollOut($(this));
  });

  $(".page-button").hover(function(){
    rollIn($(this));
  }, function(){
    rollOut($(this));
  });
  $(".page-button").click(function(){
    rollOut($(this));
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
        var title = data.match(/<title>(.*)<\/title>/)[1];
        if(title != ""){
          $($titles[i]).text(title);
        }else{
          $($titles[i]).parent('li').remove();
        }
      }
    });
  });
});

function rollIn(body){
  body.stop().animate({backgroundColor:"#9694b1", color:"#fdfdfd"}, 50);
  body.children(".post-link").stop().animate({color:"#fdfdfd"}, 50);
}

function rollOut(body){
  body.stop().animate({backgroundColor:"#fdfdfd", color:"#4a4a46"}, 100);
  body.children(".post-link").stop().animate({color:"#4a4a46"}, 100);
}
