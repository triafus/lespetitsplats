import {
  Button,
  Card,
  Stack,
  Typography,
  CardContent,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TableRow,
  TableCell,
  TableContainer,
  Table,
  TableBody,
  TableHead,
  Box,
  CardMedia,
  Input,
  TextField,
  MenuItem,
  Select,
  Chip,
} from "@mui/material";
import recettes from "./Json/recettes.json";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [newUstensil, setNewUstensil] = useState("");
  const [newAppliance, setNewAplliance] = useState("");

  const ingredients = recettes.flatMap((recette) =>
    recette.ingredients.map((i) => i.ingredient)
  );

  const ustensiles = recettes.flatMap((recette) =>
    recette.ustensils.map((u) => u)
  );

  const appliances = recettes.map((recette) => recette.appliance);

  const uniqueArray = (array) =>
    array.reduce((acc, curr) => {
      return acc.includes(curr) ? acc : [...acc, curr];
    }, []);

  const handleChange = (event) => {
    const queryWords = query.trim().split(/\s+/);

    if (!queryWords.includes(event.target.value.toLowerCase())) {
      setQuery((prev) => `${prev} ${event.target.value}`.trim());
    }
    setNewIngredient(event.target.value);
    setNewAplliance(event.target.value);
    setNewUstensil(event.target.value);
  };

  const filteredDatas = recettes.filter((recette) => {
    const queryWords = query.toLowerCase().split(/\s+/);

    const searchableFields = [
      recette.name,
      ...recette.ingredients.map((i) => i.ingredient),
      ...recette.ustensils,
      recette.appliance,
    ];

    const searchableText = searchableFields.join(" ").toLowerCase();

    return queryWords.every((word) => searchableText.includes(word));
  });

  return (
    <>
      <Stack>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Stack>
          <Select
            id="ingredients"
            value={newIngredient}
            label="ingredients"
            onChange={handleChange}
          >
            {uniqueArray(ingredients).map((ingredient, i) => (
              <MenuItem key={i} value={ingredient}>
                {ingredient}
              </MenuItem>
            ))}
          </Select>
          <Select
            id="servings"
            value={newAppliance}
            label="appareils"
            onChange={handleChange}
          >
            {uniqueArray(appliances).map((appliance, i) => (
              <MenuItem key={i} value={appliance}>
                {appliance}
              </MenuItem>
            ))}
          </Select>
          <Select
            id="ustensils"
            value={newUstensil}
            label="ustensiles"
            onChange={handleChange}
          >
            {uniqueArray(ustensiles).map((ustensile, i) => (
              <MenuItem key={i} value={ustensile}>
                {ustensile}
              </MenuItem>
            ))}
          </Select>
          {arrayTags.map((tag) => (
            <Chip label={tag} />
          ))}

          <TableContainer>
            <Table>
              <TableHead />
              <TableBody
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {filteredDatas.map((recette) => (
                  <TableRow key={recette.id}>
                    <TableCell sx={{ border: "none", padding: 1 }}>
                      <Card flexWrap={"wrap"} sx={{ width: 375 }}>
                        <CardContent>
                          <Box justifyContent="center">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                gap: "8px",
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="194"
                                image={`../public/recettes/${recette.image}`}
                                alt="Paella dish"
                              />
                              <Typography variant="h6">
                                {recette.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                RECETTE
                              </Typography>
                              <Stack gap={1}>
                                {recette.ingredients.map((i) => (
                                  <Stack>
                                    <Typography>{i.ingredient}</Typography>
                                    <Typography
                                      variant="subtitle2"
                                      color="textSecondary"
                                    >
                                      {i.quantity} {i.unit}
                                    </Typography>
                                  </Stack>
                                ))}
                              </Stack>
                            </div>
                          </Box>
                        </CardContent>
                        <Accordion
                          slotProps={{ transition: { unmountOnExit: true } }}
                        >
                          <AccordionSummary>
                            <Typography>Description</Typography>
                          </AccordionSummary>
                          <AccordionDetails sx={{ maxWidth: 225 }}>
                            {recette.description}
                          </AccordionDetails>
                        </Accordion>
                      </Card>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Stack>
    </>
  );
};

export default App;
