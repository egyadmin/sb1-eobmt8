import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePermissionStore, Permission } from '../../lib/stores/permissionStore';
import { Save, Trash2 } from 'lucide-react';

const permissionSchema = z.object({
  employeeId: z.string().min(1, 'الموظف مطلوب'),
  employeeName: z.string().min(1, 'اسم الموظف مطلوب'),
  type: z.enum(['early_leave', 'late_arrival', 'absence', 'overtime']),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().min(1, 'سبب الاستئذان مطلوب'),
  status: z.enum(['pending', 'approved', 'rejected']),
});

type PermissionFormData = z.infer<typeof permissionSchema>;

interface PermissionFormProps {
  permission?: Permission;
  onClose: () => void;
}

const PermissionForm = ({ permission, onClose }: PermissionFormProps) => {
  const { addPermission, updatePermission, deletePermission } = usePermissionStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PermissionFormData>({
    resolver: zodResolver(permissionSchema),
    defaultValues: permission || {
      status: 'pending',
      type: 'early_leave',
    },
  });

  const onSubmit = (data: PermissionFormData) => {
    if (permission) {
      updatePermission(permission.id, data);
    } else {
      addPermission({
        id: Date.now().toString(),
        ...data,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (permission && window.confirm('هل أنت متأكد من حذف هذا الاستئذان؟')) {
      deletePermission(permission.id);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {permission ? 'تعديل استئذان' : 'إضافة استئذان جديد'}
        </h2>
        {permission && (
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
              الموظف
            </label>
            <select
              {...register('employeeId')}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">اختر الموظف</option>
              {/* TODO: Add employee options */}
            </select>
            {errors.employeeId && (
              <p className="text-red-500 text-sm mt-1">{errors.employeeId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع الاستئذان
            </label>
            <select
              {...register('type')}
              className="w-full p-2 border rounded-lg"
            >
              <option value="early_leave">خروج مبكر</option>
              <option value="late_arrival">حضور متأخر</option>
              <option value="absence">غياب</option>
              <option value="overtime">عمل إضافي</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ البداية
            </label>
            <input
              type="datetime-local"
              {...register('startDate')}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ النهاية
            </label>
            <input
              type="datetime-local"
              {...register('endDate')}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            سبب الاستئذان
          </label>
          <textarea
            {...register('reason')}
            rows={4}
            className="w-full p-2 border rounded-lg"
          />
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
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
            <option value="pending">قيد الانتظار</option>
            <option value="approved">تمت الموافقة</option>
            <option value="rejected">مرفوض</option>
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
            {permission ? 'تحديث' : 'إضافة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PermissionForm;