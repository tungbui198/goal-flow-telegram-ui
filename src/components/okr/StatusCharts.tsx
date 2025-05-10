
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Objective, Task } from '@/types/okr';

interface StatusChartsProps {
  objectives: Objective[];
  allTasks: Task[];
}

const StatusCharts: React.FC<StatusChartsProps> = ({ objectives, allTasks }) => {
  // Prepare data for Objectives Status chart
  const objectiveStatusData = [
    { name: 'Ongoing', value: objectives.filter(obj => obj.status === 'in-progress').length, color: '#1E88E5' },
    { name: 'Completed', value: objectives.filter(obj => obj.status === 'completed').length, color: '#4CAF50' },
    { name: 'Overdue', value: objectives.filter(obj => obj.status === 'behind').length, color: '#FF9800' },
    { name: 'Dropped', value: objectives.filter(obj => obj.status === 'not-started').length, color: '#F44336' },
  ].filter(item => item.value > 0);

  // Prepare data for Key Results Status chart
  const keyResults = objectives.flatMap(obj => obj.keyResults);
  const keyResultStatusData = [
    { name: 'Ongoing', value: keyResults.filter(kr => kr.progress < 100 && kr.progress > 0).length, color: '#1E88E5' },
    { name: 'Completed', value: keyResults.filter(kr => kr.progress === 100).length, color: '#4CAF50' },
    { name: 'Overdue', value: 0, color: '#FF9800' }, // We don't track overdue for key results directly
    { name: 'Dropped', value: keyResults.filter(kr => kr.progress === 0).length, color: '#F44336' },
  ].filter(item => item.value > 0);

  // Prepare data for Tasks Status chart
  const taskStatusData = [
    { name: 'To Do', value: allTasks.filter(task => task.progress === 0).length, color: '#1E88E5' },
    { name: 'In Progress', value: allTasks.filter(task => task.progress > 0 && task.progress < 100).length, color: '#FF9800' },
    { name: 'Completed', value: allTasks.filter(task => task.progress === 100).length, color: '#4CAF50' },
    { name: 'Archive', value: 0, color: '#F44336' }, // We don't have an archive status yet
  ].filter(item => item.value > 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Objectives Status Chart */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-100 py-3 px-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Objectives Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-64 flex items-center justify-center">
            {objectiveStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={objectiveStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {objectiveStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500">No data available</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Key Results Status Chart */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-100 py-3 px-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Key Results Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-64 flex items-center justify-center">
            {keyResultStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={keyResultStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {keyResultStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500">No data available</div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tasks Status Chart */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-100 py-3 px-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">OKR Tasks Status</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-64 flex items-center justify-center">
            {taskStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500">No data available</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatusCharts;
