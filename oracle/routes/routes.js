const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

router.get('/', (req, res) => {

    res.status(200).json({
        message:'Este es un mensaje del servidor'
    })

});

//READ
router.get('/getUsers', async (req, res) => {
    let personas=[];
    sql = "select * from person";

    let result = await BD.Open(sql, [], false);
    console.log(personas);

    result.rows.map(person=>{

        let useSchema ={
            "CODU": person[0],
            "USERNAME": person[1],
            "FIRSTNAME": person[2],
            "LASTNAME": person[3],
        }
        
        personas.push(useSchema)
    })

    res.json(personas);
})









module.exports = router;