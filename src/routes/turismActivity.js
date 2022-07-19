const { Router } = require('express');
const { TurismActivities, Countries } = require('../db');
const router = Router();

router.post("/", async (req, res, next) => {
    
    try {

        const { name, difficult, duration, season, country } = req.body;

        if(country === "[]"){

            return res.status(404).json(`El pais no debe ser null`);

        } else {

            const newActivity = await TurismActivities.create(req.body);

            await newActivity.addCountries(country);
            
            return res.status(201).json(newActivity);  

        }
        
    } catch (err) {

        next(err);

    }
    
})

router.get("/", async (req, res, next) => {

    try {

        let activitiesDB = await TurismActivities.findAll({
            include: Countries
        })

        return res.json(activitiesDB);

    } catch (err) {

        next(err);

    }

 });

module.exports = router;