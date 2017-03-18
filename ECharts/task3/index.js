var chart = echarts.init(document.getElementById('main'));

chart.showLoading();

function ajax(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    dataType = "json";
    if(xmlHttp) {
        xmlHttp.open('GET', url, true);
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    chart.hideLoading();
                    callback(xmlHttp.responseText);
                } else{
                    console.log('error');
                }
            } 
        };
        xmlHttp.send(null);
    } 
}

ajax('map.json', function(response) {
    var jsonText = eval("(" + response + ")");
    echarts.registerMap('countries',jsonText);
    // var chart = echarts.init(document.getElementById('main'));
    chart.setOption({
        title: {
            text: 'Global Map',
            subtext: 'only show countries'
        },
        series: [{
            type: 'map',
            map: 'countries'
        }]
    })
})


