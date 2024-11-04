import React, { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";
import { PlusIcon, BlendingModeIcon, HomeIcon } from "@radix-ui/react-icons";
import {
  ApsaraColumnDef,
  Button,
  Checkbox,
  DataTable,
  Flex,
  Spinner,
  Text,
  useTable,
  Breadcrumb,
  toast,
  ToastContainer
} from "@raystack/apsara";
import { getData, Payment } from "./data";
const TOTAL_PAGES = 100;

export const columns: ApsaraColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onClick={(event) => event.stopPropagation()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
    meta: {
      data: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Success",
          value: "success",
        },
      ],
      defaultValue: "success",
    },
    filterVariant: "select",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row, getValue }) => <div className="lowercase">{getValue()}</div>,
    filterVariant: "text",
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    accessorFn: (originalRow) => originalRow.amount,
    cell: ({ getValue }) => {
      const amount = parseFloat(getValue());
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    filterVariant: "number",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row, getValue }) => (
      <div className="lowercase">
        {dayjs(getValue()).format("DD MMM YY HH:mm")}
      </div>
    ),
    filterVariant: "date",
  },
];

export const Assets = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [data, setData] = useState<Payment[]>([]);

  const loadMoreData = useCallback(() => {
    if (!isLoading && hasMoreData) {
      setIsLoading(true);
      // API simulation call to fetch more data
      setTimeout(() => {
        const moreData = getData();
        setData((prevData) => [...prevData, ...moreData]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
        if (page >= TOTAL_PAGES) {
          setHasMoreData(false);
        }
      }, 1000);
    }
  }, [isLoading, hasMoreData, page]);

  const showToast = (variant: string) => {
    switch (variant) {
      case "success":
        toast.success("Data loaded successfully!");
        break;
      case "error":
        toast.info("Error loading data!");
        break;
      default:
        toast("Default message");
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        initialState={{ sorting: [{ id: "amount", desc: true }] }}
        isLoading={isLoading}
        onLoadMore={loadMoreData}
      >
        <DataTable.Toolbar>
          <AssetsHeader />
          <DataTable.FilterChips />
          <Flex gap="small">
            <Button size="small" variant="primary" onClick={() => showToast("success")}>Show Success Toast</Button>
            <Button size="small" variant="danger" onClick={() => showToast("error")}>Show Error Toast with custom icon</Button>
          </Flex>
        </DataTable.Toolbar>
        <DataTable.Footer>
          <></>
        </DataTable.Footer>
      </DataTable>
      <ToastContainer />
    </>
  );
};

const AssetsHeader = () => {
  const { filteredColumns } = useTable();
  const isFiltered = filteredColumns.length > 0;
  const items = [
    { label: 'Home', href: '/', icon: <HomeIcon /> },
    { label: 'Category', href: '/category' },
    { 
      label: 'Subcategory', 
      href: '/category/subcategory',
      dropdownItems: [
        { label: 'Option 1', href: '/category/subcategory/option1' },
        { label: 'Option 2', href: '/category/subcategory/option2' },
        { label: 'Option 3', href: '/category/subcategory/option3' },
      ]
    },
    { label: 'Current Page', href: '/category/subcategory/current' },
  ];

  return (
    <Flex
      align="center"
      justify="between"
      style={{ width: "100%", padding: "4px" }}
    >
      <Flex gap="extra-large" align="center">
        <Text style={{ fontWeight: 500 }}>Assets</Text>
        <Breadcrumb
          items={items}
          maxVisibleItems={2}
          size="small"
          onItemClick={(item) => console.log('Clicked:', item)}
        />
      </Flex>
      <Flex gap="small">
        <AssetsFooter />
        {isFiltered ? <DataTable.ClearFilter /> : <DataTable.FilterOptions />}
        <DataTable.ViewOptions />
        <DataTable.GloabalSearch placeholder="Search assets..." />
      </Flex>
    </Flex>
  );
};

const AssetsFooter = () => {
  const { table } = useTable();

  return (
    <Flex align="center" justify="between" style={{ width: "100%" }}>
      <Text>
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {getData().length * (TOTAL_PAGES + 1)} row(s) selected.
      </Text>
    </Flex>
  );
};
