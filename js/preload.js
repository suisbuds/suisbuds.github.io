var load_img = ["/images/background_always.png"];
// for (var i = 1; i <= xx; i++) {
//     // console.log(i);
//     startanmlist.push("./img/xxxxxx/"+i+".xxx");
// };
// 动画
$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd =
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
    this.addClass("animated " + animationName).one(animationEnd, function () {
      $(this).removeClass("animated " + animationName);
      callback();
    });
    return this;
  },
});
// 预加载
function loading(jQuery, fn) {
  "undefined" != typeof jQuery &&
    !(function (a) {
      "use strict";
      (a.imgpreload = function (b, c) {
        (c = a.extend(
          {},
          a.fn.imgpreload.defaults,
          c instanceof Function
            ? {
                all: c,
              }
            : c
        )),
          "string" == typeof b && (b = [b]);
        var d = [];
        a.each(b, function (index, t) {
          a.each(b[index], function (e, f) {
            var g = new Image(),
              h = f,
              i = g;
            "string" != typeof f &&
              ((h =
                a(f).attr("src") ||
                a(f)
                  .css("background-image")
                  .replace(/^url\((?:"|')?(.*)(?:'|")?\)$/gm, "$1")),
              (i = f)),
              a(g).bind("load error", function (e) {
                d.push(i),
                  a.data(i, "loaded", "error" == e.type ? !1 : !0),
                  c.each instanceof Function && c.each.call(i, d.slice(0)),
                  d.length >= load_img_total &&
                    c.all instanceof Function &&
                    c.all.call(d),
                  a(this).unbind("load error");
              }),
              (g.src = h);
          });
        });
      }),
        (a.fn.imgpreload = function (b) {
          return a.imgpreload(this, b), this;
        }),
        (a.fn.imgpreload.defaults = {
          each: null,
          all: null,
        });
    })(jQuery);
  // load_img[1] = startanmlist;
  load_img[0] = ["./img/xxx.png", "./img/xx/xxx.png"];
  var load_img_progress = 0;
  var load_img_total = 0;
  for (var i = 0, len = load_img.length; i < len; i++) {
    load_img_total += load_img[i].length;
  }
  jQuery.imgpreload(load_img, {
    each: function () {
      var status = $(this).data("loaded") ? "success" : "error";
      if (status == "success") {
        load_img_progress++;
        var percent = Math.ceil((load_img_progress / load_img_total) * 100);
        // console.log('%c imgload percent: ' + percent, 'color:green;font-size:14px;')
        $(".loadtext").html(percent + "%");
      }
    },
    all: function () {
      fn();
    },
  });
}

var audio;
loading(jQuery, function () {
  window.onload = function () {
    // audio = new Audio();
    // audio.src = 'bgm/bgm.mp3';
    // audio.loop = true;
    // wx.ready(function() {
    // audio.play()
    loadingFinish();
    //     })
  };
});

// 加载完成
function loadingFinish() {
  console.log("images load finished!");
  $(".loadbox").remove();
  $(".indexpage").removeClass("hide");
}
