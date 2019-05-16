import React, { Component } from 'react'
import ReactEcharts from "echarts-for-react";

class enterpriseData extends Component {
  getBarOption() {
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 20; i < 120; i++) {
      xAxisData.push(i + '月');
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    let option = {
      title: {
        text: '用户消费类型'
      },
      legend: {
        data: ['流量数据消费总值', '标准通话消费总值'],
        align: 'left'
      },
      toolbox: {
        // y: 'bottom',
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          },
          dataView: {},
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      tooltip: {},
      xAxis: {
        data: xAxisData,
        silent: false,
        splitLine: {
          show: false
        }
      },
      yAxis: {
      },
      series: [{
        name: '流量数据消费总值',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
          return idx * 10;
        }
      }, {
        name: '标准通话消费总值',
        type: 'bar',
        data: data2,
        animationDelay: function (idx) {
          return idx * 10 + 100;
        }
      }],
      animationEasing: 'elasticOut',
      animationDelayUpdate: function (idx) {
        return idx * 5;
      }
    };
    return option;
  }

  getPieOption() {
    return {
      title: {
        text: '客户留存分析',
        subtext: '近期客户留存比例',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['保留', '待发展', '新增', '减少', '稳定']
      },
      series: [
        {
          name: '客户留存',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '保留' },
            { value: 310, name: '待发展' },
            { value: 234, name: '新增' },
            { value: 135, name: '减少' },
            { value: 1548, name: '稳定' }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

  }

  render() {
    const { location } = this.props
    return (
      <div>
        <ReactEcharts
          option={this.getBarOption()}
          notMerge={true}
          lazyUpdate={true}
          theme={"light"}
          onChartReady={this.onChartReadyCallback}
        // onEvents={EventsDict}
        />
        <br/>
        <br/>
        <br/>
        <ReactEcharts
          option={this.getPieOption()}
          notMerge={true}
          lazyUpdate={true}
          theme={"light"}
          onChartReady={this.onChartReadyCallback}
        // onEvents={EventsDict}
        />
      </div>
    )
  }
}

export default enterpriseData