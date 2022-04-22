import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import tw from "twin.macro";

const Table = tw.table`
  table-fixed
  text-base
  text-gray-900
`;

const TableHead = tw.thead`
  p-2
`;

const TableRow = tw.tr`
border
border-green-500
`;

const TableHeader = tw.th`
border
border-green-500
p-2
`;

const TableBody = tw.tbody`
`;

const TableData = tw.td`
border
border-green-500
p-5
`;

const ObservationInfo = (props) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const response = await axios
      .get("http://localhost:3306/events")
      .catch((err) => console.log(err));

    if (response) {
      const events = response.data;

      console.log("Events: ", events);
      setEvents(events);
    }
  };

  console.log(events);
  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: "timestamp",
    },
    {
      Header: "Observed Events",
      columns: [
        {
          Header: "Event Type",
          accessor: "event_type",
        },
        {
          Header: "Fluid Type",
          accessor: "fluid",
        },
        {
          Header: "Amount Consumed",
          accessor: "consumed_volume_ml",
        },
        {
          Header: "Task Definition",
          accessor: "task_definition_description",
        },
      ],
    },
  ]);

  const eventsData = useMemo(() => [...events], [events]);

  const eventsColumns = useMemo(
    () =>
      events[0]
        ? Object.keys(events[0])
            .filter(
              (key) =>
                key ===
                [
                  "timestamp",
                  "events_type",
                  "consumed_volume_ml",
                  "task_definition_description",
                  "fluid",
                ]
            )
            .map((key) => {
              if (key === "timestamp")
                return {
                  Header: key,
                  accessor: key,
                };

              return { Header: key, accessor: key };
            })
        : [],
    [events]
  );

  const tableInstance = useTable({
    columns: eventsColumns,
    data: eventsData,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  useEffect(() => {
    fetchEvents();
  }, []);

  const isEven = (idx) => idx % 2 === 0;

  return (
    <>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);

            return (
              <TableRow
                {...row.getRowProps()}
                className={isEven(idx) ? "bg-green-400 bg-opacity-30" : ""}
              >
                {row.cells.map((cell, idx) => (
                  <TableData {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableData>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default ObservationInfo;
