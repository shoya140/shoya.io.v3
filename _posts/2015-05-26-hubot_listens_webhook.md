---
layout: post
title: SlackのIncoming WebhooksをHubotで拾う
categories: ['server']
tags: ['Programming']
published: True
---

Hubotがチャット上の投稿を拾うにはhear(全てに反応)とrespond(呼ばれたら反応)という2つの方法があるのだけれど、無限ループを防ぐためか、どちらもbotの発言を拾うことができない。botの発言にも反応させたいときはcatchAllを使う。catchAllで投稿を一旦受け取り、正規表現で発言が必要か判断すれば良い。

{% highlight coffeescript %}
module.exports = (robot) ->
  robot.catchAll (msg) ->
    r = new RegExp "(.*)(どーなつ|ドーナツ)(.*)", "i"
    matches = msg.message.text.match(r)
    if matches == null or matches.length == 0
      return
    msg.send "どーんと行こう！"
{% endhighlight %}

この方法はIncoming Webhooksをトリガーに発言させたい時に役に立つ。例えばうちのbotには下記の仕組みで夜になったら日報を作成してもらっている。

1. 日が沈むとIFTTTが「今日も一日お疲れさまです」と投稿する
1. 「お疲れさまです」というキーワードに反応して、botがtodoistから今日一日に完了したタスクを取得して投稿する

他にもテストの結果に応じて一喜一憂させてみるなど、合いの手をひとつ入れるだけで会話が盛り上がって楽しいと思う。