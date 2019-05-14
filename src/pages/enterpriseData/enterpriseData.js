import React, { Component } from 'react'
import ReactEcharts from "echarts-for-react";

class enterpriseData extends Component {
  getBarOption() {
    var xAxisData = [];
    var data1 = [];
    var data2 = [];
    for (var i = 0; i < 100; i++) {
      xAxisData.push('类目' + i);
      data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
      data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
    }

    let option = {
      title: {
        text: '柱状图动画延迟'
      },
      legend: {
        data: ['bar', 'bar2'],
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
        name: 'bar',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
          return idx * 10;
        }
      }, {
        name: 'bar2',
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
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
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