/**
 * 
 * @param {*} className 
 */
function appendSVG(className) {
    var margin = 75,
        width = 600 - margin,
        height = 400 - margin;

    var svg = d3.select("body")
        .append("div")
        .attr('class', className)
        .append("svg")
        .attr("width", width + margin)
        .attr("height", height + margin)
        .style("float", "left")
        .append('g')
        ;

    return svg;
}

/**
 * 
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
    d3.select("body")
        .append("div")
        .attr("class", "chartConclusion")
        .append("p")
        .attr("x", chart._xPixels() + chart._widthPixels() / 2)
        .attr("y", chart._yPixels() + chart._heightPixels() + 50)
        .style("clear", "left")
        .style("font-size", "120%")
        .text(conclusion)
}

/**
 * 
 * @param {*} data 
 * @param {*} className 
 * @param {*} xAxis 
 * @param {*} yAxis 
 * @param {*} title 
 * @param {*} xOrderRule 
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
        addChartConclusion(className, chart, conclusion)
    }

}

/**
 * 
 */
function drawCharts() {
    // Passenger x Gender
    d3.csv("data/output/groupby-survived.csv", function (data) {
        generateBarChart(data, "firstChart",
            "Survived", "Number of Occurrences", "Number of Passengers per Survival");
    });

    // Passenger x Gender
    d3.csv("data/output/groupby-gender.csv", function (data) {
        generateBarChart(data, "secondChart",
            "Sex", "Number of Occurrences", "Number of Passengers per Gender");
    });

    // Passenger x Pclass
    d3.csv("data/output/groupby-pclass.csv", function (data) {
        generateBarChart(data, "thirdChart",
            "Pclass", "Number of Occurrences", "Number of Passengers per Passenger Class");
    });

    // Passenger x Age
    d3.csv("data/output/groupby-age.csv", function (data) {
        xAxisOrderRule = ["0 to 10", "11 to 20", "21 to 30", "31 to 40",
            "41 to 50", "51 to 60", "61 to 70", "71 to 80"];

        var chartConclusion = "After analysing the four charts above, it can be concluded that the majority " +
            " of the passengers aboard the Titanic were male adults around the age of  " +
            "21 ~ 40 years old in the third class.";

        generateBarChart(data, "fourthChart",
            "AgeBins", "Number of Occurrences", "Number of Passengers per Age", xAxisOrderRule, chartConclusion);

    });


    // Passenger x Gender ~ Survival
    d3.csv("data/output/groupby-survived-gender.csv", function (data) {
        var svg = appendSVG("fifthChart");
        var chart = new dimple.chart(svg, data);
        var x = chart.addCategoryAxis("x", ["Sex", "Survived"]);
        chart.addMeasureAxis("y", "Number of Occurrences");
        chart.addSeries("Survived", dimple.plot.bubble);
        chart.addLegend(140, 10, 510, 0, "right");
        chart.defaultColors[1].fill = "#FDB462";
        chart.draw();
        addChartTitle(svg, chart, "Number of Passengers per Gender facet by Survival");
    });

    // Passenger x Pclass ~ Survival
    d3.csv("data/output/groupby-survived-pclass.csv", function (data) {
        var svg = appendSVG("sixthChart");
        var chart = new dimple.chart(svg, data);
        var x = chart.addCategoryAxis("x", ["Pclass", "Survived"]);
        chart.addMeasureAxis("y", "Number of Occurrences");
        chart.addSeries("Survived", dimple.plot.bubble);
        chart.addLegend(140, 10, 510, 0, "right");
        chart.defaultColors[1].fill = "#FDB462";
        chart.draw();
        addChartTitle(svg, chart, "Number of Passengers per Pclass facet by Survival");
    });

    // Passenger x Age ~ Survival
    d3.csv("data/output/groupby-survived-age.csv", function (data) {
        var svg = appendSVG("seventhChart");
        var chart = new dimple.chart(svg, data);
        var x = chart.addCategoryAxis("x", ["AgeBins", "Survived"]);
        x.addOrderRule(["0 to 10", "11 to 20", "21 to 30", "31 to 40",
            "41 to 50", "51 to 60", "61 to 70", "71 to 80"]);
        chart.addMeasureAxis("y", "Number of Occurrences");
        chart.addSeries("Survived", dimple.plot.bubble);
        chart.addLegend(140, 10, 510, 0, "right");
        chart.defaultColors[1].fill = "#FDB462";
        chart.draw();
        addChartTitle(svg, chart, "Number of Passengers per Age facet by Survival");
        
        var chartConclusion = "After analysing the charts grouped by Survival, we can conclude that women, " + 
        "children and people on the first class were more likely to survive the Titanic crash."

        addChartConclusion("seventhChart", chart, chartConclusion) 
    });
};



drawCharts();