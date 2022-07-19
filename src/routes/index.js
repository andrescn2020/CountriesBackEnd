const { Router } = require('express');
const countriesRoute = require("./country");
const turismActivitiesRoute = require("./turismActivity");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/countries", countriesRoute);
router.use("/activity", turismActivitiesRoute);


module.exports = router;
