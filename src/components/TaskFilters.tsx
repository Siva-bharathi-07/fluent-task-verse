
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Filter, Calendar, AlertTriangle, Star, Users, CheckCircle } from "lucide-react";

interface TaskFiltersProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const TaskFilters = ({ currentFilter, onFilterChange }: TaskFiltersProps) => {
  const filters = [
    { id: "all", label: "All Tasks", icon: null },
    { id: "today", label: "Due Today", icon: Calendar },
    { id: "overdue", label: "Overdue", icon: AlertTriangle },
    { id: "high-priority", label: "High Priority", icon: Star },
    { id: "shared", label: "Shared", icon: Users },
    { id: "completed", label: "Completed", icon: CheckCircle },
  ];

  const currentFilterLabel = filters.find(f => f.id === currentFilter)?.label || "All Tasks";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-[140px] justify-between">
          <div className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            {currentFilterLabel}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white border shadow-lg">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <DropdownMenuItem
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50 ${
                currentFilter === filter.id ? "bg-indigo-50 text-indigo-600" : ""
              }`}
            >
              {Icon && <Icon className="h-4 w-4 mr-2" />}
              {filter.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TaskFilters;
