import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardStatsProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  loading?: boolean;
}

export const CardStats = ({ title, value, icon: Icon, trend, loading = false }: CardStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 transition-transform duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-xl font-bold">{value}</h3>
        </div>
        <div className={cn(
          "p-2 rounded-full",
          trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        )}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
};
