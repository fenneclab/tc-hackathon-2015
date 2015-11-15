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
  app.model.login = (param1) => {
    //pram1 = bears
    FB.login(function(response) {
      if (response.authResponse) {
        AWS.config.region = 'ap-northeast-1';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'ap-northeast-1:0f6f04d8-73c8-486a-8e31-8eaea50ee3a2',
          Logins: {
            'graph.facebook.com': response.authResponse.accessToken
          }
        });

        console.log('You are now logged in.');

        var cognitoidentity = new AWS.CognitoIdentity();
        cognitoidentity.getId({
          IdentityPoolId: 'ap-northeast-1:0f6f04d8-73c8-486a-8e31-8eaea50ee3a2',
          Logins: {
            'graph.facebook.com': response.authResponse.accessToken
          }
        }, function(err, data) {
          if (err) {
            console.error(err);
          }
          cognitoidentity.getCredentialsForIdentity({
            IdentityId: data.IdentityId,
            Logins: {
              'graph.facebook.com': response.authResponse.accessToken
            }
          }, function(err, data) {
            if (err) {
              console.error(err);
            }
            var apigClient = apigClientFactory.newClient({
              accessKey   : data.Credentials.AccessKeyId,
              secretKey   : data.Credentials.SecretKey,
              sessionToken: data.Credentials.SessionToken,
              region      : 'ap-northeast-1'
            });
            console.log(response.authResponse.accessToken);
            apigClient.analyzeGet({"fb_token": response.authResponse.accessToken}, {}).then(function(result) {
              app.data.result = result.data;
              app.view.writeResult()
            }).catch(function(err) {
              console.error(err);
            });
          });
        });

      } else {
        console.log('There was a problem logging you in.');
      }
    });
  }

  app.model.loginMock = (param1) => {
    //pram1 = bears
    app.view.topLoading();
    setTimeout(()=>{
      var url = "/stub/dummy.json";
      $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        cache: false,
        success: function success(msg) {
          app.data.result = msg;
          app.view.writeResult();
        }
      });
    },5000);
  }


  /*
  * 描画: 結果取得
  */
  app.view.topLoading = () => {
    $(".img--topLogo").addClass("loading");
    $(".img--topLogo__heart").attr('class', function(index, classNames) {
      return classNames + ' loading';
    });
    $(".title--main").addClass("fadeOut");
    $(".text--top").addClass("fadeOut");
    $(".btn--facebook").addClass("fadeOut");
    $(".text--alreadyLogin__wrap").addClass("fadeOut");
  }

  app.view.writeResult = () => {
    console.log(app.data.result);
    console.log("write");
    for (var i=0; i<app.data.result.length; i++) {
      var data = app.data.result[i];
      // $("#result").append("<div class='profile--id'>"+ data.id + "</div>");
      var html = "<div class='profile'><div class='profile__inner'>";
      html += "<img class='profile__img' src='"+ data.image + "'/>";
      // html += "<div class='profile__match'>"+ data.matched + "</div>";
      html += "<div class='profile__name'>"+ data.name + "(" + data.age+ ")</div>";
      html += "<div class='profile__job'>"+ data.job + "</div>";
      html += "</div></div>"
      $("#result").append(html);
    }
    app.view.changePage($pageIndex, $pageResult, "result");

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
    // app.model.login();
    app.model.loginMock();
  });

  /*
  * (4)Pjax
  */


});
