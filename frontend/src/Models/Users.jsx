import axios from "axios";
import { useEffect, useState } from "react";

export const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("users/")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {users.map((user, idx) => (
        <ul key={idx}>
          <li key={user.email}>{user.email}</li>
          <li key={user.first_name}>{user.first_name}</li>
          <li key={user.last_name}>{user.last_name}</li>
        </ul>
      ))}
    </div>
  );
};
