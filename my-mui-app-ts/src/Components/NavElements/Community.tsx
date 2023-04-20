import { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@material-ui/core";

interface User {
  id: number;
  name: string;
  email: string;
}

export function Community() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("http://localhost:4000/user", {
        method: "GET",
      });
      const data = await response.json();
      setUsers(data.data);
      console.log(data);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{marginTop:'10px',fontFamily:'serif',color:'white',padding:'4px'}}>
        User List
      </Typography>
      <List style={{background:'linear-gradient(to right,#6780F1, #35CC69)',border:'3px solid black',margin:'10px'}}>
        {users.map((user) => (
          <div key={user.id}>
            <ListItem alignItems="flex-start" style={{margin:'3px'}}>
              <ListItemAvatar>
                <Avatar>{user.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}
