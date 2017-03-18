var myCharts = echarts.init(document.getElementById('main'));

myCharts.showLoading();

function ajax(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {

                var jsonData = eval("(" + xhr.responseText + ")");

                callback(jsonData);
            }
        }
    }

    xhr.send(null);
}

ajax('data.json', function (jsonData) {
    function splitData(rawData) {
        var categoryData = [];
        var values = [];
        var volumns = [];
        for (var i = 0; i < rawData.length; i++) {
            var dateString = rawData[i].Date;
            var pattern = /(\d{4})(\d{2})(\d{2})/;
            var dateNewType = dateString.replace(pattern, '$1-$2-$3');
            categoryData.push(dateNewType);

            values.push([rawData[i].Open, rawData[i].Close, rawData[i].Low, rawData[i].High]);

            volumns.push(rawData[i].Volume);
        }
        return {
            categoryData: categoryData,
            values: values,
            volumns: volumns
        }
    }

    var data0 = splitData(jsonData);

    var option = {
        title: {
            text: 'Ticker: A',
            left: 0
        },
        tooltip: {
            // 坐标轴触发
            trigger: 'axis',
            // 坐标轴直线指示器
            axisPointer: {
                type: 'line'
            }
        },
        legend: {
            data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        // 网格
        grid: [
            {
                bottom: '40%'
            },
            {
                top: '70%',
                bottom: '14%'
            }
        ],
        xAxis: [
            {
                // 类目轴
                type: 'category',
                // 类目数据
                data: data0.categoryData,
                scale: true,
                // 坐标轴刻度最小值
                min: 'dataMin',
                // 坐标轴刻度最大值
                max: 'dataMax'
            },
            {
                type: 'category',
                gridIndex: 1,
                data: data0.categoryData
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1
            }
        ],
        // 区域缩放
        dataZoom: [
            // 内置型数据区域缩放
            {
                type: 'inside',
                start: 50,
                end: 100
            },
            // 滑动条型数据区域缩放
            {
                show: true,
                type: 'slider',
                y: '90%',
                // 数据窗口范围的起始百分比
                start: 50,
                end: 100
            }
        ],
        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: data0.values
            },
            {
                name: '成交量',
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data0.volumns
            },
            {
                name: 'MA5',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: calculateMA(5),
                smooth: true,
                lineStyle: {
                    normal: { opacity: 0.5 }
                }
            },
            {
                name: 'MA10',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: calculateMA(10),
                smooth: true,
                lineStyle: {
                    normal: { opacity: 0.5 }
                }
            },
            {
                name: 'MA20',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: calculateMA(20),
                smooth: true,
                lineStyle: {
                    normal: { opacity: 0.5 }
                }
            },
            {
                name: 'MA30',
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                data: calculateMA(30),
                smooth: true,
                lineStyle: {
                    normal: { opacity: 0.5 }
                }
            }
        ]
    };


    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0; i < data0.values.length; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += parseInt(data0.values[i - j][1]);
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    myCharts.hideLoading();

    myCharts.setOption(option);

})
