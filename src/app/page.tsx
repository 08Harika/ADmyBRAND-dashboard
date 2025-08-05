"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CardStats } from "@/components/CardStats";
import { Chart } from "@/components/Chart";
import { DataTable } from "@/components/DataTable";
import { ExportButtons } from "@/components/ExportButtons";
import { ColumnDef } from "@tanstack/react-table";
import { metrics as initialMetrics, chartData as initialChartData, pieData, tableData } from "@/lib/mockData";
import { Skeleton } from "@/components/ui/skeleton";

const columns: ColumnDef<typeof tableData[0]>[] = [
  { accessorKey: "campaign", header: "Campaign" },
  { accessorKey: "impressions", header: "Impressions" },
  { accessorKey: "clicks", header: "Clicks" },
  { accessorKey: "conversions", header: "Conversions" },
];

export default function DashboardPage() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [chartData, setChartData] = useState(initialChartData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const dataUpdateInterval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((item) => ({
          ...item,
          value: randomizeValue(item),
        }))
      );

      setChartData((prev) =>
        prev.map((item) => ({
          ...item,
          revenue: item.revenue + getRandomInt(-5000, 5000),
          users: item.users + getRandomInt(-500, 500),
        }))
      );
    }, 5000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(dataUpdateInterval);
    };
  }, []);

  const randomizeValue = (item: any) => {
    const base = parseFloat(item.value.toString().replace(/[^0-9.-]+/g, ""));
    const delta = getRandomInt(-1000, 1000);
    if (item.title === "Growth") {
      return `${(base + delta / 100).toFixed(1)}%`;
    }
    if (item.title === "Revenue") {
      return `$${(base + delta).toLocaleString()}`;
    }
    return `${(base + delta).toLocaleString()}`;
  };

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <main className="p-6 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {metrics.map((item) => (
          <CardStats key={item.title} {...item} loading={isLoading} />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 grid-cols-1 lg:grid-cols-2"
      >
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Over Time</h2>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <Chart type="line" data={chartData} />
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Users Over Time</h2>
          {isLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <Chart type="bar" data={chartData} />
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow"
      >
        <h2 className="text-lg font-semibold mb-4">Ad Campaign Distribution</h2>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <Chart type="pie" data={pieData} />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow"
      >
        <h2 className="text-lg font-semibold mb-4">Campaign Performance</h2>
        <ExportButtons data={tableData} />
        {isLoading ? (
          <Skeleton className="h-[400px] w-full" />
        ) : (
          <DataTable columns={columns} data={tableData} tableId="data-table" />
        )}
      </motion.div>
    </main>
  );
}
