import "./index.scss";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ApiUser from "@app/api/ApiUser";
import Config from "@app/config";
import {Line} from "react-chartjs-2";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {DatePicker} from "antd";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import {useQuery} from "react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function Statics(): JSX.Element {
  dayjs.extend(weekday);
  dayjs.extend(localeData);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const dataStatics = useQuery(["Statics", date], () =>
    ApiUser.getStatics(date)
  );

  console.log("dataStatics----", dataStatics);

  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
    pan: {
      enabled: true,
      mode: "x",
    },
    zoom: {
      enabled: true,
      mode: "x",
      sensitivity: 0.5,
    },
  };

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div>
      <DatePicker
        value={dayjs(date)}
        onChange={(value, dateString) => {
          console.log("dateString---", dateString);

          setDate(dateString as any);
        }}
      />
      <div style={{height: 500, width: "100%"}}>
        <Line data={data} options={options as any} style={{width: "100%"}} />
      </div>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-lg text-center font-bold py-6">
          <div>Số khách hàng mới</div>
          <div className="mt-3">{dataStatics?.data?.countUserRegister}</div>
        </div>
        <div className="bg-white rounded-lg text-center font-bold py-6">
          <div>Số khách hàng đã tạo hồ sơ</div>
          <div className="mt-3">{dataStatics?.data?.countUserRegister}</div>
        </div>
        <div className="bg-white rounded-lg text-center font-bold py-6">
          <div>Số khách đã qua Zalo</div>
          <div className="mt-3">{dataStatics?.data?.countUserLink}</div>
        </div>
        <div className="bg-white rounded-lg text-center font-bold py-6">
          <div>Tỉ lệ chuyển đổi</div>
          <div className="mt-3">1</div>
        </div>
      </div>
    </div>
  );
}
