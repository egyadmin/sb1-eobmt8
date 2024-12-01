import { useState } from 'react';
import { useDeviceSettingsStore, DeviceSettings } from '../../lib/zkteco/deviceSettings';
import { Settings, Save, Server, Globe, Network } from 'lucide-react';

const DeviceConfiguration = () => {
  const { settings, updateSettings } = useDeviceSettingsStore();
  const [formData, setFormData] = useState<DeviceSettings>(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    alert('تم حفظ الإعدادات بنجاح');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Settings className="w-6 h-6 ml-2" />
          إعدادات الأجهزة
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ADMS Server Settings */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Server className="w-5 h-5 ml-2" />
            إعدادات ADMS
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.admsEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, admsEnabled: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                تفعيل وضع ADMS
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.enableDomainName}
                onChange={(e) =>
                  setFormData({ ...formData, enableDomainName: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                تفعيل اسم النطاق
              </label>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  عنوان الخادم
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.serverAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, serverAddress: e.target.value })
                    }
                    placeholder="example.com"
                    className="w-full p-2 pr-10 border rounded-lg"
                  />
                  <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  منفذ الخادم
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.serverPort}
                    onChange={(e) =>
                      setFormData({ ...formData, serverPort: Number(e.target.value) })
                    }
                    placeholder="80"
                    className="w-full p-2 pr-10 border rounded-lg"
                  />
                  <Network className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proxy Server Settings */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Server className="w-5 h-5 ml-2" />
            إعدادات الخادم الوسيط
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.proxyEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, proxyEnabled: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                تفعيل الخادم الوسيط
              </label>
            </div>

            {formData.proxyEnabled && (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    عنوان الخادم الوسيط
                  </label>
                  <input
                    type="text"
                    value={formData.proxyAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, proxyAddress: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    منفذ الخادم الوسيط
                  </label>
                  <input
                    type="number"
                    value={formData.proxyPort}
                    onChange={(e) =>
                      setFormData({ ...formData, proxyPort: Number(e.target.value) })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    اسم المستخدم
                  </label>
                  <input
                    type="text"
                    value={formData.proxyUsername}
                    onChange={(e) =>
                      setFormData({ ...formData, proxyUsername: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    value={formData.proxyPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, proxyPassword: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          >
            <Save className="w-5 h-5 ml-2" />
            حفظ الإعدادات
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeviceConfiguration;