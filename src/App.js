import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "https://jsonplaceholder.typicode.com/users"; 

  const getUsers = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = async () => {
    const res = await fetch(API, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setUsers([...users, data]);
    setName("");
  };

  // DELETE
  const deleteUser = async (id) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    const filtered = users.filter((u) => u.id !== id);
    setUsers(filtered);
  };

  // SELECT USER FOR EDIT
  const editUser = (user) => {
    setName(user.name);
    setEditId(user.id);
  };

  // UPDATE
  const updateUser = async () => {
    const res = await fetch(`${API}/${editId}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const updatedUser = await res.json();

    const updatedUsers = users.map((u) =>
      u.id === editId ? updatedUser : u
    );

    setUsers(updatedUsers);
    setEditId(null);
    setName("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>React CRUD (Mock API)</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      {editId ? (
        <button onClick={updateUser}>Update</button>
      ) : (
        <button onClick={addUser}>Add</button>
      )}

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name}

            <button onClick={() => editUser(u)}>
              Edit
            </button>

            <button onClick={() => deleteUser(u.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
