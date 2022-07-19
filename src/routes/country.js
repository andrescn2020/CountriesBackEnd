const { Router } = require('express');
const { Countries, TurismActivities } = require("../db");
const router = Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.get("/", async (req, res, next) => {

    try {

        const { name } = req.query;

        if (name) {

            if (typeof name !== "string") {

                return res.status(404).json(`${name} no corresponde a un pais existente`);

            } else {

                let countriesDb = await Countries.findAll({

                    where: { name: { [Op.substring]: `%${name}%` } }
                    
                });

                return res.json(countriesDb);

            }

        }

            let countriesDb = await Countries.findAll({
                include: TurismActivities
            })

            return res.json(countriesDb);

    } catch (err) {

        next(err);

    }

});

router.get("/:id", async (req, res, next) => {

    const { id } = req.params;

    try {

        if (id === "ZtoA") {

            let countriesDb = await Countries.findAll({

                include: TurismActivities,
                order: [["name", "DESC"]]

            })

            return res.json(countriesDb);

        } else if (id === "AtoZ") {

            let countriesDb = await Countries.findAll({

                include: TurismActivities,
                order: [["name", "ASC"]],


            })

            return res.json(countriesDb);

        } else if (id === "FilterAfrica") {

            let countriesDb = await Countries.findAll({

                where: {

                    continent: "Africa"

                },

                include: TurismActivities

            })

            return res.json(countriesDb); 

        } else if (id === "FilterAmerica") {

            let countriesDb = await Countries.findAll({

                where: {

                    continent: "Americas"

                },

                include: TurismActivities

            })

            return res.json(countriesDb); 

        } else if (id === "FilterAntartida") {

            let countriesDb = await Countries.findAll({

                where: {

                    continent: "Antarctic"

                },

                include: TurismActivities

            })

            return res.json(countriesDb);

        } else if (id === "FilterAsia") {

            let countriesDb = await Countries.findAll({

                where: {

                    continent: "Asia"

                },

                include: TurismActivities

            })

            return res.json(countriesDb);

        } else if (id === "FilterOceania") {

            let countriesDb = await Countries.findAll({

                where: {

                    continent: "Oceania"

                },

                include: TurismActivities

            })

            return res.json(countriesDb);

        } else if (id === "FilterHighPop") {

            let countriesDb = await Countries.findAll({

                order: [

                    ["population", "DESC"]

                ],
                include: TurismActivities

            })

            return res.json(countriesDb);

        } else if (id === "FilterLowPop") {

            let countriesDb = await Countries.findAll({

                order: [

                    ["population", "ASC"]

                ],
                include: TurismActivities

            })

            return res.json(countriesDb);

        } else {

            let countriesDbId = await Countries.findOne({

                where: {

                    id: id

                },
                include: TurismActivities

            });

            return res.json(countriesDbId);
        }

    } catch (err) {

        next(err);

    }

});

module.exports = router;