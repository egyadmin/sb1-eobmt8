import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEmployeeStore, Employee } from '../../lib/employeeStore';
import { Save, Trash2, UserPlus } from 'lucide-react';

const employeeSchema = z.object({
  name: z.string().min(1, 'اسم الموظف مطلوب'),
  employeeId: z.string().min(1, 'الرقم الوظيفي مطلوب'),
  department: z.string().min(1, 'القسم مطلوب'),
  position: z.string().min(1, 'المنصب مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().min(1, 'رقم الهاتف مطلوب'),
  joinDate: z.string(),
  status: z.enum(['active', 'inactive']),
  group: z.string(),
  fingerprint: z.boolean(),
  face: z.boolean(),
  card: z.boolean(),
});

type EmployeeFormData = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
  employee?: Employee;
  onClose: () => void;
}

const EmployeeForm = ({ employee, onClose }: EmployeeFormProps) => {
  const { addEmployee, updateEmployee, deleteEmployee } = useEmployeeStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: employee || {
      status: 'active',
      fingerprint: false,
      face: false,
      card: false,
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    if (employee) {
      updateEmployee(employee.id, data);
    } else {
      addEmployee({
        id: Date.now().toString(),
        ...data,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (employee && window.confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      deleteEmployee(employee.id);
      onClose();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <UserPlus className="ml-2 w-6 h-6" />
          {employee ? 'تعديل موظف' : 'إضافة موظف جديد'}
        </h2>
        {employee && (
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
              اسم الموظف
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full p-2 border rounded-lg"
              placeholder="أدخل اسم الموظف"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الرقم الوظيفي
            </label>
            <input
              type="text"
              {...register('employeeId')}
              className="w-full p-2 border rounded-lg"
              placeholder="أدخل الرقم الوظيفي"
            />
            {errors.employeeId && (
              <p className="text-red-500 text-sm mt-1">{errors.employeeId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              القسم
            </label>
            <select
              {...register('department')}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">اختر القسم</option>
              <option value="hr">الموارد البشرية</option>
              <option value="it">تقنية المعلومات</option>
              <option value="finance">المالية</option>
              <option value="operations">العمليات</option>
            </select>
            {errors.department && (
              <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المنصب
            </label>
            <input
              type="text"
              {...register('position')}
              className="w-full p-2 border rounded-lg"
              placeholder="أدخل المنصب الوظيفي"
            />
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 border rounded-lg"
              placeholder="example@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              رقم الهاتف
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full p-2 border rounded-lg"
              placeholder="05xxxxxxxx"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تاريخ الالتحاق
            </label>
            <input
              type="date"
              {...register('joinDate')}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              المجموعة
            </label>
            <select
              {...register('group')}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">اختر المجموعة</option>
              <option value="morning">الفترة الصباحية</option>
              <option value="evening">الفترة المسائية</option>
              <option value="night">الفترة الليلية</option>
            </select>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            طرق التحقق
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('fingerprint')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                بصمة الإصبع
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('face')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                بصمة الوجه
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('card')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <label className="mr-2 text-sm text-gray-700">
                البطاقة
              </label>
            </div>
          </div>
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
            {employee ? 'تحديث' : 'إضافة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;