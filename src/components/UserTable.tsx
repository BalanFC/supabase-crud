import { FaEdit, FaTrash } from "react-icons/fa";
import { User } from "@/interfaces/User";
import { formatCurrency } from "@/utils/formatCurrency";

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
}

const UserTable = ({ users, onEditUser, onDeleteUser }: UserTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black tracking-wider">
              Date of Birth
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black tracking-wider">
              Balance
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-black tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            if (!user) return null;
            return (
              <tr key={user.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.first_name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.last_name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.age}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.dt_birth}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {formatCurrency(user.balance)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    onClick={() => onEditUser(user)}
                    className="text-blue-500 hover:text-blue-800 cursor-pointer"
                  >
                    <FaEdit size={24} />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-800 ml-4 cursor-pointer"
                  >
                    <FaTrash size={24} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
