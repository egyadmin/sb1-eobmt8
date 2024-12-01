import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, UserPlus, Key, Shield } from 'lucide-react';

const userSchema = z.object({
  username: z.string().min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل'),
  fullName: z.string().min(1, 'الاسم الكامل مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  role: z.enum(['admin', 'manager', 'user']),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  permissions: z.array(z.string()),
});

type UserForm = z.infer<typeof userSchema>;

const UserSettings = () => {
  const [users] = useState([
    {
      id: 1,
      username: 'admin',
      fullName: 'مدير النظام',
      email: 'admin@example.com',
      role: 'admin',
      lastLogin: '2024-03-01 10:30',
    },
    {
      id: 2,
      username: 'manager',
      fullName: 'مدير الموارد البشرية',
      email: 'hr@example.com',
      role: 'manager',
      lastLogin: '2024-03-01 09:15',
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserForm) => {
    console.log('User data:', data);
    // TODO: Implement user creation/update
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">المستخدمين</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  البريد الإلكتروني
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  الصلاحية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  آخر دخول
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="mr-3">
                        <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-sm text-gray-500">{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.role === 'admin' ? 'مدير النظام' : 'مدير'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">إضافة مستخدم جديد</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم المستخدم
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register('username')}
                  className="w-full p-2 pr-10 border rounded-lg"
                />
                <UserPlus className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الاسم الكامل
              </label>
              <input
                type="text"
                {...register('fullName')}
                className="w-full p-2 border rounded-lg"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
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
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  {...register('password')}
                  className="w-full p-2 pr-10 border rounded-lg"
                />
                <Key className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الصلاحية
              </label>
              <div className="relative">
                <select
                  {...register('role')}
                  className="w-full p-2 pr-10 border rounded-lg"
                >
                  <option value="admin">مدير النظام</option>
                  <option value="manager">مدير</option>
                  <option value="user">مستخدم</option>
                </select>
                <Shield className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الصلاحيات
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="manage_devices"
                  {...register('permissions')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="mr-2 text-sm text-gray-700">
                  إدارة الأجهزة
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="manage_users"
                  {...register('permissions')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="mr-2 text-sm text-gray-700">
                  إدارة المستخدمين
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  value="view_reports"
                  {...register('permissions')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                />
                <label className="mr-2 text-sm text-gray-700">
                  عرض التقارير
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
            >
              <UserPlus className="w-5 h-5 ml-2" />
              إضافة مستخدم
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;