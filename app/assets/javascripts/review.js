document.addEventListener("turbolinks:load", function() {

// 基本設定
  var w = 1200;
  var h = 400;  var oy = h/2; //原点ｙ軸
  var padding = 20;
  var r = (h / 2) - padding; //背景の円半径
  var carlev = 10;//評価のランク数
  var sss = 10;//目盛り線の長さ
  var ssd = 0.2; //目盛り間隔
  var scalenumber = 1 / ssd//目盛りの数
  var dataset = [
                {category: "mood", ox: 200,
                  nary: ["mood", "temperature", "music", "design", "creanliness"],
                  vary: [5, 5, 5, 5, 5]},
                {category: "food", ox: 600,
                  nary: ["food", "umami", "amami", "sanmi", "siomi", "nigami"],
                  vary: [5, 5, 5, 5, 5, 5]},
                {category: "service", ox: 1000,
                  nary: ["service", "speed", "care", "value", "custom"],
                  vary: [5, 5, 5, 5, 5]}
                ];

      // SVG 要素の生成
  var svg = d3.select(".radarchart")
    .append("svg"
    )
    .attr("width", w
    )
    .attr("height", h
    );

    //背景生成関数
  function g_frame(datas) {
    for(var j = 0; j < datas.length; j++){
      var ox = datas[j].ox;
      var valueary = datas[j].vary;
      var nameary = datas[j].nary;
      var datalength = valueary.length;
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

      for(var z = 0; z < datalength; z++){
          //評価軸の設定
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

          //ラベルの設定
        svg.append("text")
           .text(function() {
           return nameary[z];
          })
          .attr('x', function(){
            var x = ox;
            var rad = -1 * (2 * Math.PI / (datalength) *z +(Math.PI / 2));
            x = ox + Math.cos(rad) * r;
            return x;
          })
          .attr('y', function(){
            var y = oy;
            var rad = (2 * Math.PI / (datalength) *z +(Math.PI / 2));
            y = oy - Math.sin(rad) * r;
            return y;
          })
          .attr('font-size', '20px');

        //目盛り線の生成
        for(var i = 1; i < scalenumber; i++){
          var theta = Math.atan(sss/(ssd * i * r));//目盛り線の角度
          var sr = ssd * i * r * Math.cos(theta);
          var mrad = -1 * (2 * Math.PI / (datalength) *z +(Math.PI / 2));
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
    }
  }

    // datasetからチャートを生成
  function plot_data(dataset){
    svg.selectAll('path')
       .data(dataset)
       .enter()
       .append('path')
       .attr('d', function(d){
          var point = r * d.vary[0]/carlev;
          var dstatus = `M${d.ox - Math.cos(-1 * Math.PI / 2) * point},${oy + Math.sin(-1 * Math.PI / 2) * point}`;
          for(var i = 1; i< d.vary.length; i++){
            var x = d.ox;
            var y = oy;
            var rad = -1 *(2 * Math.PI / (d.vary.length) *i) +(Math.PI / 2);
            point = r * d.vary[i]/carlev;
            x = d.ox + Math.cos(rad) * point;
            y = oy - Math.sin(rad) * point;
            dstatus += ` L${x},${y}`;
          }

        for(var i = 0; i< 2; i++){
          var x = d.ox;
          var y = oy;
          var rad = -1 *(2 * Math.PI / (d.vary.length) *i) +(Math.PI / 2);
          point = r * d.vary[i]/carlev;
          x = d.ox + Math.cos(rad) * point;
          y = oy - Math.sin(rad) * point;
          dstatus += ` L${x},${y}`;
        }
        return dstatus;
      })
       .attr("stroke", "rgba(0,0,0,0.65)")
       .attr("stroke-width", 10)
       .attr('fill', 'none');
  }

  g_frame(dataset); //背景の設定
  plot_data(dataset);//デフォルトのデータ線

// 更新ボタンを押すと雰囲気、料理、サービスの総合を計算して返す
// ＆データ再プロット
  $("#renew").on("click", function() {
    d3.selectAll("path")
      .remove();

    function review_ave(datas) {
      for (var i = 0; i < 3; i++ ) {
        var ave = 0;
        var sum = 0;
        var val_ary = [];
        var review_val = ""
        var review_val_face = ""
        var nary = datas[i].nary;

        for (var j = 1; j < nary.length; j++ ) {
          var num = 0;
          num = $('input#review_' + nary[j]).val();
          sum += Number(num);
          val_ary.push(Number(num));
        }
        ave = sum/ (nary.length-1) * 10;
        review_val = "review_" + nary[0];
        review_val_face = review_val + "_face";
        document.getElementById(review_val).value=ave;
        document.getElementById(review_val_face).innerHTML=Math.round(ave) / 10;
        val_ary.unshift(Math.round(ave) / 10);
        dataset[i].vary = val_ary;
      }
    }
  review_ave(dataset);
  plot_data(dataset);
  });
});
