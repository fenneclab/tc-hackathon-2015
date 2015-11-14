import $ from 'jquery';
// import pjax from 'simple-pjax';

const app = {};
app.model = {};
app.view = {};
app.ctrl = {};
app.data = {};
app.data.result = {};
app.data.isShowingResult = false;


$(function(){
  // $("body").text("yo");

  /*
  * (1)通信
  */
  app.model.callAPI = (param1) => {
    //pram1 = bears
    var url = "http://localhost:3000/" + param1
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      cache: false,
      success: (msg) => {
        console.log(msg);
        app.data.result = msg;
        app.view.writeResult();
      }
    });
  }

  /*
  * (2)描画
  */
  app.view.writeResult = () => {
    // console.log(app.data.result);
    // console.log(app.data.result.bears);

    for (var i=0; i<app.data.result.bears.length; i++) {
      var data = app.data.result.bears[i];
      console.log(data);
      $("#result").append("<div>"+ data.id + "</div>");
      $("#result").append("<div>"+ data.name + "</div>");
    }
    // $("#result").html(app.data.result);
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
