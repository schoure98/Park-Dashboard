import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import axios from "axios";

const BASE_URL = "https://developer.nps.gov/api/v1";
const API_KEY = "OaR7jmqSa22JAcsym9lVfStp58LmCqH9JdZUPEH7";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const DesignationPolarArea = (props) => {
  const [parks, setParks] = useState([]);
  useEffect(() => {
    const fetchParks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/parks`, {
          params: {
            api_key: API_KEY,
            limit: 500,
          },
        });

        setParks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchParks();
  }, []);

  //Fetch all the park designations
  const parkDesignations = parks.map((park) => park.designation);

  //Unique park designations
  const uniqueDesignations = [...new Set(parkDesignations)];
  console.log(uniqueDesignations);

  //Count of each unique designation
  const counts = parkDesignations.reduce((acc, designation) => {
    acc[designation] = (acc[designation] || 0) + 1;
    return acc;
  }, {});

  const countsOfDesignations = JSON.stringify(counts);
  console.log(countsOfDesignations);

  const filteredDesignations = Object.entries(counts)
    .filter(([designation, count]) => count > 8 && designation !== "")
    .reduce((obj, [designation, count]) => {
      obj[designation] = count;
      return obj;
    }, {});

  const designationData = {
    labels: Object.keys(filteredDesignations),
    datasets: [
      {
        label: "Count: ",
        data: Object.values(filteredDesignations),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(75, 192, 192)",
          "rgba(255, 205, 86)",
          "rgba(201, 203, 207)",
          "rgba(54, 162, 235)",
          "rgba(200, 100, 50)",
          "rgba(150, 200, 80)",
          "rgba(100, 150, 200)",
          "rgba(50, 80, 150)",
          "rgba(220, 120, 180)",
          "rgba(80, 220, 120)",
          "rgba(180, 80, 220)",
          "rgba(120, 180, 80)",
          "rgba(230, 160, 60)",
          "rgba(60, 230, 160)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <PolarArea
        style={{ width: "100%", height: "300px" }}
        data={designationData}
      />
    </div>
  );
};

export default DesignationPolarArea;
