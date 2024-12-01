import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useHolidayStore, Holiday } from '../../lib/stores/holidayStore';
import { Save, Trash2 } from 'lucide-react';

const holidaySchema = z.object({
  name: z.string().min(1, 'اسم العطلة مطلوب'),
  startDate: z.string(),
  endDate: z.string(),
  type: z.enum(['public', 'company', 'department']),
  departments: z.array(z.string()),
  repeatsYearly: z.boolean(),
  status: z.enum(['active', 'inactive']),
});

type HolidayFormData = z.infer<typeof holidaySchema>;

interface HolidayFormProps {
  holiday?: Holiday;
  onClose: () => void;
}

const HolidayForm = ({ holiday, onClose }: HolidayFormProps) => {
  const { addHoliday, updateHoliday, deleteHoliday } = useHolidayStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HolidayFormData>({
    resolver: zodResolver(holidaySchema),
    defaultValues: holiday || {
      type: 'public',
      departments: [],
      repeatsYearly: false,
      status: 'active',
    },
  });

  const onSubmit = (data: HolidayFormData) => {
    if (holiday) {
      updateHoliday(holiday.id, data);
    } else {
      addHoliday({
        id: Date.now().toString(),
        ...data,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (holiday && window.confirm('هل أنت متأكد من حذف هذه العطلة؟')) {
      deleteHoliday(holiday.id);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {holiday ? 'تعديل عطلة' : 'إضافة عطلة جديدة'}
        </h2>
        {holiday && (
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
            اسم العطلة
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
            نوع العطلة
          </label>
          <select
            {...register('type')}
            className="w-full p-2 border rounded-lg"
          >
            <option value="public">عطلة رسمية</option>
            <option value="company">عطلة الشركة</option>
            <option value="department">عطلة القسم</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الأقسام
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                value="hr"
                {...register('departments')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                الموارد البشرية
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                value="it"
                {...register('departments')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                تقنية المعلومات
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                value="finance"
                {...register('departments')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                المالية
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('repeatsYearly')}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="mr-2 text-sm text-gray-700">
            تكرار سنوياً
          </label>
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
            {holiday ? 'تحديث' : 'إضافة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HolidayForm;