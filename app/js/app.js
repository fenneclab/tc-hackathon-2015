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
    app.model.login();
  });

  /*
  * (4)Pjax
  */


});
