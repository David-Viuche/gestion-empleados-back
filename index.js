const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const empleadosRoutes = require('./src/routes/empleadosRoutes');

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.use('/empleados', empleadosRoutes);

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});