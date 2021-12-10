$(function () {
  var start = moment().subtract(29, "days");
  var end = moment();

  function cb(start, end) {
    $("#reportrange-clicks span").html(
      start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
    );
  }

  $("#reportrange-clicks").daterangepicker(
    {
      startDate: start,
      endDate: end,
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
    },
    cb
  );

  cb(start, end);
});

var chartData = {
  labels: ["Category1", "Category2", "Category3", "Category4"],
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      backgroundColor: "#e94151",
      borderColor: "#e94151",
      borderWidth: 2,
      fill: false,
      data: [200000, 200000, 300000, 500000],
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "#8ccb59",
      data: [420000, 230000, 350000, 450000],
      borderColor: "white",
      borderWidth: 2,
      yAxisID: "left-y-axis",
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "#5daadd",
      data: [10, 40, 20, 80],
      yAxisID: "right-y-axis",
    },
  ],
};
var ctx = document.getElementById("myChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["category 1", "category 2", "category 3", "category 4"],
    datasets: [
      {
        label: "A",
        yAxisID: "B",
        type: "bar",
        backgroundColor: "#5daadd",
        hoverBackgroundColor: "#5daadd",
        data: [10, 40, 70, 80, 100],
        order: 3,
      },
      {
        label: "B",
        yAxisID: "A",
        data: [200000, 200000, 300000, 500000],
        hoverBackgroundColor: "#8ccb59",
        backgroundColor: "#8ccb59",
        type: "bar",
        order: 2,
      },
      {
        label: "C",
        data: [200000, 200000, 300000, 500000],
        type: "line",
        backgroundColor: "#e94151",
        borderColor: "#e94151",
        fill: false,
        order: 1,
        lineTension: 0,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          id: "A",
          type: "linear",
          position: "left",
          ticks: {
            max: 600000,
            min: 0,
          },
          scaleLabel: {
            display: true,
            labelString: "VIEWS & CLICKS",
            font: {
              size: 14,
              family: "'Open Sans', sans-serif",
            },
          },
        },
        {
          id: "B",
          type: "linear",
          position: "right",
          ticks: {
            max: 100,
            min: 0,
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
          scaleLabel: {
            display: true,
            labelString: "CLICK THROUGH RATE",
            font: {
              size: 14,
              family: "'Open Sans', sans-serif",
            },
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(0, 0, 0, 0)",
          },
        },
      ],
    },
  },
  tooltips: {
    mode: "index",
    intersect: true,
  },
});

$(function () {
  var start = moment().subtract(29, "days");
  var end = moment();

  function cb(start, end) {
    $("#reportrange-sejak-awal span").html(
      start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
    );
  }

  $("#reportrange-sejak-awal").daterangepicker(
    {
      startDate: start,
      endDate: end,
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        "Last 7 Days": [moment().subtract(6, "days"), moment()],
        "Last 30 Days": [moment().subtract(29, "days"), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
        "Last Month": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
    },
    cb
  );

  cb(start, end);
});

var numberBars = document.querySelectorAll(".stats-wrapper .stat");
var total = document
  .querySelector(".stats-wrapper .total .number-count")
  .getAttribute("data-number");

for (let i = 0; i < numberBars.length; i++) {
  if (i == 0) continue;
  var elm = numberBars[i];
  var labelBg = elm.querySelector(".bg");
  var numberCount = elm
    .querySelector(".number-count")
    .getAttribute("data-number");
  var percentage = (numberCount / total) * 100;
  labelBg.style.width = percentage + "%";
}
