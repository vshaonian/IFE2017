function splitData(rawData) {
    var categoryData = [];
    var values = [];
    var volumns = [];
    for(var i = 0; i < rawData.length; i++) {
        var dateString = rawData[i].Data;
        var pattern = /(\d{4})(\d{2})(\d{2})/;
        var dateNewType = dateString.replace(pattern, '$1-$2-$3');
        categoryData.push(dateNewType);

        values.push([rawData[i].Open,rawData[i].Close,rawData[i].Low,rawData[i].High]);

        volumns.push(rawData[i].Volume);
    }
    return {
        categoryData: categoryData,
        values: values,
        volumns: volumns
    }
}

var data0 = splitData(data);

console.log(data0);

var myCharts = echarts.init(document.getElementById('main'));

var option = {
    	title: {
            text: 'K线图'
        },
        tooltip: {},
        legend: {
            data:['利润','销量']
        },
        xAxis: {},
        yAxis: {},
        series: [
	        {
	        	name: '利润',
	        	type: 'candlestick',
	        	data: [10,20,12,22]
	        }
        ],
        // 系列颜色
        color: ["green",'blue']
    };

    myCharts.setOption(option);