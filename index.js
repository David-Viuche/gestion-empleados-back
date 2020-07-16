const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const empleadosRoutes = require('./src/routes/empleadosRoutes');
const usuariosRoutes = require('./src/routes/usuariosRoutes');

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.use('/empleados', empleadosRoutes);
app.use('/usuarios', usuariosRoutes);

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});