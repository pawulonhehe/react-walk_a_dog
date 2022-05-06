import axios from "axios";
import { useEffect, useState } from "react";

interface Dog {
  id: number;
  name: string;
  age: number;
  breed: string;
}
interface Address {
  city: string;
  street: string;
  postal_code: string;
  house_number: string;
  flat_number: string;
}

interface Details {
  address: Address;
  phone_number: string;
  date_of_birth: string;
  image: string;
}

interface User {
  email: string;
  first_name: string;
  last_name: string;
  details: Details[];
  dogs: Dog[];
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
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
