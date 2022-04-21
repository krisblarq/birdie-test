import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import tw, { styled } from "twin.macro";

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
const url = "http://localhost:3306/events";

const ObservationTable = () => {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const events = await response.json();
      setLoading(false);
      setEvents(events);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const columns = useMemo(() => [
    {
      Header: "Date",
      accessor: "timestamp",
    },
    {
      Header: "Obbserved Events",
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
                  "event_type",
                  "fluid",
                  "consumed_volume_ml",
                  "task_definition_description",
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
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = tableInstance;

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <header>
        <h3>Care Recipient Observation Summary</h3>
      </header>
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
      </Table>
    </div>
  );
};

export default ObservationTable;
