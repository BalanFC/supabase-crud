import { useState, useEffect } from "react";
import Layout from "@/components/shared/Layout";
import UserTable from "@/components/UserTable";
import UserModal from "@/components/UserModal";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { User } from "@/interfaces/User";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    setSelectedUser(undefined);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsConfirmationModalOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userToDelete }),
      });

      const updatedUsers = users.filter((user) => user.id !== userToDelete);
      setUsers(updatedUsers);

      setIsConfirmationModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSubmitUser = async (user: User) => {
    const method = user.id ? "PUT" : "POST";
    const response = await fetch("/api/users", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const updatedUser = await response.json();

    if (!updatedUser) {
      console.error("Error: User data is null or undefined");
      return;
    }

    if (method === "POST") {
      setUsers([...users, updatedUser]);
    } else {
      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUsers);
    }

    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button
          onClick={handleCreateUser}
          className="bg-blue-500 text-white p-2 rounded cursor-pointer"
        >
          Create User
        </button>
      </div>
      <UserTable
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />
      {isModalOpen && (
        <UserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitUser}
        />
      )}
      {isConfirmationModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={confirmDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this user?"
        />
      )}
    </Layout>
  );
};

export default Home;
