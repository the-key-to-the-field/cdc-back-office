"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Spinner,
} from "@heroui/react";
import moment from "moment";

export const Datatable = ({
  columns,
  data,
  isLoading,
  handlePageChange,
}: {
  columns: any[];
  data: any;
  isLoading: boolean;
  handlePageChange: (page: number) => void;
}) => {
  type ItemType = {
    _id: string;
    [key: string]: any;
  };

  const renderCell = (item: ItemType, columnKey: any) => {
    const column = columns.find((c) => c.key === columnKey);

    switch (column?.type) {
      case "component":
        return column?.renderCell(item);
      case "date":
        return formatDate(item[column?.key]);
      default:
        return getKeyValue(item, column?.key) || "-";
    }
  };

  const formatDate = (date: string) => {
    return moment(date).format("ll");
  };

  return (
    <>
      <Table aria-label="table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No data found"}
          isLoading={isLoading}
          items={data?.items || []}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item: ItemType) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Pagination
          showControls
          initialPage={1}
          total={data?.pages}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};
