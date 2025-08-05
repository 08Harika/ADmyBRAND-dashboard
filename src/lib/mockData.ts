import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Metric Cards Data
export const metrics = [
  { title: "Revenue", value: "$120,000", icon: ArrowUpRight, trend: "up" },
  { title: "Users", value: "8,500", icon: ArrowUpRight, trend: "up" },
  { title: "Conversions", value: "1,200", icon: ArrowDownRight, trend: "down" },
  { title: "Growth", value: "+12.5%", icon: ArrowUpRight, trend: "up" },
];

// Line & Bar Chart Data
export const chartData = [
  { month: "Jan", revenue: 20000, users: 1500 },
  { month: "Feb", revenue: 30000, users: 2000 },
  { month: "Mar", revenue: 40000, users: 3000 },
  { month: "Apr", revenue: 50000, users: 4000 },
  { month: "May", revenue: 55000, users: 4500 },
];

// Pie Chart Data for Campaign Distribution
export const pieData = [
  { name: "Google Ads", value: 400 },
  { name: "Facebook Ads", value: 300 },
  { name: "LinkedIn Ads", value: 300 },
  { name: "Twitter Ads", value: 200 },
];

// Data Table Sample Data
export const tableData = [
  { campaign: "Google Ads", impressions: 120000, clicks: 3500, conversions: 1200 },
  { campaign: "Facebook Ads", impressions: 98000, clicks: 2900, conversions: 950 },
  { campaign: "LinkedIn Ads", impressions: 45000, clicks: 1200, conversions: 400 },
];
