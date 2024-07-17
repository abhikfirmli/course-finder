export default {};

// import {
//   DataTable,
//   DataTableSortStatus,
//   type DataTableProps,
// } from "mantine-datatable";
// import { showNotification } from "@mantine/notifications";
// import { Box } from "@mantine/core";
// import { useEffect, useState } from "react";
// import { sortBy } from "lodash";

// export default function FirmliTable({
//   columns,
//   records: data,
// }: DataTableProps) {
//   const [records, setRecords] = useState(sortBy(data, "name"));

//   const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
//     columnAccessor: "name",
//     direction: "asc",
//   });

//   useEffect(() => {
//     const sortedData = sortBy(data, sortStatus.columnAccessor);
//     setRecords(
//       sortStatus.direction === "desc" ? sortedData.reverse() : sortedData
//     );
//   }, [sortStatus, data]);

//   return (
//     <DataTable
//       striped
//       textSelectionDisabled
//       withTableBorder
//       borderRadius="sm"
//       withColumnBorders
//       highlightOnHover
//       sortStatus={sortStatus}
//       onSortStatusChange={setSortStatus}
//       records={records}
//       columns={columns as any}
//       totalRecords={records.length}
//       recordsPerPage={1}
//       page={1}
//       onPageChange={(p) => console.log(p)}
//       onRowClick={({ record: { name, party, bornIn } }: { record: any }) =>
//         showNotification({
//           title: `Clicked on ${name}`,
//           message: `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`,
//           withBorder: true,
//         })
//       }
//     />
//   );
// }
