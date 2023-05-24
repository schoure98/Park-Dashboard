import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const useStyles = makeStyles((theme) => ({
  padding: {
    paddingTop: "70px",
  },
  chartContainer: {
    position: "relative",
    height: "100vh",
    width: "100vh",
  },
}));

function ActivitiesVsNP() {
  const [activitiesObject, setActivitiesObject] = useState({});
  const classes = useStyles();
  const fetchActivities = async () => {
    axios
      .get(
        `https://developer.nps.gov/api/v1/activities/parks?API_Key=OaR7jmqSa22JAcsym9lVfStp58LmCqH9JdZUPEH7`
      )
      .then((res) => {
        const activities = res.data.data;

        let activitiesObject = {};

        activities.forEach((activity) => {
          const parks = activity.parks.filter(
            (park) => park.designation === "National Park"
          );
          if (parks.length < 15) return;
          activitiesObject[activity.name] = parks;
        });
        console.log(activitiesObject);
        setActivitiesObject(activitiesObject);
      });
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  let data = {
    labels: Object.keys(activitiesObject),
    datasets: [
      {
        label: "Number of National Parks",
        data: Object.values(activitiesObject).map((parks) => {
          return parks.length;
        }),
        backgroundColor: [
          "rgba(255, 92, 92, 0.8)",
          "rgba(92, 168, 255, 0.8)",
          "rgba(255, 204, 92, 0.8)",
          "rgba(92, 204, 153, 0.8)",
          "rgba(168, 92, 255, 0.8)",
          "rgba(255, 138, 46, 0.8)",
          "rgba(255, 46, 46, 0.8)",
          "rgba(46, 168, 92, 0.8)",
          "rgba(92, 92, 255, 0.8)",
          "rgba(255, 168, 92, 0.8)",
          "rgba(92, 138, 255, 0.8)",
          "rgba(255, 168, 46, 0.8)",
          "rgba(168, 46, 46, 0.8)",
          "rgba(92, 168, 138, 0.8)",
          "rgba(168, 92, 207, 0.8)",
          "rgba(255, 195, 46, 0.8)",
          "rgba(138, 138, 255, 0.8)",
          "rgba(255, 207, 46, 0.8)",
          "rgba(92, 138, 92, 0.8)",
          "rgba(92, 92, 168, 0.8)",
          "rgba(255, 168, 92, 0.8)",
        ],

        borderColor: [
          "rgba(238, 133, 131, 1)",
          "rgba(139, 181, 226, 1)",
          "rgba(237, 214, 140, 1)",
          "rgba(157, 197, 183, 1)",
          "rgba(185, 154, 213, 1)",
          "rgba(245, 171, 119, 1)",
          "rgba(208, 108, 104, 1)",
          "rgba(92, 149, 120, 1)",
          "rgba(106, 111, 186, 1)",
          "rgba(235, 200, 108, 1)",
          "rgba(148, 162, 218, 1)",
          "rgba(250, 167, 125, 1)",
          "rgba(197, 124, 123, 1)",
          "rgba(142, 171, 151, 1)",
          "rgba(168, 140, 182, 1)",
          "rgba(251, 175, 130, 1)",
          "rgba(162, 170, 186, 1)",
          "rgba(238, 179, 114, 1)",
          "rgba(131, 139, 113, 1)",
          "rgba(130, 124, 172, 1)",
          "rgba(231, 157, 127, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={classes.chartContainer}>
      <Doughnut
        data={data}
        className={classes.padding}
        width={"50%"}
        options={{ maintainAspectRatio: true }}
      />{" "}
    </div>
  );
}

export default ActivitiesVsNP;