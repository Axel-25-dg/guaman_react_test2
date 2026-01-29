import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { NavLink, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ListadoPage from "./pages/listadopage";
import InformacionPage from "./pages/informacion";
import EstadisticaPage from "./pages/estadististicapage";
const linkBtnSx = {
  color: "white",
  textTransform: "none",
  borderRadius: 2,
  px: 2,
  "&.active": { bgcolor: "rgba(31, 22, 22, 0.12)" },
};


export default function App() {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#0076ec" }}>
        <Toolbar sx={{ gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, mr: 2 }}>
            Simpson-Personajes
          </Typography>

          <Button component={NavLink} to="/" end sx={linkBtnSx}>
            Home
          </Button>
          <Button component={NavLink} to="/productos" sx={linkBtnSx}>
            listado
          </Button>
          <Button component={NavLink} to="/suma" sx={linkBtnSx}>
            Estadistica
          </Button>
          <Button component={NavLink} to="/multiplica" sx={linkBtnSx}>
            Informacion
          </Button>

          <Box sx={{ flex: 1 }} />
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ListadoPage />} />
          <Route path="/suma" element={<EstadisticaPage />} />
          <Route path="/multiplica" element={<InformacionPage />} />
        </Routes>
      </Container>
    </>
  );
}