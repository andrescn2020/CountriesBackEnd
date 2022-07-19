//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Countries } = require('./src/db.js');
const axios= require('axios');
const PORT = process.env.PORT || 3001;

// --------------------------------------------------------------------------------------------------------------
// RECORDAR EL ENCODING DE POSTGRES PARA QUE TOME LOS PAISES
// --------------------------------------------------------------------------------------------------------------

const loadApi = async function(){

  try {

     const apiData = await axios.get('https://restcountries.com/v3/all');

    const filterApi = apiData.data.map((e) => {

            return {

                id: e.cca3,
                name: e.name.common,
                img: e.flags[0],
                continent: e.region,
                capital: e.capital === undefined || e.capital.length === 0 ? 'No hay dato' : e.capital[0],
                subregion: e.subregion === undefined ? e.subregion = 'No especificada' : e.subregion,
                area: e.area,
                population: e.population

              }

        });
        
        await Countries.bulkCreate(filterApi);

        

    } catch(err) {

      console.log(err);

    }
}

// Syncing all the models at once.
conn.sync({force: true}).then(() => {

  loadApi();
 

  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});
