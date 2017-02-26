var categories= ['','Air Travel', 'Business Services', 'Check', 'Clothing', 'Coffee','Dining','Groceries','Mobile Phone','Movies + DVDs','Music','Shopping','Transfer','Transportation'];

var dollars = [182.00,100.53,121.12,145.16,105.30,146.54,212.00,160.58,113.06,109.99,240.00,156.00,100.52];

var percents = [.606, .50, .60, .73, .83, .30, .85, .80, .56, .67, 1.08, .78, .50]

var colors = ['EEBB6F','7AC176','EEBB6F','EEBB6F','E07068','7AC176','E07068','E07068','E07068','7AC176','EEBB6F','E07068','EEBB6F','7AC176','#0283AF','#79BCBF'];

var grid = d3.range(25).map(function(i){
	return {'x1':0,'y1':0,'x2':0,'y2':480};
});

var tickVals = grid.map(function(d,i){
	if(i>0){ return i*10; }
	else if(i===0){ return "100";}
});

var xscale = d3.scale.linear()
				.domain([10,250])
				.range([0,722]);

var yscale = d3.scale.linear()
				.domain([0,categories.length])
				.range([0,480]);

var colorScale = d3.scale.quantize()
				.domain([0,categories.length])
				.range(colors);

var bisectDate = d3.bisector(function(d) { return d.date; }).left,
	formatValue = d3.format(",.2f"),
    formatCurrency = function(d) { return "$" + formatValue(d); };
var	trend_margin = {top: 15, right: 25, bottom: 30, left: 50};

var formatPercent = d3.format(".0%");

var width = 900 - trend_margin.left - trend_margin.right;
var height = 550 - trend_margin.top - trend_margin.bottom;

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d, i) {
    return "<span style='color:#00A5F6'><strong>" + formatPercent(+percents[i]) + "</strong></span>" +"  Reached";
  });

var canvas = d3.select('#overviewchart')
				.append('svg')
				.attr({'width':width + trend_margin.left + trend_margin.right,'height':height+trend_margin.top + trend_margin.bottom});
canvas.call(tip);

var grids = canvas.append('g')
				  .attr('id','grid')
				  .attr('transform','translate(150,10)')
				  .selectAll('line')
				  .data(grid)
				  .enter()
				  .append('line')
				  .attr({'x1':function(d,i){ return i*30; },
						 'y1':function(d){ return d.y1; },
						 'x2':function(d,i){ return i*30; },
						 'y2':function(d){ return d.y2; },
					})
				  .style({'stroke':'#ededed','stroke-width':'1px'});

var	xAxis = d3.svg.axis();
	xAxis
		.orient('bottom')
		.scale(xscale)
		.tickValues(tickVals);

var	yAxis = d3.svg.axis();
	yAxis
		.orient('left')
		.scale(yscale)
		.tickFormat(function(d,i){ return categories[i]; })
		.tickValues(d3.range(17));

var y_xis = canvas.append('g')
				  .attr("transform", "translate(150,0)")
				  .attr('id','yaxis')
				  .call(yAxis);

var x_xis = canvas.append('g')
				  .attr("transform", "translate(150,480)")
				  .attr('id','xaxis')
				  .call(xAxis);

var x_label = d3.select("svg")
				.append("text")
		        .attr("transform", "translate(" + (width-15) + " ," + (height + 20) + ")")
		        .style("text-anchor", "middle")
		        .text("$ spent this month");

var chart = canvas.append('g')
					.attr("transform", "translate(150,0)")
					.attr('id','bars')
					.selectAll('rect')
					.data(dollars)
					.enter()
					.append('rect')
					.attr('height',19)
					.attr({'x':0,'y':function(d,i){ return yscale(i)+19; }})
					.style('fill',function(d,i){ return colorScale(i); })
					.attr('width',function(d){ return 0; })
					.on('mouseover', tip.show)
      				.on('mouseout', tip.hide);


var transit = d3.select("svg").selectAll("rect")
				    .data(dollars)
				    .transition()
				    .duration(1000)
				    .attr("width", function(d) {return xscale(d); });

var transitext = d3.select('#bars')
					.selectAll('text')
					.data(dollars)
					.enter()
					.append('text')
					.attr({'x':function(d) {return xscale(d)-55; },'y':function(d,i){ return yscale(i)+35; }})
					.text(function(d){ return "$"+d; }).style({'fill':'#fff','font-size':'14px'});


/*trend chart*/
var trend_width = 300 - trend_margin.left - trend_margin.right;
var trend_height = 200 - trend_margin.top - trend_margin.bottom;

var parseTime = d3.time.format("%Y%m%d").parse;

var	trend_x = d3.time.scale().range([0, trend_width]);
var	trend_y = d3.scale.linear().range([trend_height, 0]);

var	trend_xAxis = d3.svg.axis().scale(trend_x)
	.orient("bottom").ticks(1);

var	trend_yAxis = d3.svg.axis().scale(trend_y)
	.orient("left").ticks(5);

var	trend_valueline = d3.svg.line()
.x(function(d) { return trend_x(d.date); })
.y(function(d) { return trend_y(d.Spending); });

var trend_canvas = d3.select('#trendchart')
						.append('svg')
						.attr({'width':trend_width + trend_margin.left + trend_margin.right,'height':trend_height + trend_margin.top + trend_margin.bottom})
						.append("g")
						.attr("transform", "translate(" + trend_margin.left + "," + trend_margin.top + ")");;

var data = [
   {"date": "20160301", "Spending": "439.5"}, 
   {"date": "20160401", "Spending": "305.8"},
   {"date": "20160501", "Spending": "100.6"},
   {"date": "20160601", "Spending": "400"},
   {"date": "20160701", "Spending": "730.2"},
   {"date": "20160801", "Spending": "945.3"},
   {"date": "20160901", "Spending": "200.1"},
   {"date": "20161001", "Spending": "590.5"},
   {"date": "20161101", "Spending": "458.2"},
   {"date": "20161201", "Spending": "1120.3"},
   {"date": "20170101", "Spending": "489.24"},
   {"date": "20170201", "Spending": "622.29"}
];

data.forEach(function(d) {
		d.date = parseTime(d.date);
		d.Spending = +d.Spending;
	});

// Scale the range of the data
trend_x.domain(d3.extent(data, function(d) { return d.date; }));
trend_y.domain([0, d3.max(data, function(d) { return d.Spending; })]);

var trend_path = trend_canvas.append("path")
		.attr("class", "line")
		.attr("d", trend_valueline(data));

// Add the X Axis
trend_canvas.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + trend_height + ")")
	.call(trend_xAxis);

// Add the Y Axis
trend_canvas.append("g")
	.attr("class", "y axis")
	.call(trend_yAxis)
	.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("($)");

var focus = trend_canvas.append("g")
      .attr("class", "focus")
      .style("display", "none");

focus.append("circle")
  .attr("r", 4.5);

focus.append("text")
  .attr("x", -20)
  .attr("dy", "1.7em");

trend_canvas.append("rect")
  .attr("class", "overlay")
  .attr("width", trend_width)
  .attr("height", trend_height)
  .on("mouseover", function() { focus.style("display", null); })
  .on("mouseout", function() { focus.style("display", "none"); })
  .on("mousemove", mousemove);

function mousemove() {
var x0 = trend_x.invert(d3.mouse(this)[0]),
    i = bisectDate(data, x0, 1),
    d0 = data[i - 1],
    d1 = data[i],
    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
focus.attr("transform", "translate(" + trend_x(d.date) + "," + trend_y(d.Spending) + ")");
focus.select("text").text(formatCurrency(d.Spending));
}
