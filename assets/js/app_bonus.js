let svgArea = d3.select("body").select("svg");

let svgWidth = 1000;
let svgHeight = 1000;

let margin = {
  top: 20,
  right: 40,
  bottom: 110,
  left: 110
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
let svg = d3
.select("#scatter")
.append("svg")
.attr("height", svgHeight)
.attr("width", svgWidth);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Append group element
var circleTextGroup = chartGroup.append("g")

// Initial Params
var chosenXAxis = "age";
var chosenYAxis = "smokes";

// function used for updating x-scale var upon click on axis label
function xScale(hwData, chosenXAxis) {
  // create scales
  let xLinearScale = d3.scaleLinear()
    .domain([((d3.min(hwData, d => d[chosenXAxis]))-1), ((d3.max(hwData, d => d[chosenXAxis]))+2)])
    .range([0, width]);

    return xLinearScale;
}

// function used for updating y-scale var upon click on axis label
function yScale(hwData, chosenYAxis) {
  // create scales
  let yLinearScale = d3.scaleLinear()
    .domain([((d3.min(hwData, d => d[chosenYAxis]))-2),((d3.max(hwData, d => d[chosenYAxis]))+2)])
    .range([height, 0]);

    return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function xRenderAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

    return xAxis;
}

// function used for updating yAxis var upon click on axis label
function yRenderAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis]))
    .attr("cy", d => newYScale(d[chosenYAxis]))

    return circlesGroup;
}

// function used for updating circles text with a transition to
// new circles
function renderText(textGroup, newXScale, chosenXAxis, newYScale, chosenYAxis) {

  textGroup.transition()
    .duration(1000)
    .attr("x", d => newXScale(d[chosenXAxis]))
    .attr("y", d => newYScale(d[chosenYAxis]));

    return textGroup;
}

