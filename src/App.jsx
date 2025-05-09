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
} from "@mui/material";
import recettes from "./Json/recettes.json";

const App = () => {
  return (
    <>
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
            {recettes.map((recette) => (
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
                          <Typography variant="h6">{recette.name}</Typography>
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
    </>
  );
};

export default App;
