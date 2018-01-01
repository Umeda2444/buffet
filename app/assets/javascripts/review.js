document.addEventListener("turbolinks:load", function() {

// 雰囲気、料理、サービスの総合を計算して返す
  $("#renew").on("click", function() {
    var mood_ary = ["mood", "temperature", "music", "design", "creanliness"];
    var food_ary = ["food", "umami", "amami", "sanmi", "siomi", "nigami"];
    var service_ary = ["service", "speed", "care", "value", "custom"];

    function review_ave(ary) {
      var num = 0;
      var sum = 0;
      var ave = 0;
      var review_val = ""
      var review_val_face = ""

      for (var i = 1, n = ary.length; i < n; i++ ) {
        num = $('input#review_' + ary[i]).val();
        sum += Number(num);
      }
      ave = sum/ (ary.length-1) * 10;
      review_val = "review_" + ary[0];
      review_val_face = review_val + "_face";

      document.getElementById(review_val).value=ave;
      document.getElementById(review_val_face).innerHTML=Math.round(ave) / 10;
    }

    review_ave(mood_ary);
    review_ave(food_ary);
    review_ave(service_ary);
  });
});



