import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { CssBaseline, AppBar, Toolbar, Typography } from "@material-ui/core";
import useStyles from "../styles/styles";

const columns = [
  { field: "timestamp", headerName: "Timestamp", width: 200 },
  { field: "event_type", headerName: "Event Type", width: 220 },
  { field: "consumed_volume_ml", headerName: "Vol Consumed", width: 200 },
  { field: "task_definition_description", headerName: "Task", width: 300 },
  { field: "fluid", headerName: "Fluid", width: 200 },
];
const ObservationInfo = () => {
  const [events, setEvents] = useState([]);
  const classes = useStyles();

  const url = "http://localhost:3306/events";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (res.data !== undefined) {
          setEvents(res.data.data);
        }
      })
      .catch((err) => {});
  }, []);
  console.log(events);
  const processedEvents = events?.map((event) => event.payload);
  console.log(processedEvents);
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h4" align="center" gutterbottom>
            Birdie
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.main}>
          <Typography mt={10} variant="h4" align="center" gutterbottom>
            Observed Events Presentation
          </Typography>
        </div>
        <div style={{ height: 700, width: "90%", margin: "auto" }}>
          <DataGrid
            rows={processedEvents}
            columns={columns}
            pageSize={10}
            checkboxSelection
          />
        </div>
      </main>
    </>
  );
};

export default ObservationInfo;
