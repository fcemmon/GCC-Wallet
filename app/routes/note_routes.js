var eth = require('../eth.js');
var authService = require('../services/auth.service');

module.exports = function(app, db) {
  app.post('/wallet/create', (req, res) => {
    if (authService.checkAuth(req)) {
      eth.newAccount().then(function(value) {
        console.log("wallet created");
        res.send({status:true, data:{address:value.address, privateKey:value.privateKey}});
      }, function(error) {
        res.send({status:false, message:error});
      });
    } else {
      authService.responseError(res);
    }
  });
  app.post('/wallet/balances', (req, res) => {
    if (authService.checkAuth(req)) {
      let address = req.body.address;
      let contract = req.body.contract;
      if (!contract) {
        eth.getBalance(address).then(function(value) {
          res.send({status:true, data:value});
        }, function(error) {
          res.send({status:false, message:error});
        });
      } else {
        eth.getTokenBalance(address, contract).then(function(value) {
          res.send({status:true, data:value});
        }, function(error) {
          res.send({status:false, message:error});
        })
      }
    } else {
      authService.responseError(res);
    }
  });
  app.post('/transaction/create', (req, res) => {
    if (authService.checkAuth(req)) {
      let from = req.body.from;
      let to = req.body.to;
      let amount = req.body.amount;
      let contract = req.body.contract;
      let privateKey = req.body.privateKey;

      if (!contract) {
        eth.transfer(privateKey, from, to, amount).then(value => {
          res.send({status:true, data:value});
        }).catch(error => {
          res.send({status:false, message:error});
        })
      } else {
        eth.transferToken(privateKey, from, to, amount, contract).then(value => {
          res.send({status:true, data:value});
        }).catch(error => {
          res.send({status:false, message:error});
        })
      }
    } else {
      authService.responseError(res);
    }
  });
};

// var ObjectID = require('mongodb').ObjectID;
// module.exports = function(app, db) {
//   app.get('/notes/:id', (req, res) => {
//     const id = req.params.id;
//     const details = { '_id': new ObjectID(id) };
//     db.collection('notes').findOne(details, (err, item) => {
//       if (err) {
//         res.send({'error':'An error has occurred'});
//       } else {
//         res.send(item);
//       } 
//     });
//   });

// app.delete('/notes/:id', (req, res) => {
//     const id = req.params.id;
//     const details = { '_id': new ObjectID(id) };
//     db.collection('notes').remove(details, (err, item) => {
//       if (err) {
//         res.send({'error':'An error has occurred'});
//       } else {
//         res.send('Note ' + id + ' deleted!');
//       } 
//     });
//   });

// app.put('/notes/:id', (req, res) => {
//     const id = req.params.id;
//     const details = { '_id': new ObjectID(id) };
//     const note = { text: req.body.body, title: req.body.title };
//     db.collection('notes').update(details, note, (err, result) => {
//       if (err) {
//           res.send({'error':'An error has occurred'});
//       } else {
//           res.send(note);
//       } 
//     });
//   });