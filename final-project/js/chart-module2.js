/**
 * This method is responsible for appending a new SVG
 * inside a div tag to the body of page.
 * @param {*} className SVG Div Class Name 
 */
function appendSVG(className) {
    var svg = d3.select("#" + className)
        .append("svg")
        .attr("width", 500)
        .attr("height", 400)
        .append('g');

    return svg;
}

/**
 * This method is responsible for adding a title
 * to a chart
 * @param {*} svg 
 * @param {*} chart 
 * @param {*} title 
 */
function addChartTitle(svg, chart, title) {
    svg.append("text")
        .attr("x", chart._xPixels() + chart._widthPixels() / 2)
        .attr("y", chart._yPixels() - 20)
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text(title)
}

function addChartConclusion(className, chart, conclusion) {
    d3.select("#" + className)
        .attr("class", "text-center")
        .text(conclusion)
}

/**
 * This method is responsible for creating a complete chart
 * with the option of having or not a x scale order and a conclusion.
 * @param {*} data 
 * @param {*} className 
 * @param {*} xAxis 
 * @param {*} yAxis 
 * @param {*} title 
 * @param {*} xOrderRule
 * @param conclusion
 */
function generateBarChart(data, className, xAxis, yAxis, title, xOrderRule = null, conclusion = null) {
    var svg = appendSVG(className);
    var chart = new dimple.chart(svg, data);
    var x = chart.addCategoryAxis("x", xAxis);

    if (x) {
        x.addOrderRule(xOrderRule)
    }

    chart.addMeasureAxis("y", yAxis);
    chart.addSeries(null, dimple.plot.bar);
    chart.draw();
    addChartTitle(svg, chart, title);

    if (conclusion) {
        addChartConclusion(className + "Conclusion", chart, conclusion)
    }

}

/**
 * This method is responsible for reading the input data
 * and calling the methods that generate the charts.
 */
function drawCharts() {
    // Passenger x Gender Bar Chart
    d3.csv("data/output/groupby-survived.csv", function (data) {
        generateBarChart(data, "firstChart",
            "Survived", "Number of Occurrences", "Number of Passengers per Survival Status");
    });

    // Passenger x Gender Bar Chart
    d3.csv("data/output/groupby-gender.csv", function (data) {
        generateBarChart(data, "secondChart",
            "Sex", "Number of Occurrences", "Number of Passengers per Gender");
    });

    // Passenger x Pclass Bar Chart
    d3.csv("data/output/groupby-pclass.csv", function (data) {
        generateBarChart(data, "thirdChart",
            "Pclass", "Number of Occurrences", "Number of Passengers per Passenger Class");
    });

    // Passenger x Age Bar Chart
    d3.csv("data/output/groupby-age.csv", function (data) {
        xAxisOrderRule = ["0 to 10", "11 to 20", "21 to 30", "31 to 40",
            "41 to 50", "51 to 60", "61 to 70", "71 to 80"];

        var chartConclusion = "After analysing the four charts above, it can be concluded that the majority " +
            " of the passengers aboard the Titanic were male adults around the age of  " +
            "21 ~ 40 years old in the third class.";

        generateBarChart(data, "fourthChart",
            "AgeBins", "Number of Occurrences", "Number of Passengers per Age", xAxisOrderRule, chartConclusion);

    });


    // Passenger x Gender ~ Survival Scatter Plot
    d3.csv("data/output/groupby-survived-gender.csv", function (data) {
        var svg = appendSVG("fifthChart");
        var chart = new dimple.chart(svg, data);
        chart.addCategoryAxis("x", ["Sex", "Survived"]);
        chart.addMeasureAxis("y", "Number of Occurrences");
        chart.addSeries("Survived", dimple.plot.bar);
        chart.addLegend(0, 50, 480, 0, "right");
        chart.defaultColors[1].fill = "#FDB462";
        chart.draw();
        addChartTitle(svg, chart, "Number of Passengers per Gender facet by Survival");
    });

    // Passenger x Pclass ~ Survival Scatter Plot
    d3.csv("data/output/groupby-survived-pclass.csv", function (data) {
        var svg = appendSVG("sixthChart");
        var chart = new dimple.chart(svg, data);
        var x = chart.addCategoryAxis("x", ["Pclass", "Survived"]);
        x.addOrderRule(["1", "2", "3"])
        chart.addMeasureAxis("y", "Number of Occurrences");
        chart.addSeries("Survived", dimple.plot.bar);
        chart.addLegend(0, 50, 480, 0, "right");
        chart.defaultColors[1].fill = "#FDB462";
        chart.draw();
        addChartTitle(svg, chart, "Number of Passengers per Pclass facet by Survival");
    });

    // Passenger x Age ~ Survival Scatter Plot
    d3.csv("data/output/groupby-survived-age.csv", function (data) {
        var svg = appendSVG("seventhChart");
        var chart = new dimple.chart(svg, data);
        var x = chart.addCategoryAxis("x", ["AgeBins", "Survived"]);
        x.addOrderRule(["0 to 10", "11 to 20", "21 to 30", "31 to 40",
            "41 to 50", "51 to 60", "61 to 70", "71 to 80"]);
        chart.addMeasureAxis("y", "Number of Occurrences");
        chart.addSeries("Survived", dimple.plot.bar);
        chart.addLegend(0, 50, 480, 0, "right");
        chart.defaultColors[1].fill = "#FDB462";
        chart.draw();
        addChartTitle(svg, chart, "Number of Passengers per Age facet by Survival");
        
        var chartConclusion = "After analysing the charts grouped by Survival, we can conclude that women, " + 
        "children and people on the first class were more likely to survive the Titanic crash."

        addChartConclusion("seventhChartConclusion", chart, chartConclusion) 
    });
}

drawCharts();