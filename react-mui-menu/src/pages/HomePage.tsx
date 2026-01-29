import { Paper, Typography } from "@mui/material";

export default function HomePage() {
    return (
        <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "grey.100" }}>
            <Typography variant="h3" gutterBottom>
                Personaje de los simpsons
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
                listado dinamico usando API PUBLICA + CDN estable
                <br />
                <Typography variant="body2" sx={{ mt: 2 }}>
                    ejemplo ideal para practicas fetch y renderizado dinamico
                </Typography>
            </Typography>
        </Paper>
    );
}




