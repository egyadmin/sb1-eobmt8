import { useState } from 'react';
import { useDeviceStore } from '../../lib/deviceStore';
import DeviceList from './DeviceList';
import DeviceForm from './DeviceForm';
import DeviceDetails from './DeviceDetails';
import { Settings, Plus } from 'lucide-react';

const DeviceSettings = () => {
  const [showAddDevice, setShowAddDevice] = useState(false);
  const { devices, selectedDevice } = useDeviceStore();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center">
          <Settings className="w-6 h-6 ml-2" />
          إعدادات الأجهزة
        </h1>
        <button
          onClick={() => setShowAddDevice(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة جهاز جديد
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-4">
          <DeviceList devices={devices} />
        </div>
        <div className="col-span-8">
          {showAddDevice ? (
            <DeviceForm onClose={() => setShowAddDevice(false)} />
          ) : selectedDevice ? (
            <DeviceDetails device={selectedDevice} />
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
              الرجاء اختيار جهاز من القائمة
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeviceSettings;