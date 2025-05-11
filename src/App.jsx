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
  const [newAppliance, setNewAppliance] = useState("");
  const [tags, setTags] = useState([]);

  const [tagSearchTerms, setTagSearchTerms] = useState({});

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

  const handleIngredientChange = (event) => {
    const value = event.target.value;
    setNewIngredient(value);
    updateQueryAndTags(value);
  };

  const handleApplianceChange = (event) => {
    const value = event.target.value;
    setNewAppliance(value);
    updateQueryAndTags(value);
  };

  const handleUstensilChange = (event) => {
    const value = event.target.value;
    setNewUstensil(value);
    updateQueryAndTags(value);
  };

  const updateQueryAndTags = (value) => {
    if (tags.includes(value)) {
      return;
    }

    setTags((prevTags) => [...prevTags, value]);

    setTagSearchTerms(prev => ({
      ...prev,
      [value]: value.toLowerCase()
    }));

    setQuery((prev) => `${prev} ${value}`.trim());
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

  const handleDelete = (index) => {
    const tagToRemove = tags[index];

    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);

    const remainingTerms = Object.entries(tagSearchTerms)
      .filter(([tag]) => tag !== tagToRemove)
      .map(([_, term]) => term);

    const newTagSearchTerms = { ...tagSearchTerms };
    delete newTagSearchTerms[tagToRemove];
    setTagSearchTerms(newTagSearchTerms);

    setQuery(remainingTerms.join(" "));
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src="/src/assets/images/Logo.svg" alt="Logo" className="Logo" />
        </div>
        <div className="content-header">
          <Typography variant="h1">
            CHERCHEZ PARMI PLUS DE 1500 RECETTES DU QUOTIDIEN,SIMPLES ET DÉLICIEUSES
          </Typography>
          <div className="search">
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="search-input"
              value={query}
              placeholder="Rechercher une recette, un ingrédient, ..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass"
              className="svg-inline--fa fa-magnifying-glass icone" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path fill="currentColor"
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z">
              </path>
            </svg>
          </div>
        </div>
      </header>
      <div className="content">
        <Stack>
          <Stack>
            <div className="topbar">
              <div className="user-search-bar">
                <div className="user-search">
                  <Select
                    id="ingredients"
                    value={newIngredient}
                    displayEmpty
                    renderValue={(selected) => {
                      return "Ingrédients";
                    }}
                    onChange={handleIngredientChange}

                  >
                    {uniqueArray(ingredients).map((ingredient, i) => (
                      <MenuItem key={i} value={ingredient}>
                        {ingredient}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    id="appliances"
                    value={newAppliance}
                    displayEmpty
                    renderValue={(selected) => {
                      return "Appareils";
                    }}
                    onChange={handleApplianceChange}

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
                    displayEmpty
                    renderValue={(selected) => {
                      return "Ustensiles";
                    }}
                    onChange={handleUstensilChange}

                  >
                    {uniqueArray(ustensiles).map((ustensile, i) => (
                      <MenuItem key={i} value={ustensile}>
                        {ustensile}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="user-search-info">
                  {tags.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      variant="outlined"
                      onDelete={() => handleDelete(i)}
                    />
                  ))}
                </div>
              </div>
              <div className="count">
                <Typography variant="p">
                  {filteredDatas.length} recettes
                </Typography>
              </div>
            </div>
            <TableContainer>
              <Table>
                <TableHead />
                <TableBody
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: "30px",
                  }}
                >
                  {filteredDatas.map((recette) => (
                    <TableRow key={recette.id}>
                      <TableCell sx={{ border: "none", padding: 1 }}>
                        <Card
                          flexWrap="wrap"
                        >
                          <CardContent>
                            <Box justifyContent="center">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  height="194"
                                  image={`../public/recettes/${recette.image}`}
                                  alt="Paella dish"
                                />
                                <div className="recipe-content">
                                  <Typography variant="h6">
                                    {recette.name}
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    RECETTE
                                  </Typography>
                                  <Stack gap={1}>
                                    {recette.ingredients.map((i, idx) => (
                                      <Stack key={idx}>
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
      </div>
    </>
  );
};

export default App;