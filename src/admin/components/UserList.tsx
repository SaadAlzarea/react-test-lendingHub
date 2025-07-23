import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
};

function UserList() {
  const api_url = "https://jsonplaceholder.typicode.com";

  const { data, isLoading } = useQuery<User[]>({
    queryKey: ["admin"],
    queryFn: async () => {
      const res = await axios.get<User[]>(`${api_url}/users`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {data?.map((i) => (
        <div className="flex gap-4" key={i.email}>
          <p>{i.name}</p>
          <p>{i.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;
