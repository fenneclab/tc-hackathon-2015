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

app.data.activeDetailId = null;
app.data.backTo = "result";
app.data.favIds = [];
app.mock = {};
app.mock.weitingTime = 3000;

// app.data.checkLogin = () => {
//   app.data.isLoggedIn = false;
//   return false;
// }


$(function(){
  /*
  * jQueryオブジェクトキャッシュ
  */
  var
  $page = $(".page"),
  $pageIndex = $(".page--index"),
  $pageResult = $(".page--result"),
  $pageCollection = $(".page--collection"),
  $pageDetail = $(".page--detail");

  /*
  * (1)通信
  */
  app.model.login = (param1) => {
    app.view.topLoading();
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


        // AWS.config.credentials.get(function() {
        //   var client = new AWS.CognitoSyncManager({log: function(e) {
        //     console.log(e);
        //   }});
        //   client.openOrCreateDataset('userProfile', function(err, dataset) {
        //     if (err) {
        //       console.error(err);
        //     }
        //     dataset.put('fbToken', response.authResponse.accessToken, function(err, record) {
        //       if ( !err ) {
        //         dataset.synchronize({
        //           onSuccess: function(dataset, newRecords) {
        //             console.log("Data saved successfully.");
        //           },
        //           onFailure: function(err) {
        //             console.error(err);
        //             console.log("Error occured.");
        //           },
        //           onConflict: function(dataset, conflicts, callback) {
        //             var resolved = [];
        //             console.log(conflicts);
        //             for (var i=0; i < conflicts.length; i++) {
        //               resolved.push(conflicts[i].resolveWithRemoteRecord());
        //             }
        //             dataset.resolve(resolved, function(err) {
        //               if (err) {
        //                 console.error(err);
        //               }
        //               callback(true);
        //             });
        //           },
        //           onDatasetDeleted: function(dataset, datasetName, callback) {
        //             return callback(true);
        //           },
        //           onDatasetMerged: function(dataset, datasetNames, callback) {
        //             return callback(false);
        //           }
        //         });
        //       }
        //     });
        //   });
        // });
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

            AWS.config.update({
              accessKeyId: data.Credentials.AccessKeyId,
              secretAccessKey: data.Credentials.SecretKey,
              sessionToken: data.Credentials.SessionToken,
              region: 'ap-northeast-1'
            });

            var lambda = new AWS.Lambda();

            lambda.invoke({
              FunctionName: "TCHackaThon2015Analyze",
              InvocationType: "RequestResponse",
              Payload: JSON.stringify({fbToken: response.authResponse.accessToken})
            }, function(err, result) {
              if(err) {
                console.error(err);
              }
              app.data.result = JSON.parse(result.Payload);
              app.view.writeResult();
            });
          });
        });

      } else {
        console.error('There was a problem logging you in.');
      }
    }, {scope: 'user_posts'});
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
     })
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
      var html = "<div class='profile'><a class='profile__inner js--btn--detail' data-id="+ data.id + ">";
      html += "<img class='profile__img' src='"+ data.image + "'/>";
      // html += "<div class='profile__match'>"+ data.matched + "</div>";
      html += "<div class='profile__name'>"+ data.name + "(" + data.age+ ")</div>";
      html += "<div class='profile__job'>"+ data.address + "," + data.job + "</div>";
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
    $page.removeClass("page--show");
    next.addClass("page--show");
  }


  app.view.setDetail = (targetUser) => {
    $(".detail__img").attr("src",targetUser.image);
    $(".detail__name").text(targetUser.name + "(" + targetUser.age + ")");
    $(".detail__job").text(targetUser.address + ","+ targetUser.job);
    $(".detail__matchHearts").removeClass(function(index, className) {
    return (className.match(/\bdetail__matchHearts--\S+/g) || []).join(' ');
});
    if(targetUser.matched < 10){
      $(".detail__matchHearts").addClass("detail__matchHearts--10");
    }else if(targetUser.matched < 20){
      $(".detail__matchHearts").addClass("detail__matchHearts--20");
    }else if(targetUser.matched < 30){
      $(".detail__matchHearts").addClass("detail__matchHearts--30");
    }else if(targetUser.matched < 40){
      $(".detail__matchHearts").addClass("detail__matchHearts--40");
    }else if(targetUser.matched < 50){
      $(".detail__matchHearts").addClass("detail__matchHearts--50");
    }else if(targetUser.matched < 60){
      $(".detail__matchHearts").addClass("detail__matchHearts--60");
    }else if(targetUser.matched < 70){
      $(".detail__matchHearts").addClass("detail__matchHearts--70");
    }else if(targetUser.matched < 80){
      $(".detail__matchHearts").addClass("detail__matchHearts--80");
    }else if(targetUser.matched < 90){
      $(".detail__matchHearts").addClass("detail__matchHearts--90");
    }else{
      $(".detail__matchHearts").addClass("detail__matchHearts--100");
    }
    $(".js--d--match").text(targetUser.matched);

    $(".detail__type").html(targetUser.AIType[0] + "。<br>本当はもっと" + targetUser.AIType[1] + "。");
    app.data.activeDetailId = targetUser.id;
    app.view.changePage({}, $pageDetail);
  }

  app.view.setCollection = () => {
    for(var i=0; i < app.data.result.length; i ++){
      if(app.data.favIds.indexOf(app.data.result[i].id) !== -1){
        var data = app.data.result[i];
        // $("#result").append("<div class='profile--id'>"+ data.id + "</div>");
        var html = "<div class='profile'><a class='profile__inner js--btn--detail' data-id="+ data.id + ">";
        html += "<img class='profile__img' src='"+ data.image + "'/>";
        // html += "<div class='profile__match'>"+ data.matched + "</div>";
        html += "<div class='profile__name'>"+ data.name + "(" + data.age+ ")</div>";
        html += "<div class='profile__job'>"+ data.address + ","+  data.job + "</div>";
        html += "</a></div>"
        $("#collection").append(html);
      }
    }

  }

  /*
  * (3)DOM Event
  */
  $(".js--submit").on("click", () => {
    app.model.login();
    // app.model.loginMock();
  });

  $(".js--btn--collection").on("click", (e) => {
    // app.model.login();
    e.preventDefault();
    app.data.backTo = "collection";
    app.view.setCollection();
    app.view.changePage($pageResult,$pageCollection,"collection");
  });
  $(".js--btn--result").on("click", (e) => {
    // app.model.login();
    e.preventDefault();
    app.data.backTo = "result";
    app.view.changePage($pageCollection,$pageResult,"result");
  });
  $(".js--btn--detailBack").on("click",function(e){
    e.preventDefault();
    if(app.data.backTo === "collection"){
      app.view.changePage($pageResult,$pageCollection,"collection");
    }else{
      app.view.changePage($pageCollection,$pageResult,"result");
    }
  });
  $(".js--btn--like").on("click",function(e){
    e.preventDefault();
    // console.log($(this).data("id"));
    if(app.data.favIds.indexOf(app.data.activeDetailId) !== -1){
      app.data.favIds.some(function(v, i){
         if (v==app.data.activeDetailId) app.data.favIds.splice(i,1);
      });
      $(".btn--like").removeClass("on");
    }else{
      app.data.favIds.push(app.data.activeDetailId);
      $(".btn--like").addClass("on");
    }
    console.log(app.data.favIds);
  });
  $(document).on("click",".js--btn--detail" ,function(e){
    var that = this;
    e.preventDefault();
    var userId = parseInt($(this).data("id"));
    var targetUser = {};
    for(var i=0; i < app.data.result.length; i++){
      if(parseInt(app.data.result[i].id) === userId){
        targetUser = app.data.result[i];
        break;
      }
    }

    console.log(targetUser);
    app.view.setDetail(targetUser);
  })
  /*
  * (4)Pjax
  */


});
