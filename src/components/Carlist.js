import React, { useState, useEffect } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";

import Addcar from "./Addcar";
import Editcar from "./Editcar";

export default function Carlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch("https://carstockrest.herokuapp.com/cars")
      .then(response => response.json())
      .then(data => setCars(data._embedded.cars));
  };

  const deleteCar = link => {
    if (window.confirm("Are you sure???")) {
      fetch(link, { method: "DELETE" })
        .then(res => fetchData())
        .catch(err => console.log(err));
    }
  };

  const saveCar = car => {
    fetch("https://carstockrest.herokuapp.com/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    })
      .then(res => fetchData())
      .catch(err => console.log(err));
  };

  const updateCar = (car, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(car)
    })
      .then(res => fetchData())
      .catch(err => console.log(err));
  };

  const columns = [
    { Header: "Brand", accessor: "brand" },
    { Header: "Model", accessor: "model" },
    { Header: "Color", accessor: "color" },
    { Header: "Fuel", accessor: "fuel" },
    { Header: "Year", accessor: "year" },
    { Header: "Price", accessor: "price" },

    {
      sortable: false,
      filterable: false,
      Cell: row => <Editcar updateCar={updateCar} car={row.original} />
    },

    {
      sortable: false,
      filterable: false,
      accessor: "_links.self.href",
      Cell: row => (
        <Button
          color="secondary"
          size="small"
          onClick={() => deleteCar(row.value)}
        >
          Delete
        </Button>
      )
    }
  ];

  return (
    <div>
      <Addcar saveCar={saveCar} />
      <ReactTable filterable={true} data={cars} columns={columns} />
    </div>
  );
}