// Read CSV
d3.csv("assets/data/data.csv").then(function(hwData) {

  console.log(hwData);

    // parse data
    hwData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.income = +data.income;
      data.healthcare = +data.healthcare;
      data.obesity = +data.obesity;
      data.smokes = +data.smokes;
    });

    // xLinearScale function above csv import
    let xLinearScale = xScale(hwData, chosenXAxis);

    // yLinearScale function above csv import
    let yLinearScale = yScale(hwData, chosenYAxis);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    let xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

      // append y axis
    let yAxis = chartGroup.append("g")
      .classed("y-axis", true)
      .call(leftAxis);    

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(hwData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenYAxis]))
        .attr("r", 20)
        .attr("fill", "green")
        .attr("opacity", ".50");

      // add text to circles
      var textGroup = circleTextGroup.selectAll("text")
        .data(hwData)
        .enter()
        .append("text")
        .attr("class", "stateText")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        // the +5 lowers the text in the circle to more the center
        // - orginally riding high 
        .attr("y", d => (yLinearScale(d[chosenYAxis]))+6);    

    // Create group for three x-axis labels
    let xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    let ageLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "age") // value to grab for event listener
    .attr("class", "aText")    
    .classed("active", true)
    .text("Age (Median)");

    let povertyLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 45)
    .attr("value", "poverty") // value to grab for event listener
    .attr("class", "aText")    
    .classed("active", true)    
    .attr("class", "aText")
    .text("In Poverty (%)");

    let incomeLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 70)
    .attr("value", "income") // value to grab for event listener
    .attr("class", "aText")    
    .classed("active", true)
    .text("Household Income (Median)");

    // Create group for three y-axis labels
    let yLabelsGroup = chartGroup.append("g")

    let smokesLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")    
    .attr("y", 75 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("value", "smokes") // value to grab for event listener
    .attr("class", "aText")
    .classed("active", true)
    .text("Smokes (%)");

    let healthCareLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")    
    .attr("y", 50 - margin.left)
    .attr("x", 0 - (height / 2))    
    .attr("value", "healthcare") // value to grab for event listener
    .attr("class", "aText")
    .classed("active", true)
    .text("Lacks Healthcare (%)");

    let obeseLabel = yLabelsGroup.append("text")
    .attr("transform", "rotate(-90)")    
    .attr("y", 25 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("value", "obesity") // value to grab for event listener
    .attr("class", "aText")
    .classed("active", true)
    .text("Obese (%)");

    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

    // x axis labels event listener
    xLabelsGroup.selectAll("text")
    .on("click", function() {
    // get value of selection
    let value = d3.select(this).attr("value");
    if (value !== chosenXAxis) {

      // replaces chosenXAxis with value
      chosenXAxis = value;

      // functions here found above csv import
      // updates x scale for new data
      xLinearScale = xScale(hwData, chosenXAxis);

      // updates x axis with transition
      xAxis = xRenderAxes(xLinearScale, xAxis);

      // updates circles with new x values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis); 

      // updates circles text with new values
      textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);  

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenXAxis === "poverty") {
        povertyLabel
          .classed("active", true)
          .classed("inactive", false);
        incomeLabel
          .classed("active", false)
          .classed("inactive", true);
        ageLabel
          .classed("active", false)
          .classed("inactive", true);  
      }
      if (chosenXAxis === "income"){
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
        incomeLabel
          .classed("active", true)
          .classed("inactive", false);
        ageLabel
          .classed("active", false)
          .classed("inactive", true);  
      }
      if (chosenXAxis === "age"){
        povertyLabel
          .classed("active", false)
          .classed("inactive", true);
        incomeLabel
          .classed("active", false)
          .classed("inactive", true);
        ageLabel
          .classed("active", true)
          .classed("inactive", false);  
      }
    }
  })

    // y axis labels event listener
    yLabelsGroup.selectAll("text")
    .on("click", function() {
    // get value of selection
    let value = d3.select(this).attr("value");
    if (value !== chosenYAxis) {

      // replaces chosenXAxis with value
      chosenYAxis = value;

      // functions here found above csv import
      // updates x scale for new data
      yLinearScale = yScale(hwData, chosenYAxis);

      // updates y axis with transition
      yAxis = yRenderAxes(yLinearScale, yAxis);

      // updates circles with new y values
      circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis); 

      // updates circles text with new values
      textGroup = renderText(textGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);  

      // updates tooltips with new info
      circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

      // changes classes to change bold text
      if (chosenYAxis === "healthcare") {
        healthCareLabel
          .classed("active", true)
          .classed("inactive", false);
        obeseLabel
          .classed("active", false)
          .classed("inactive", true);
        smokesLabel
          .classed("active", false)
          .classed("inactive", true);  
      }
      if (chosenYAxis === "obesity"){
        healthCareLabel
          .classed("active", false)
          .classed("inactive", true);
        obeseLabel
          .classed("active", true)
          .classed("inactive", false);
        smokesLabel
          .classed("active", false)
          .classed("inactive", true);  
      }
      if (chosenYAxis === "smokes"){
        healthCareLabel
          .classed("active", false)
          .classed("inactive", true);
        obeseLabel
          .classed("active", false)
          .classed("inactive", true);
        smokesLabel
          .classed("active", true)
          .classed("inactive", false);  
      }

    }
      // end of y listener for axis changes
  });

  // function used for updating circles group with new tooltip
function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {

  let xlabel;
  let ylabel;

  if (chosenXAxis === "age") {
    xlabel = "Age (Median)";
  }

  if (chosenXAxis === "income") {
    xlabel = "Household Income (Median)";
  }

  if (chosenXAxis === "poverty"){
    xlabel = "In Poverty (%)";
  }

  if (chosenYAxis === "smokes") {
    ylabel = "Smokes (%)";
  }

  if (chosenYAxis === "healthcare") {
    ylabel = "Lacks Healtcare (%)";
  }

  if (chosenYAxis === "obesity"){
    ylabel = "Obese (%)";
  }

  let toolTip = d3.select('body').append('div').classed('xtooltip', true);
  // let toolTip = d3.select('body').append('div').classed('d3-tip', true);

  circlesGroup.on("mouseover", function(event, d) {
    // toolTip.show(`${d.abbr}<br>${xlabel} ${d[chosenXAxis]} <br> ${ylabel} ${d[chosenYAxis]}`);
    toolTip.style('display', 'block')
          .html(`${d.abbr}<br>${xlabel} ${d[chosenXAxis]} <br> ${ylabel} ${d[chosenYAxis]}`)
          .style('left', event.pageX+'px')
          .style('top', event.pageY+'px');
    })
    // onmouseout event
    .on("mouseout", function(event,index) {
      // toolTip.hide(event);
      console.log(event)
      console.log(index)
      toolTip.style('display', 'none');
    });

  return circlesGroup;
  // end of next axis to update labels and hover text
}
  // end of hwdata function
});
