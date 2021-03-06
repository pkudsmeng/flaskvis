/*页面上定义的js事件*/

//将map定义为全局变量，以便各个方法对其进行调用
var map;

var heatDate, trailDate, trailHour, scatterDate, gridHour;

//页面初始化执行的内容
$(function () {

    //设置地图容器的高度，不然不能正确显示
    responsiveView();

    //窗口的自适应变化
    $(window).on('resize', responsiveView);

    //加载地图
    addMap();

    //加载日期时间轴
    setDateSlider('heatmap-date-slider','heatmap-date-label');
    setDateSlider('trailmap-date-slider','trailmap-date-label');
    setDateSlider('scatter-date-slider','scatter-date-label');


    setHourSlider('trailmap-hour-slider','trailmap-hour-label');
    setHourSlider('gridmap-hour-slider','gridmap-hour-label');

    $("#heatmap").click(function () {
        //$("#inputWrite").css('display','none');
        $("#toolBox-trailmap").css('display','none');
        $("#toolBox-taximap").css('display','none');
        $("#toolBox-foremap").css('display','none');
        $("#toolBox-statsmap").css('display','none');
        $("#toolBox-gridmap").css('display','none');

        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');

        $("#toolBox-heatmap").toggle('fast');
        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');
    });

    $("#tracemap").click(function () {
        //$("#inputWrite").css('display','none');
        $("#toolBox-heatmap").css('display','none');
        $("#toolBox-taximap").css('display','none');
        $("#toolBox-foremap").css('display','none');
        $("#toolBox-statsmap").css('display','none');
        $("#toolBox-gridmap").css('display','none');

        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');

        $("#toolBox-trailmap").toggle('fast');
        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');
    });

    $("#taximap").click(function () {
        //$("#inputWrite").css('display','none');
        $("#toolBox-heatmap").css('display','none');
        $("#toolBox-trailmap").css('display','none');
        $("#toolBox-foremap").css('display','none');
        $("#toolBox-statsmap").css('display','none');
        $("#toolBox-gridmap").css('display','none');

        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');

        $("#toolBox-taximap").toggle('fast');
        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');
    });

    $("#foremap").click(function () {
        $("#inputWrite").css('display','block');
        $("#toolBox-heatmap").css('display','none');
        $("#toolBox-trailmap").css('display','none');
        $("#toolBox-taximap").css('display','none');
        $("#toolBox-statsmap").css('display','none');
        $("#toolBox-gridmap").css('display','none');

        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');

        $("#toolBox-foremap").toggle('fast');
        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');
    });

    $("#statsmap").click(function () {
        //$("#inputWrite").css('display','none');
        $("#toolBox-heatmap").css('display','none');
        $("#toolBox-trailmap").css('display','none');
        $("#toolBox-taximap").css('display','none');
        $("#toolBox-foremap").css('display','none');
        $("#toolBox-gridmap").css('display','none');

        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');

        $("#toolBox-statsmap").toggle('fast');
        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');
    });

    $("#gridmap").click(function () {
        //$("#inputWrite").css('display','none');
        $("#toolBox-heatmap").css('display','none');
        $("#toolBox-trailmap").css('display','none');
        $("#toolBox-taximap").css('display','none');
        $("#toolBox-foremap").css('display','none');
        $("#toolBox-statsmap").css('display','none');

        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');
        
        $("#toolBox-gridmap").toggle('fast');
        $("#statsMap1").css('display','none');
        $("#statsMap2").css('display','none');
    });

    //监听事件
    //draw block heatmap
    $("#createHeatMapBlock").click(function() {
        $("#inputWrite").css('display','none');
        console.log(heatDate);
        //TODO
        getHeatBlock();
    })

    //draw street heatmap
    $("#createHeatMapStreet").click(function() {
        $("#inputWrite").css('display','none');
        console.log(heatDate);
        /*$("#mapContainer").empty();
        var dom = document.getElementById("mapContainer");
        var myChart = echarts.init(dom);

        if (heat_road_option && typeof heat_road_option === "object") {
            myChart.setOption(heat_road_option, true);
        };*/
        getHeatMap();

    })

    //draw trail
    $("#createTrail").click(function() {
        $("#inputWrite").css('display','none');
        console.log(trailDate);
        console.log(trailHour);

        getTrail(trailDate, trailHour);
        
    })

    //show pick up location
    $('#createPickUpMap').click(function() {

        console.log(scatterDate);
        //TODO
    })

    //show drop off location
    $('#createDropOffMap').click(function() {
        console.log(scatterDate);
        //TODO
    })

    //show prediction result
    $('#createForeMap').click(function() {
        //TODO
        datetime = '2016-03-30 21:00';
        pick = [-73.990318,40.745730]
        drop = [-73.977579,40.769363]
        //$.ajax
    })

    $('#createGridMap').click(function() {
        getGrid(gridHour);
    })

    //show charts without map
    

    $('#createStatsMap1').click(function() {
        $("#statsMap2").css('display','none');
        $("#statsMap1").toggle('fast');
        $("#inputWrite").css('display','none');
    })

    $('#createStatsMap2').click(function() {
        $("#statsMap1").css('display','none');
        $("#inputWrite").css('display','none');
        //getLineBar();
        $("#statsMap2").toggle('fast');
    })


    //show line-bar
    {
        var domChart2 = document.getElementById("statsChart2");
        var statChart2_ = echarts.init(domChart2);
        var chart2option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['Number of Taxi Running','Average Speed']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00',
                    '12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Number',
                    min: 0,
                    max: 600,
                    interval: 50,
                    axisLabel: {
                        formatter: '{value} cars'
                    }
                },
                {
                    type: 'value',
                    name: 'Speed',
                    min: 0,
                    max: 15,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} m/s'
                    }
                }
            ],
            series: [
                {
                    name:'Number',
                    type:'bar',
                    data:[125, 86, 51, 45, 26, 59, 207, 364, 416, 406, 324, 316, 331, 330, 344, 386, 339, 397, 453, 502, 434, 429, 393, 286]
                },
                {
                    name:'Speed',
                    type:'line',
                    yAxisIndex: 1,
                    data:[8.118087055769834, 8.480844278313999, 9.300150287768576, 8.48554108500016, 11.755780053804186, 10.57430946407759, 8.042057633825037, 5.498799122557736, 3.5213793790937484, 4.520899789297898, 4.555298087808668, 3.3721010969980463, 3.3271842502337976, 3.842833015813565, 4.8487851277065, 5.1768866116286105, 3.893180152965215, 5.008225402343332, 4.69831144196241, 4.656487002304538, 5.00380977819788, 5.752256712525308, 7.099563870069367, 7.706313651921054]
                }
            ]
        };
        console.log(chart2option);

        if (chart2option && typeof chart2option === "object") {
            statChart2_.setOption(chart2option, true);
        }
    }

    //show calender
    {
        
        var width = 960,
            height = 136,
            cellSize = 17;   //定义每个方格的大小

        var formatPercent = d3.format("d"); //定义一个百分数格式函数，规定百分数精确度小数点后1位

        // 定义颜色函数，使用量化比例尺映射，即定义域为连续的，从-0.05到0.05，而值域是离散的颜色值
        var color = d3.scaleQuantize()
            .domain([0.1478, 0.8772])
            .range(["#ffffbf","#dcf28e", "#a6d96a", "#6cc369", "#1a9850", "#006d3b","#004422"]);

        // 定义10个svg组，分别用来展示从1990年到2010年的数据
        var svg = d3.select("#statsChart1")
          .selectAll("svg")
          .data(d3.range(2016, 2017))
          .enter().append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

        // 定义每个年份对应的group旁边的标签
        svg.append("text")
             //定义标签文字(年份)的位置以及文字的旋转角度、文字内容
            .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "middle")
            .text(function(d) { return d; });

        // 定义每个年份中代表天的小方格
        var rect = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#ccc")
          .selectAll("rect")
          //计算一组小方格的数量，调用d3的timeDays方法，获取两个时间之间的天数，例如，计算从1999年的第一天到2000年的第一天,则参数为new Date(1999,0,1)到 new Date(2000,0,1)，timeDays返回天序列
          //.data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
            .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d , 6, 1)); })
          .enter().append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            // 返回一年有多少个周，确定一组小方格的横向位置
            .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
            // 返回天，确定一组小方格的纵向位置
            .attr("y", function(d) { return d.getDay() * cellSize; })
            // 定义当前小方格上对应的日期的格式
            .datum(d3.timeFormat("%Y-%m-%d"));

        // 勾勒月份的分割线
        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#000")
          .selectAll("path")
          //.data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
            .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d , 6, 1)); })
          .enter().append("path")
            .attr("d", pathMonth);

        d3.csv("../static/data/daily_order.csv", function(error, csv) {
          if (error) throw error;

          // 这里的d3.nest可以参考http://blog.csdn.net/gdp12315_gu/article/details/51721988
          var data = d3.nest()
              // 以d.Date来对数据进行分组
              .key(function(d) { return d.date; })
              // rollup函数用来获取每个组的values，因为一组为一天，只有一行数据，因此这里定义每个组的values 用d[0],即d[0].Close - d[0].Open) / d[0].Open来计算产生数值values
              //.rollup(function(d) { return (d[0].Close - d[0].Open) / d[0].Open; })
              .rollup(function(d){return d[0].countnum/10000;})
            // 个人理解，这里的.object()函数类似于call()函数，用来将定义的分组机制应用到csv数据上,返回分组后的对象，官网对nest().object()的解释：Applies the nest operator to the specified array, returning a nested object.有没有醍醐灌顶的感觉，哈哈
            .object(csv);
          // 过滤操作，挑出日期在data中的小方格（因为周六、周日没有在data中，周六周日小方格填充色为默认白色）
          rect.filter(function(d) { return d in data; })
              // 定义小方格的填充色，通过每个小方格中的values值来映射颜色函数
              .attr("fill", function(d) { return color(data[d]); })
            .append("title")
              // 定义小方格的title属性文本为 日期后面加小方格value对应的的百分比格式
              .text(function(d) { return d + ": " + formatPercent(data[d]*10000); });
        });

        // 定义月份分割线路径
        function pathMonth(t0) {
          var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
              d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
              d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
          return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
              + "H" + w0 * cellSize + "V" + 7 * cellSize
              + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
              + "H" + (w1 + 1) * cellSize + "V" + 0
              + "H" + (w0 + 1) * cellSize + "Z";
        }

    }


    //for Prediction
    $("#createForeMap").click(function() {

        //TODO
        $("#toolBox-foremap").css('display','none');
        getPredictMap();

        //$("#predicttime").setAttribute('value',928.47614);
    })

});

