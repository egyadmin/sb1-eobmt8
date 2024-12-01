import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useShiftStore, Shift } from '../../lib/stores/shiftStore';
import { Save, Trash2 } from 'lucide-react';

const shiftSchema = z.object({
  name: z.string().min(1, 'اسم الوردية مطلوب'),
  startTime: z.string(),
  endTime: z.string(),
  breakStart: z.string(),
  breakEnd: z.string(),
  workDays: z.array(z.number()),
  flexibleTime: z.boolean(),
  graceTime: z.number().min(0),
  overtimeEnabled: z.boolean(),
  status: z.enum(['active', 'inactive']),
});

type ShiftFormData = z.infer<typeof shiftSchema>;

interface ShiftFormProps {
  shift?: Shift;
  onClose: () => void;
}

const ShiftForm = ({ shift, onClose }: ShiftFormProps) => {
  const { addShift, updateShift, deleteShift } = useShiftStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShiftFormData>({
    resolver: zodResolver(shiftSchema),
    defaultValues: shift || {
      workDays: [],
      flexibleTime: false,
      overtimeEnabled: false,
      status: 'active',
    },
  });

  const onSubmit = (data: ShiftFormData) => {
    if (shift) {
      updateShift(shift.id, data);
    } else {
      addShift({
        id: Date.now().toString(),
        ...data,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (shift && window.confirm('هل أنت متأكد من حذف هذه الوردية؟')) {
      deleteShift(shift.id);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {shift ? 'تعديل وردية' : 'إضافة وردية جديدة'}
        </h2>
        {shift && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم الوردية
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وقت البداية
            </label>
            <input
              type="time"
              {...register('startTime')}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وقت النهاية
            </label>
            <input
              type="time"
              {...register('endTime')}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              بداية الاستراحة
            </label>
            <input
              type="time"
              {...register('breakStart')}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نهاية الاستراحة
            </label>
            <input
              type="time"
              {...register('breakEnd')}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              فترة السماح (دقائق)
            </label>
            <input
              type="number"
              {...register('graceTime', { valueAsNumber: true })}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            أيام العمل
          </label>
          <div className="grid grid-cols-7 gap-2">
            {['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(
              (day, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    value={index}
                    {...register('workDays')}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="mr-2 text-sm text-gray-700">{day}</span>
                </label>
              )
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('flexibleTime')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm text-gray-700">
              وقت مرن
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('overtimeEnabled')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded"
            />
            <label className="mr-2 text-sm text-gray-700">
              السماح بالعمل الإضافي
            </label>
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
            {shift ? 'تحديث' : 'إضافة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShiftForm;