import { useState } from "react";
import { User } from "@/interfaces/User";
import InputDate from "./shared/InputDate";
import InputCurrency from "./shared/InputCurrency";
import FormField from "./shared/FormField";
import { validateUserForm, ValidationErrors } from "@/utils/validation";

interface UserModalProps {
  user?: User;
  onClose: () => void;
  onSubmit: (user: User) => void;
}

const UserModal = ({ user, onClose, onSubmit }: UserModalProps) => {
  const [formData, setFormData] = useState<User>(
    user || {
      id: "",
      first_name: "",
      last_name: "",
      age: 0,
      dt_birth: "",
      balance: 0,
    }
  );

  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateUserForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl mb-4">{user ? "Edit User" : "Create User"}</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <FormField
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />

          {/* Last Name */}
          <FormField
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            error={errors.last_name}
          />

          {/* Age */}
          <FormField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
            error={errors.age}
          />

          {/* Date of Birth */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <InputDate
              name="dt_birth"
              value={formData.dt_birth}
              onChange={handleChange}
              className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2"
            />
            {errors.dt_birth && (
              <p className="text-red-500 text-sm mt-1">{errors.dt_birth}</p>
            )}
          </div>

          {/* Balance */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Balance
            </label>
            <InputCurrency
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              placeholder="$0.00"
              className="w-full max-w-xs p-2 border border-gray-300 rounded-md"
            />
            {errors.balance && (
              <p className="text-red-500 text-sm mt-1">{errors.balance}</p>
            )}
          </div>

          {/* Botões */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-500 text-white p-2 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded cursor-pointer"
            >
              {user ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
