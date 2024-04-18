import React, { useState, useEffect } from 'react'
import Chart from "react-apexcharts";

export default function ChartWidget(props) {
  const [data, setData] = useState([
    { x: Date.now(), y: 0 },
    { x: Date.now(), y: 0 }, 
    { x: Date.now(), y: 0 }, 
    { x: Date.now(), y: 0 }, 
    { x: Date.now(), y: 0 },
    { x: Date.now(), y: 0 }, 
    { x: Date.now(), y: 0 }, 
    { x: Date.now(), y: 0 }, 
    { x: Date.now(), y: 0 }, 
    { x: Date.now(), y: 0 }
  ]);
  
  useEffect(() => {
    const val = { x: Date.now(), y: parseFloat(props.data) };
    let array = [...data, val];
    array.shift();
    setData(array);
    console.log(data);
  }, [props.data]);

  const series = [
    {
      name: props.block.title,
      data: data
    }
  ];

  const options = {
    chart: {
      id: "realtime",
      type: "line",
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        }
      },
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: "smooth"
    },
    markers: {
      size: 1,
      showNullDataPoints: true
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
        showDuplicates: true,
        datetimeUTC: true,
      },
    },
    yaxis: {
      max: 100
    },
    legend: {
      position: "bottom",
      verticalAlign: "center"
    }
  };

  return (
    <>
      <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
        {props.block.title}
      </h5>
      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
        {props.block.headline}
      </p>
      <Chart
        options={options}
        series={series}
        type="line"
      />
    </>
  )
};