//设置地图容器高度
let responsiveView=()=>{
    $("#mapContainer").css("height",document.body.clientHeight);
};

//加载地图方法
let addMap=()=>{
    map = new BMap.Map("mapContainer");
    let centerPoint = new BMap.Point(-73.97,40.75);
    map.centerAndZoom(centerPoint, 14);
};

//日期时间轴
let setDateSlider=(sliderId, labelId)=>{
    let mindate='2016-01-01';
    let maxdate='2016-06-30';
    let dateLength=getDays(mindate,maxdate);

    let now =new Date(),year=2016,month=3,day=1;
    let thisDay =year+"-"+(month<10?'0'+month:month)+"-"+(day<10?'0'+day:day);
    let today=getDays(mindate,thisDay);
    let length=$("#slider").width();
    let thisValue=today+1;
    $("#"+sliderId).slider({
        value:thisValue,
        min: 0,
        max: dateLength,
        step: 1,
        create:function(){
            //$("#"+labelId).css("margin-left",length*(today/dateLength));
            $("#"+labelId).text(getAfterDate(mindate,today));
        },
        slide: function( event, ui ) {
            //$("#"+labelId).css("margin-left",length*(ui.value/dateLength));
            $("#"+labelId).text(getAfterDate(mindate,ui.value));
            thisValue=ui.value;
        },
        change: function( event, ui ) {
            //这边定义拖拽日期结束后的事件
            //$("#"+labelId).css("margin-left",length*(ui.value/dateLength));
            $("#"+labelId).text(getAfterDate(mindate,ui.value));
            if(sliderId=="heatmap-date-slider") {
                heatDate = thisValue;
            }
            else if(sliderId=="trailmap-date-slider") {
                trailDate = thisValue;
            }
            else if(sliderId=="scatter-date-slider") {
                scatterDate = thisValue;
            }
        }
    });
};

