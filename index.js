const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const joyasRoutes = require('./routes/joyasRoutes'); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(morgan('dev')); 
app.use(express.json()); 
app.use('/api', joyasRoutes); 

app.get('/', (req, res) => {
  res.send('API de Tienda de Joyas funcionando');
});

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
