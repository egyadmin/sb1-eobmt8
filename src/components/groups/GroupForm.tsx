import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGroupStore, Group } from '../../lib/groupStore';
import { Save, Trash2 } from 'lucide-react';

const groupSchema = z.object({
  name: z.string().min(1, 'اسم المجموعة مطلوب'),
  description: z.string(),
  schedule: z.string().min(1, 'الجدول مطلوب'),
  status: z.enum(['active', 'inactive']),
});

type GroupFormData = z.infer<typeof groupSchema>;

interface GroupFormProps {
  group?: Group;
  onClose: () => void;
}

const GroupForm = ({ group, onClose }: GroupFormProps) => {
  const { addGroup, updateGroup, deleteGroup } = useGroupStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupFormData>({
    resolver: zodResolver(groupSchema),
    defaultValues: group || {
      status: 'active',
    },
  });

  const onSubmit = (data: GroupFormData) => {
    if (group) {
      updateGroup(group.id, data);
    } else {
      addGroup({
        id: Date.now().toString(),
        ...data,
        members: 0,
        createdAt: new Date().toISOString(),
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (group && window.confirm('هل أنت متأكد من حذف هذه المجموعة؟')) {
      deleteGroup(group.id);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {group ? 'تعديل مجموعة' : 'إضافة مجموعة جديدة'}
        </h2>
        {group && (
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
            اسم المجموعة
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
            الوصف
          </label>
          <textarea
            {...register('description')}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            الجدول
          </label>
          <select
            {...register('schedule')}
            className="w-full p-2 border rounded-lg"
          >
            <option value="">اختر الجدول</option>
            <option value="morning">الفترة الصباحية</option>
            <option value="evening">الفترة المسائية</option>
            <option value="night">الفترة الليلية</option>
          </select>
          {errors.schedule && (
            <p className="text-red-500 text-sm mt-1">{errors.schedule.message}</p>
          )}
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
            {group ? 'تحديث' : 'إضافة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupForm;