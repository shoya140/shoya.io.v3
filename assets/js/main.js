$(function(){

  $("a[href^='http']:not([href*='" + location.hostname + "'])").attr('target', '_blank');

  // entry fade
  $(".post-list-item").hover(function(){
    rollIn($(this), "#9694b1");
  }, function(){
    rollOut($(this), "#1e1e28");
  });
  $(".post-list-item").click(function(){
    rollOut($(this));
  });

  $(".page-button").hover(function(){
    rollIn($(this), "#9694b1");
  }, function(){
    rollOut($(this), "#1e1e28");
  });
  $(".page-button").click(function(){
    rollOut($(this), "#1e1e28");
  });

  $(".index-outer").hover(function () {
    rollIn($(this), "#e6eBf0");
    rollIn($(this).find('.index-inner'), "#e6eBf0");
  }, function () {
    rollOut($(this), "#1e1e28");
    rollOut($(this).find('.index-inner'), "#1e1e28");
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

  // image fade
  $(".image-fade").css('visibility','visible').hide().fadeIn(800);

  // get titles of linked pages
  var $titles = $(".linkedTitle");
  $titles.each(function(i){
    var title = "";
    $.ajax({
      type:'GET',
      url:$(this).attr("href"),
      dataType:'html',
      success:function(data, textStatus, jqXHR){
        var title = data.match(/<title>(.*) - shoya.io<\/title>/)[1];
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

function mail(){
  var s="FI=;NCIHeBL?@tYG;CFNIqMBIS;eCMBCG;LOwAG;CFe=IGY",r="";
  for(i=0;i<s.length;i++)r+=String.fromCharCode((s.charCodeAt(i)+5)%93+33);eval(r);
}
