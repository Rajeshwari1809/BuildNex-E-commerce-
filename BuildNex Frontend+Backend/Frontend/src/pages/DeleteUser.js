import axios from "axios";
import { useState, useEffect } from "react";

const DeleteUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await retrieveAllUsers();
      if (allUsers) {
        setUsers(allUsers);
      }
    };
    getUsers();
  }, []);

  const retrieveAllUsers = async () => {
    const response = await axios.get("http://localhost:8080/api/user/users");
    return response.data;
  };

  const deleteUser = async (id, e) => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/user/delete/" + id
      );
      console.log(response);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg border-color"
        style={{
          height: "45rem",
        }}
      >
        <div className="card-header text-center bg-color custom-bg-text">
          <h2>Users</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table table-hover custom-bg-text text-center">
              <thead
                className="bg-color table-bordered border-color"
                style={{ textAlign: "left" }}
              >
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className="text-color" style={{ textAlign: "left" }}>
                {users.map((user) => {
                  if (user.role === "Admin") {
                    return null;
                  }
                  return (
                    <tr key={user.id}>
                      <td>
                        <b>
                          {user.firstName} {user.lastName}
                        </b>
                      </td>
                      <td>
                        <b>{user.emailId}</b>
                      </td>
                      <td>
                        <b>{user.role}</b>
                      </td>
                      <td>
                        <button
                          className="btn bg-color custom-bg-text btn-sm"
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer custom-bg">
          <div className="float-right"></div>
        </div>
      </div>
    </div>
  );
};
export default DeleteUser;














