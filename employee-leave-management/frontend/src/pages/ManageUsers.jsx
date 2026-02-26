import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
    fetchManagers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUsers(data.users);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const fetchManagers = async () => {
    try {
      const { data } = await axios.get('/api/users/managers');
      setManagers(data.managers);
    } catch (error) {
      console.error('Failed to fetch managers');
    }
  };

  const handleEdit = (user) => {
    setEditingUser({
      id: user._id,
      role: user.role,
      department: user.department,
      managerId: user.managerId?._id || ''
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/users/${editingUser.id}`, {
        role: editingUser.role,
        department: editingUser.department,
        managerId: editingUser.managerId || null
      });
      toast.success('User updated successfully!');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`/api/users/${userId}`);
      toast.success('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Manage Users</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Email</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Role</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Department</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Manager</th>
                <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t dark:border-gray-700">
                  <td className="px-6 py-4 text-gray-800 dark:text-white">{user.name}</td>
                  <td className="px-6 py-4 text-gray-800 dark:text-white">{user.email}</td>
                  <td className="px-6 py-4">
                    {editingUser?.id === user._id ? (
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                        className="border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="employee">Employee</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className="capitalize text-gray-800 dark:text-white">{user.role}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingUser?.id === user._id ? (
                      <input
                        type="text"
                        value={editingUser.department}
                        onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                        className="border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <span className="text-gray-800 dark:text-white">{user.department}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingUser?.id === user._id ? (
                      <select
                        value={editingUser.managerId}
                        onChange={(e) => setEditingUser({ ...editingUser, managerId: e.target.value })}
                        className="border dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="">No Manager</option>
                        {managers.map((manager) => (
                          <option key={manager._id} value={manager._id}>
                            {manager.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-gray-800 dark:text-white">{user.managerId?.name || 'N/A'}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingUser?.id === user._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 dark:bg-green-600 text-white px-3 py-1 rounded hover:bg-green-600 dark:hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          className="bg-gray-500 dark:bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-600 dark:hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-500 dark:bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 dark:bg-red-600 text-white px-3 py-1 rounded hover:bg-red-600 dark:hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
