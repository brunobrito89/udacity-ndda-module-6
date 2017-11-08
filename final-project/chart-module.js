function draw(data) {
    "use strict";
    var margin = 75,
        width = 1400 - margin,
        height = 600 - margin;

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .append('g')
        .attr('class', 'chart');

    /*
      Dimple.js Chart construction code
    */

    var myChart = new dimple.chart(svg, data);
    var x = myChart.addCategoryAxis("x", "Age");
    myChart.addMeasureAxis("y", "Age");
    myChart.addSeries(null, dimple.plot.bar);
    myChart.draw();
};