import { useEffect, useState } from "react";
import {Alert, Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";  

  const API_URL = 'https://thesimpsonsapi.com/api/characters';

  export default function ListadoPage() {
    const [characters, setCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageInput, setPageInput] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      const load = async (page = currentPage) => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`${API_URL}?page=${page}`);
          const data = await res.json();
          const list = Array.isArray(data) ? data : Array.isArray(data?.results) ? data.results : [];
          setCharacters(list);
          setTotalPages(data?.pages || 1);
          setCurrentPage(page);
          setPageInput(page);
        } catch (e) {
          console.error(e);
          setError('Error cargando la API de Simpsons');
        } finally {
          setLoading(false);
        }
      };

      load(currentPage);
    }, [currentPage]);

    const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
    const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
    const goToPage = (p: number) => setCurrentPage(Math.min(Math.max(1, p || 1), totalPages));

    return (
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={900} gutterBottom>
          Listado — Simpsons
        </Typography>

        <Box className="list-controls" sx={{ mb: 2 }}>
          <Box>
            <Button onClick={prevPage}><ArrowBack /></Button>
            <TextField
              type="number"
              value={pageInput}
              onChange={(e) => setPageInput(Number(e.target.value))}
              size="small"
              sx={{ width: 100, mx: 1 }}
            />
            <Button onClick={() => goToPage(pageInput)}>Ir</Button>
            <Button onClick={nextPage} sx={{ ml: 1 }}><ArrowForward /></Button>
          </Box>
          <Box className="api-url">{`${API_URL}?page=${currentPage}`}</Box>
        </Box>

        <Box className="meta" sx={{ mb: 1 }}>
          <Typography component="span" sx={{ mr: 2 }}>Página: {currentPage}/{totalPages}</Typography>
          <Typography component="span" sx={{ mr: 2 }}>Cargados: {characters.length}</Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress />
          </Box>
        ) : characters.length === 0 ? (
          <Alert severity="info">No hay personajes para mostrar.</Alert>
        ) : (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Edad</TableCell>
                <TableCell>Ocupación</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Foto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters.map((c, idx) => {
                const id = c?.id ?? idx;
                const img500 = `https://cdn.thesimpsonsapi.com/500/character/${id}.webp`;
                const img200 = `https://cdn.thesimpsonsapi.com/200/character/${id}.webp`;
                return (
                  <TableRow key={id} hover>
                    <TableCell>{c?.id ?? '-'}</TableCell>
                    <TableCell>{c?.name ?? '-'}</TableCell>
                    <TableCell>{c?.gender ?? '-'}</TableCell>
                    <TableCell>{c?.age ?? '-'}</TableCell>
                    <TableCell>{c?.occupation ?? '-'}</TableCell>
                    <TableCell>{c?.status ?? 'Unknown'}</TableCell>
                    <TableCell>
                      {c?.id ? (
                        <img
                          className="avatar"
                          src={img500}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const t = e.currentTarget as HTMLImageElement;
                            if (t.src === img500) t.src = img200;
                            else t.src = 'https://via.placeholder.com/60?text=?';
                          }}
                          alt={c?.name ?? 'avatar'}
                          style={{ width: 60, height: 60 }}
                        />
                      ) : (
                        <span style={{ color: '#667085' }}>—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>
    );
  }

