import React from "react";
import { StyledTable, TableWrapper, EmptyHeader, EmptyText } from "./Table.styles";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { TriangleDownIcon, TriangleUpIcon } from "@radix-ui/react-icons";
import { StyledEmpty } from "../Table/Table.styles";
import { useVirtual } from "react-virtual";

interface ITableProps {
    selectedRowId?: number | null;
    alternate?: boolean;
    alternateHover?: boolean;
    className?: string;
    scroll?: any;
    columnsData: any[];
    sortable?: boolean;
    dataFetchFunction: (options: { pageIndex?: number; pageSize?: number }) => any;
}

function VirtualisedTable({ columnsData, sortable = false, dataFetchFunction }: ITableProps) {
    const columns: any[] = [];
    const columnHelper = createColumnHelper();
    columnsData.map((item) => {
        columns.push(
            columnHelper.accessor(item.key, {
                cell: (info) => info.getValue(),
                header: item.title ?? item.dataIndex,
            }),
        );
    });

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [data, setData] = React.useState(() => dataFetchFunction({}));

    const table = useReactTable({
        data: data?.rows,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    if (!data?.rows?.length) {
        return (
            <StyledEmpty>
                <EmptyHeader> We could not find it! </EmptyHeader>
                <EmptyText> We are sorry, but your search did not have any result </EmptyText>
            </StyledEmpty>
        );
    }

    const tableContainerRef = React.useRef<HTMLDivElement>(null);

    const { rows } = table.getRowModel();
    const rowVirtualizer = useVirtual({
        parentRef: tableContainerRef,
        size: rows.length,
        overscan: 10,
    });
    const { virtualItems: virtualRows, totalSize } = rowVirtualizer;
    const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
    const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

    return (
        <StyledTable>
            <TableWrapper ref={tableContainerRef} className="container">
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="table-cell">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                }}
                                                {...(sortable && {
                                                    className: header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : "",
                                                    onClick: header.column.getToggleSortingHandler(),
                                                })}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}

                                                {(sortable &&
                                                    {
                                                        asc: (
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <TriangleUpIcon color="#1890ff" />
                                                                <TriangleDownIcon />
                                                            </div>
                                                        ),
                                                        desc: (
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <TriangleUpIcon />
                                                                <TriangleDownIcon color="#1890ff" />
                                                            </div>
                                                        ),
                                                    }[header.column.getIsSorted() as string]) ?? (
                                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                                        <TriangleUpIcon />
                                                        <TriangleDownIcon />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {paddingTop > 0 && (
                            <tr>
                                <td style={{ height: `${paddingTop}px` }} />
                            </tr>
                        )}
                        {virtualRows.map((virtualRow) => {
                            const row = rows[virtualRow.index];
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                        {paddingBottom > 0 && (
                            <tr>
                                <td style={{ height: `${paddingBottom}px` }} />
                            </tr>
                        )}
                    </tbody>
                </table>
            </TableWrapper>
        </StyledTable>
    );
}

export default VirtualisedTable;
