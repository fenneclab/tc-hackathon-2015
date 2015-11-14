// import $ from 'jquery';
// var $ = require('jquery');
// require("pjax");

const app = {};
app.model = {};
app.view = {};
app.ctrl = {};
app.data = {};
app.data.result = {};
app.data.isShowingResult = false;
app.data.pageNow = "/";
app.data.isLoggedIn = false;

app.data.checkLogin = () => {
  app.data.isLoggedIn = false;
  return false;
}

window.onpopstate=function(e){
  //history.back時の動く
  if (!e.originalEvent.state) return; // 初回アクセス時に再読み込みしてしまう対策
  //ページ読み込み、描画処理
  var currentUri = location.pathname;

}

$(function(){
  // $.pjax({area: 'body'});
  /*
  * jQueryオブジェクトキャッシュ
  */
  var $pageIndex = $(".page--index"),
  $pageResult = $(".page--result");

  /*
  * (1)通信
  */
  app.model.callAPI = (param1) => {
    //pram1 = bears
    var url = "http://localhost:3000/analyze"
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      cache: false,
      success: (msg) => {
        // console.log(msg);
        app.data.result = msg;
        // $.pjax({
        //   area: ".page",
        //   callbacks: {
        //     update: {
        //       complete :app.view.writeResult()
        //     }
        //   }
        // });
        // location.href = "result.html";

        app.view.writeResult()

      }
    });
  }


  /*
  * 描画: 結果取得
  */
  app.view.writeResult = () => {
    console.log(app.data.result);
    // console.log(app.data.result.bears);
    console.log("write");
    for (var i=0; i<app.data.result.length; i++) {
      var data = app.data.result[i];
      // $("#result").append("<div class='profile--id'>"+ data.id + "</div>");
      var html = "<div class='profile'>";
      html += "<img class='profile__img' src='"+ data.image + "'/>";
      html += "<div class='profile__match'>マッチ度："+ data.matched + "</div>";
      html += "<divclass='profile__name'>"+ data.name + "(" + data.age+ ")</div>";
      html += "</div>"
      $("#result").append(html);
      // $("#result").append("<divclass='profile--age'>年齢："+ data.age + "</div>");
    }
    app.view.changePage($pageIndex, $pageResult, "result");

    // $("#result").html(app.data.result);
  }


  /*
  * 描画: ページ遷移
  */
  app.view.changePage = (prev, next, uri) => {
    history.pushState({}, uri);
    console.log(prev);
    prev.removeClass("page--show");
    next.addClass("page--show");
  }

  /*
  * (3)DOM Event
  */
  $(".js--submit").on("click", () => {
    var userId = $(".js--input").attr("value");
    app.model.callAPI(userId);
  });

  /*
  * (4)Pjax
  */


});
