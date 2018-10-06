var express = require('express');
var router = express.Router();
var sql = require("mssql");
var md5 = require('md5')
var {Ejecutar_Procedimientos, EXEC_SQL, EXEC_SQL_OUTPUT} = require('../utility/exec_sp_sql')
// define the home page route

router.post('/get_surtidores_by_sucursal_caja', function (req, res) {
    input = req.body
    parametros = [
        {nom_parametro:'Cod_Sucursal',valor_parametro:input.Cod_Sucursal},
        {nom_parametro:'Cod_Caja',valor_parametro:input.Cod_Caja},
    ]
    procedimientos =[
        {nom_respuesta:'surtidores',sp_name:'USP_VIS_SURTIDORES_TXSucursalCaja',parametros}
    ]
    Ejecutar_Procedimientos(req,res,procedimientos)
});

 
module.exports = router;