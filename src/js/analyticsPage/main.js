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
  data: chartData,
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Chart.js Combo Bar Line Chart",
    },
    tooltips: {
      mode: "index",
      intersect: true,
    },
    scales: {
      "left-y-axis": {
        type: "linear",
        position: "left",
        suggestedMin: 0,
        suggestedMax: 600000,
        grid: {
          drawBorder: false,
        },
        display: true,
        title: {
          display: true,
          text: "VIEWS & CLICKS",
          font: {
            size: 14,
            family: "'Open Sans', sans-serif",
          },
        },
      },
      "right-y-axis": {
        type: "linear",
        position: "right",
        grid: {
          display: false,
          drawBorder: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
        drawBorder: false,
        title: {
          display: true,
          text: "CLICK THROUGH RATE",
          font: {
            size: 14,
            family: "'Open Sans', sans-serif",
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
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
