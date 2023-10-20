let dom = document.getElementById('chart-container');
let myChart = echarts.init(dom, null, {
    renderer: 'canvas',
    useDirtyRect: false
});
let app = {};
let ROOT_PATH = 'https://echarts.apache.org/examples';
let option;

myChart.showLoading();
$.getJSON('data.json', function(graph) {
    myChart.hideLoading();
    graph.nodes.forEach(function(node) {
        node.label = {
            show: node.symbolSize > 30
        };
    });
    option = {
        title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [
            {
                // selectedMode: 'single',
                data: graph.categories.map(function(a) {
                    return a.name;
                })
            }
        ],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'Les Miserables',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
});

if(option && typeof option === 'object') {
    myChart.setOption(option);
}

window.addEventListener('resize', myChart.resize);
