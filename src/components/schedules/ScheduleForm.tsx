import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useScheduleStore, Schedule } from '../../lib/stores/scheduleStore';
import { Save, Trash2 } from 'lucide-react';

const scheduleSchema = z.object({
  name: z.string().min(1, 'اسم الجدول مطلوب'),
  startDate: z.string(),
  endDate: z.string(),
  shifts: z.array(
    z.object({
      shiftId: z.string(),
      employees: z.array(z.string()),
    })
  ),
  status: z.enum(['active', 'inactive']),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

interface ScheduleFormProps {
  schedule?: Schedule;
  onClose: () => void;
}

const ScheduleForm = ({ schedule, onClose }: ScheduleFormProps) => {
  const { addSchedule, updateSchedule, deleteSchedule } = useScheduleStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: schedule || {
      shifts: [],
      status: 'active',
    },
  });

  const onSubmit = (data: ScheduleFormData) => {
    if (schedule) {
      updateSchedule(schedule.id, data);
    } else {
      addSchedule({
        id: Date.now().toString(),
        ...data,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (schedule && window.confirm('هل أنت متأكد من حذف هذا الجدول؟')) {
      deleteSchedule(schedule.id);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {schedule ? 'تعديل جدول' : 'إضافة جدول جديد'}
        </h2>
        {schedule && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            اسم الجدول
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full p-2 border rounded-lg"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ البداية
            </label>
            <input
              type="date"
              {...register('startDate')}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ النهاية
            </label>
            <input
              type="date"
              {...register('endDate')}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الحالة
          </label>
          <select
            {...register('status')}
            className="w-full p-2 border rounded-lg"
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>
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
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600"
          >
            <Save className="w-5 h-5 ml-2" />
            {schedule ? 'تحديث' : 'إضافة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;