import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Settings as SettingsIcon, Clock, Bell, Database } from 'lucide-react';
import { useSettingsStore } from '../../lib/settings/settingsStore';

const systemSettingsSchema = z.object({
  companyName: z.string().min(1, 'اسم الشركة مطلوب'),
  workStartTime: z.string(),
  workEndTime: z.string(),
  gracePeriod: z.number().min(0).max(60),
  autoSync: z.boolean(),
  syncInterval: z.number().min(1).max(60),
  language: z.enum(['ar', 'en']),
  timezone: z.string(),
  deviceSyncEnabled: z.boolean(),
  deviceSyncInterval: z.number().min(1).max(60),
  attendanceRules: z.object({
    lateThreshold: z.number().min(0).max(60),
    earlyDepartureThreshold: z.number().min(0).max(60),
    overtimeThreshold: z.number().min(0).max(120),
  }),
});

type SystemSettingsForm = z.infer<typeof systemSettingsSchema>;

const SystemSettings = () => {
  const { settings, updateSettings } = useSettingsStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SystemSettingsForm>({
    resolver: zodResolver(systemSettingsSchema),
    defaultValues: settings,
  });

  const onSubmit = (data: SystemSettingsForm) => {
    updateSettings(data);
    alert('تم حفظ الإعدادات بنجاح');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <SettingsIcon className="w-6 h-6 ml-2" />
            إعدادات النظام الأساسية
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Settings */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم الشركة
              </label>
              <input
                type="text"
                {...register('companyName')}
                className="w-full p-2 border rounded-lg"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اللغة
              </label>
              <select
                {...register('language')}
                className="w-full p-2 border rounded-lg"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* Work Hours Settings */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Clock className="w-5 h-5 ml-2" />
              إعدادات ساعات العمل
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  وقت بدء العمل
                </label>
                <input
                  type="time"
                  {...register('workStartTime')}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  وقت نهاية العمل
                </label>
                <input
                  type="time"
                  {...register('workEndTime')}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  فترة السماح (دقائق)
                </label>
                <input
                  type="number"
                  {...register('gracePeriod', { valueAsNumber: true })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المنطقة الزمنية
                </label>
                <select
                  {...register('timezone')}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Asia/Riyadh">التوقيت السعودي (UTC+3)</option>
                  <option value="Asia/Dubai">توقيت الإمارات (UTC+4)</option>
                  <option value="Asia/Kuwait">توقيت الكويت (UTC+3)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Attendance Rules */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Bell className="w-5 h-5 ml-2" />
              قواعد الحضور والانصراف
            </h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  حد التأخير (دقائق)
                </label>
                <input
                  type="number"
                  {...register('attendanceRules.lateThreshold', { valueAsNumber: true })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  حد الخروج المبكر (دقائق)
                </label>
                <input
                  type="number"
                  {...register('attendanceRules.earlyDepartureThreshold', { valueAsNumber: true })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  حد العمل الإضافي (دقائق)
                </label>
                <input
                  type="number"
                  {...register('attendanceRules.overtimeThreshold', { valueAsNumber: true })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Sync Settings */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Database className="w-5 h-5 ml-2" />
              إعدادات المزامنة
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('autoSync')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="mr-2 text-sm text-gray-700">
                  تفعيل المزامنة التلقائية
                </label>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الفاصل الزمني للمزامنة (دقائق)
                  </label>
                  <input
                    type="number"
                    {...register('syncInterval', { valueAsNumber: true })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
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
    </div>
  );
};

export default SystemSettings;