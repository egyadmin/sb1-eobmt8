import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Employees from './pages/Employees';
import Groups from './pages/Groups';
import Attendance from './pages/Attendance';
import Shifts from './pages/Shifts';
import Schedules from './pages/Schedules';
import Holidays from './pages/Holidays';
import Permissions from './pages/Permissions';
import Reports from './pages/Reports';
import SystemSettings from './components/settings/SystemSettings';
import DeviceSettings from './components/settings/DeviceSettings';
import UserSettings from './components/settings/UserSettings';
import AttendanceReport from './components/reports/AttendanceReport';
import LateReport from './components/reports/LateReport';
import StatisticsReport from './components/reports/StatisticsReport';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen lg:mr-64">
          {/* Header */}
          <Header onMenuClick={() => setIsSidebarOpen(true)} />

          {/* Main Content Area */}
          <main className="flex-1 p-4 lg:p-8 mt-16">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/shifts" element={<Shifts />} />
                <Route path="/schedules" element={<Schedules />} />
                <Route path="/holidays" element={<Holidays />} />
                <Route path="/permissions" element={<Permissions />} />
                <Route path="/reports" element={<Reports />}>
                  <Route path="attendance" element={<AttendanceReport />} />
                  <Route path="late" element={<LateReport />} />
                  <Route path="statistics" element={<StatisticsReport />} />
                </Route>
                <Route path="/settings" element={<Settings />}>
                  <Route path="system" element={<SystemSettings />} />
                  <Route path="devices" element={<DeviceSettings />} />
                  <Route path="users" element={<UserSettings />} />
                </Route>
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;