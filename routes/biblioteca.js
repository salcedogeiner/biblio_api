var express = require('express');
var router = express.Router();

// MongoDB connection with mongoose
var mongoose = require('mongoose');

// simple connection path
mongoose.connect(process.env.URL_MONGO); // 'mongodb://localhost:27017/data_bibliotecas'

/* Model register Biblioteca on bibliotecas collection */
var schema = new mongoose.Schema(
     {
        TipoClasificación: 'number',
        Nombre: 'string',
        Telefonos: 'string',
        HorarioGeneral: 'string',
        Fax: 'string',
        SitioWeb: 'string',
        Correo: 'string',
        Direccion: 'string',
        CordX: 'number',
        CordY: 'number'
    }
);

var Biblioteca = mongoose.model('Biblioteca', schema);

/* GET biblioteca
 * @query param id 
 */
router.get('/', function(req, res, next) {
    // Return record by id query param
    if (req.query.id) {
        Biblioteca.find({_id:req.query.id},function (err, tanks) {
            if (err) return console.error(err);
            res.json(tanks);
          })
    } else {
        // Return all records
        Biblioteca.find(function (err, tanks) {       
            if (err) return console.error(err);
            res.json(tanks);
          })
    }
});

/* GET biblioteca by id
 * @param id 
 */
router.get('/:id', function(req, res, next) {
    // Find and return record by id param
    Biblioteca.findById(req.params.id,function (err, tank) {
        if (err) return console.error(err);
        res.json(tank);
        })     
});

/* POST biblioteca */
router.post('/', function(req, res, next) {
    // Create a new record on bibliotecas
    Biblioteca.create(req.body,function(err,result){
        if (err) return handleError(err);
        res.json(result);
    })    
});

/* PUT biblioteca */
router.put('/', function(req, res, next) {
    // Update a record find by _id body param
    Biblioteca.findOneAndUpdate({_id:req.body._id},req.body,{upsert:true},function(err,result){
        if (err) return handleError(err);
        res.json(result);
    })    
});

/* Delete biblioteca
 * @param id
 */
router.delete('/:id', function(req, res, next) {
    // Delete record by id param
    Biblioteca.remove({_id: req.params.id},function(err,result){       
        if (err) return handleError(err);
        res.json(result);
    })    
});

function handleError(err) {
    console.log(err)
};


module.exports = router;
