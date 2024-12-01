import { useState } from 'react';
import { useDeviceStore, Device } from '../../lib/deviceStore';

interface DeviceFormProps {
  device?: Device;
  onClose: () => void;
}

const DeviceForm = ({ device, onClose }: DeviceFormProps) => {
  const { addDevice, updateDevice } = useDeviceStore();
  const [formData, setFormData] = useState<Partial<Device>>(
    device || {
      name: '',
      ipAddress: '',
      port: 4370,
      location: '',
      connectionType: 'ethernet',
      serialNumber: '',
      firmware: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (device) {
      updateDevice(device.id, formData);
    } else {
      addDevice({
        ...formData,
        id: Date.now().toString(),
        status: 'offline',
        lastSync: new Date().toISOString(),
      } as Device);
    }
    onClose();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        {device ? 'تعديل الجهاز' : 'إضافة جهاز جديد'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            اسم الجهاز
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            عنوان IP
          </label>
          <input
            type="text"
            value={formData.ipAddress}
            onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            المنفذ
          </label>
          <input
            type="number"
            value={formData.port}
            onChange={(e) => setFormData({ ...formData, port: Number(e.target.value) })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الموقع
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            نوع الاتصال
          </label>
          <select
            value={formData.connectionType}
            onChange={(e) => setFormData({ ...formData, connectionType: e.target.value as Device['connectionType'] })}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="ethernet">Ethernet</option>
            <option value="wifi">WiFi</option>
            <option value="usb">USB</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الرقم التسلسلي
          </label>
          <input
            type="text"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex justify-end space-x-4 rtl:space-x-reverse">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {device ? 'تحديث' : 'إضافة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceForm;