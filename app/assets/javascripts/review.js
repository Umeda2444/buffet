window.addEventListener("load", function() {
// 雰囲気、料理、サービスの総合を計算して返す

$("#renew").on("click", function() {
    var mood_ary = ["temperature", "music", "design", "creanliness"];
    var food_ary = ["umami", "amami", "sanmi", "siomi", "nigami"];
    var service_ary = ["speed", "care", "value", "custom"];
    var mood_ave = 5;
    var food_ave = 5;
    var service_ave = 5;

    function review_ave(ary) {
      var num = 0;
      var sum = 0;
      var ave = 0;
      for (var i = 0, n = ary.length; i < n; i++ ) {
        num = $('input#review_' + ary[i]).val();
        sum += Number(num);
      }
        ave = sum / ary.length;
        return Math.round(ave);
    }

    mood_ave = review_ave(mood_ary);
    food_ave = review_ave(food_ary);
    service_ave = review_ave(service_ary);

//イベントリスナ==============================================================//
    document.getElementById('review_mood').value=mood_ave;
    document.getElementById('review_food').value=food_ave;
    document.getElementById('review_service').value=service_ave;
  });
});