//小时时间轴
let setHourSlider=(sliderId,labelId)=>{

    let now =new Date(),hour=0;
    let nowtime =(hour<10?'0'+hour:hour);

    let thisValue=hour;

    $("#"+sliderId).slider({
        value:thisValue,
        min: 0,
        max: 23,
        step: 1,
        create:function(){
            //$("#"+labelId).css("margin-left",length*(thisValue/1440));
            $("#"+labelId).text((nowtime)+':00');
        },
        slide: function( event, ui ) {
            //$("#"+labelId).css("margin-left",length*((ui.value+1)/1440));
            let hour=Math.floor(ui.value);
            $("#"+labelId).text((hour<10?'0'+hour:hour)+':00');
            thisValue=ui.value;
        },
        change: function( event, ui ) {
            //这边定义拖拽日期结束后的事件
            //$("#"+labelId).css("margin-left",length*((ui.value+1)/1440));
            let hour=Math.floor(ui.value);
            $("#"+labelId).text((hour<10?'0'+hour:hour)+':00');
            if(sliderId=="trailmap-hour-slider")
                trailHour = thisValue;
            else if(sliderId=="gridmap-hour-slider")
                gridHour = thisValue;
        }
    });
};

/*-------------------------------------------------------计算日期的通用方法部分-----------------------------------------------------------*/
//获取某个日期之后N天的日期
function getAfterDate(minDate,days){
    let defaultDate = new Date(minDate);
    defaultDate.setTime(defaultDate.getTime()+864e5*days);
    let year=defaultDate.getFullYear(),month=defaultDate.getMonth()+1,day=defaultDate.getDate();
    return year+"/"+(month<10?'0'+month:month)+"/"+(day<10?'0'+day:day);
}
//计算两个日期之间相差多少天
function getDays(minDate , maxDate){
    let minDateObj = new Date(minDate),maxDateObj = new Date(maxDate)
        ,minTime = minDateObj.getTime(),maxTime = maxDateObj.getTime()
        ,minusDays = Math.floor(((maxTime-minTime)/864e5));//计算出两个日期的天数差
    return Math.abs(minusDays);//取绝对值
}
//计算某年的某月一共有多少天
function getDaysInMonth(year, month) {
    let date = new Date(year, month, 1);
    return new Date(date.getTime() - 864e5).getDate();
}

