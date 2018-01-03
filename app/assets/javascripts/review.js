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
      var val_ary = [];

      for (var i = 1, n = ary.length; i < n; i++ ) {
        num = $('input#review_' + ary[i]).val();
        sum += Number(num);
        val_ary.push(Number(num));
      }
      ave = sum/ (ary.length-1) * 10;
      review_val = "review_" + ary[0];
      review_val_face = review_val + "_face";

      document.getElementById(review_val).value=ave;
      document.getElementById(review_val_face).innerHTML=Math.round(ave) / 10;
      val_ary.unshift(Math.round(ave) / 10);
      return val_ary;
    }

    var array = review_ave(mood_ary);

    review_ave(food_ary);
    review_ave(service_ary);


  // 幅（ Width ）と高さ（ height ）
  var w = 500; var ox = w/2; //原点ｘ軸
  var h = 500; var oy = h/2; //原点ｙ軸
  var padding = 50;
  var r = (w/2)*0.8 //背景の円半径


  var dataset = [];
  dataset.push(array);
  var datalength = dataset[0].length;
  console.log(datalength);
  var carlev = 10;//評価のランク数
  var sss = 10;//目盛り線の長さ)
  var ssd = 0.2; //目盛り間隔


  // SVG 要素の生成
  var svg = d3.select("body")
    .append("svg"
    )
    .attr("width", w
    )
    .attr("height", h
    );

  //背景円生成
  var backcir = svg.append("circle")
    .attr("class", "back-cir"
    )
    .attr("cx", ox
    )
    .attr("cy", oy
    )
    .attr("r", r
    );

  //評価軸の設定
  for(var z = 0; z < datalength; z++){
  svg.append('line')
    .attr('x1', ox)
    .attr('y1', oy)
    .attr('x2', function(){
      var x = ox;
      var rad = -1 * (2 * Math.PI / (datalength) *z +(Math.PI / 2));
      x = ox + Math.cos(rad) * r;
      return x;
    })
    .attr('y2', function(){
      var y = oy;
      var rad = (2 * Math.PI / (datalength) *z +(Math.PI / 2));
      y = oy - Math.sin(rad) * r;
      return y;
    })
    .attr("stroke", "rgb(255,255,255)")
    .attr("stroke-width", 5)
    .attr('fill', 'none');

    //目盛り線の生成
    var scalenumber = 1 / ssd//目盛りの数

    for(var i = 1; i < scalenumber; i++){
      var theta = Math.atan(sss/(ssd * i * r));//目盛り線の角度
      var sr = ssd * i * r * Math.cos(theta);
      var mrad = -1 * (2 * Math.PI / (datalength) *z +(Math.PI / 2));
      console.log(mrad);
      svg.append('line')
      .attr('x1', function(){
        return ox + (sr * Math.cos(theta + mrad));
      })
      .attr('y1', function(){
        return oy + (sr * Math.sin(theta + mrad));
      })
      .attr('x2', function(){
        return ox + (sr * Math.cos(-1 * theta + mrad));
      })
      .attr('y2', function(){
        return oy + (sr * Math.sin(-1 * theta + mrad));
      })
      .attr("stroke", "rgb(255,255,255)")
      .attr("stroke-width", 3)
      .attr('fill', 'none');
    }
  }

  // データの線を生成
  svg.selectAll('path')
     .data(dataset)
     .enter()
     .append('path')
     .attr('d', function(d){
        var point = r * d[0]/carlev;
        var dstatus = `M${ox - Math.cos(-1 * Math.PI / 2) * point},${oy + Math.sin(-1 * Math.PI / 2) * point}`;
        for(var i = 1; i< d.length; i++){
          var x = ox;
          var y = oy;
          var rad = -1 *(2 * Math.PI / (d.length) *i) +(Math.PI / 2);
          point = r * d[i]/carlev;
          x = ox + Math.cos(rad) * point;
          y = oy - Math.sin(rad) * point;
          dstatus += ` L${x},${y}`;
        }

        for(var i = 0; i< 2; i++){
          var x = ox;
          var y = oy;
          var rad = -1 *(2 * Math.PI / (d.length) *i) +(Math.PI / 2);
          point = r * d[i]/carlev;
          x = ox + Math.cos(rad) * point;
          y = oy - Math.sin(rad) * point;
          dstatus += ` L${x},${y}`;
        }
        return dstatus;
    })
     .attr("stroke", "rgba(0,0,0,0.65)")
     .attr("stroke-width", 10)
     .attr('fill', 'none');
  });
});



