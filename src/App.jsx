import { Button, Typography } from "@mui/material";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Typography>Bonjour Monde {count}</Typography>
      <Button onClick={() => setCount((count) => count + 1)}>Ajouter</Button>
    </>
  );
};

export default App;
