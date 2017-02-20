var categories= ['','Air Travel', 'Business Services', 'Check', 'Clothing', 'Coffee','Dining','Groceries','Mobile Phone','Movies + DVDs','Music','Shopping','Transfer','Transportation'];

var dollars = [182,100.53,121.12,145.16,105.3,146.54,212,160.58,113.06,109.99,269.23,156,100.52];

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

var width = 900;
var height = 550;

var canvas = d3.select('#overviewchart')
				.append('svg')
				.attr({'width':width,'height':height});

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
				  .style({'stroke':'#adadad','stroke-width':'1px'});

var	xAxis = d3.svg.axis();
	xAxis
		.orient('bottom')
		.scale(xscale)
		.tickValues(tickVals);

var	yAxis = d3.svg.axis();
	yAxis
		.orient('left')
		.scale(yscale)
		.tickSize(2)
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
					.attr('width',function(d){ return 0; });


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
					.attr({'x':function(d) {return xscale(d)-200; },'y':function(d,i){ return yscale(i)+35; }})
					.text(function(d){ return "$"+d; }).style({'fill':'#fff','font-size':'14px'});

var x_label = d3.select("svg")
				.append("text")
		        .attr("transform", "translate(" + (width - 40) + " ," + (height - 15) + ")")
		        .style("text-anchor", "middle")
		        .text("Progress");

var y_label = d3.select("svg")
				.append("text")
		        .attr("transform", "rotate(-90)")
		        .attr("y", 20)
		        .attr("x",-30)
		        .attr("dy", "1em")
		        .style("text-anchor", "middle")
		        .text("Catagory");
