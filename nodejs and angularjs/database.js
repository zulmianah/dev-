var express = require('express');
var base = require("pg");
var app = express();
var cookieSession = require('cookie-session');
var path = require('path');
var connectionString = "postgres://postgres:itu@localhost:5432/brick";
var fs = require("fs");
var mandrill = require('node-mandrill');
app.use('/', express.static('../public'));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

  // $http.get("http://localhost:4000/inserer/remb/client/"+des+"/"+j);
  // $http.get("http://localhost:4000/inserer/historisation/client/cred/"+des+"/"+j);
  app.get('/inserer/historisation/client/remb/:des/:j', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('INSERT INTO historisation (idcl,debit,credit,dateIns,action,tiers) VALUES (1,0,'+req.params.j+',CURRENT_DATE,\'rembourse\','+req.params.des+')',function(err,result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      };
      done();
    });
   });
  });
  app.get('/inserer/historisation/:client/cred/:des/:j', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('INSERT INTO remb (idcl,des,remb) VALUES (1,'+req.params.des+','+req.params.j+')',function(err,result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      };
      done();
    });
   });
  });
  app.get('/disponible/jet/client', function (req, res, next) {
    base.connect(connectionString, function (err, client, done) {
      if (err) {
        console.log("not able to get connection " + err);
        res.status(400).send(err);
      }
      client.query( 'select (solde - sum(jecl1)) as dispo,idcl1 as jet from partie join (select (sum(credit)-sum(debit)) as solde, idcl from historisation where idcl = 1 group by idcl) as his on idcl1 = idcl where id not in (select idp from res) and (idcl1 = 1) group by idcl1,solde', function (err, result) {
            done(); // closing the connection;
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
            res.status(200).send(result.rows);
          });
    });
  });
  app.get('/inserer/historisation/client/debit/:des/:j', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('INSERT INTO historisation (idcl,debit,credit,dateIns,action,tiers) VALUES (1,'+req.params.j+',0,CURRENT_DATE,\'preter\','+req.params.des+')',function(err,result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      };
      done();
    });
   });
  });
  app.get('/inserer/pret/:client/:des/:j', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('INSERT INTO pret (idcl,des,pret) VALUES (1,'+req.params.des+','+req.params.j+')',function(err,result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      };
      done();
    });
   });
  });
  app.get('/situation/pret/:client', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('select nom,sp,sr,(sp-sr) as manque from (select des,sum(pret) as sp from pret where idcl = 1 group by des) as rp left join (select idcl,sum(remb) as sr from remb where des = 1 group by idcl) as rr on rp.des = rr.idcl join client on client.id = des',function(err,result) {
           done(); // closing the connection;
           if(err){
             res.status(400).send(err);
           }
           res.status(200).send(result.rows);
           console.log(err);
         });
   });
  });
  app.get('/moy', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('select nom,avg(sp),avg(sr),avg((sp-sr)) as manque from (select des,sum(pret) as sp from pret where idcl = 1 group by des) as rp left join (select idcl,sum(remb) as sr from remb where des = 1 group by idcl) as rr on rp.des = rr.idcl join client on client.id = des group by nom',function(err,result) {
           done(); // closing the connection;
           if(err){
             res.status(400).send(err);
           }
           res.status(200).send(result.rows);
           console.log(err);
         });
   });
  });
  app.get('/liste/pret/:client', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('select nom,pret from pret  join client on des = client.id where idcl = 1',function(err,result) {
           done(); // closing the connection;
           if(err){
             res.status(400).send(err);
           }
           res.status(200).send(result.rows);
           console.log(err);
         });
   });
  });
  app.get('/liste/pret/:client/tiers', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('select nom,sum(pret) as pret from pret join client on des = client.id where idcl = 1 group by nom',function(err,result) {
           done(); // closing the connection;
           if(err){
             res.status(400).send(err);
           }
           res.status(200).send(result.rows);
           console.log(err);
         });
   });
  });
  app.get('/liste/client', function (req, res, next) {
    base.connect(connectionString,function(err,client,done) {
     if(err){
       console.log("not able to get connection "+ err);
       res.status(400).send(err);
     }
     client.query('select id,nom from client where id != 1',function(err,result) {
           done(); // closing the connection;
           if(err){
             res.status(400).send(err);
           }
           res.status(200).send(result.rows);
           console.log(err);
         });
   });
  });
  app.get('/historisation', function (req, res, next) {
    base.connect(connectionString, function (err, client, done) {
      if (err) {
        console.log("not able to get connection " + err);
        res.status(400).send(err);
      }
      client.query( 'select debit,credit,action,to_char(dateins,\'DD - MM - YYYY\') as dateins,(credit-debit)as solde,(select nom from client where client.id=tiers)as tiers from historisation join client on client.id = idcl where idcl = 1', function (err, result) {
            done(); // closing the connection;
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
            res.status(200).send(result.rows);
          });
    });
  });
  app.get('/historisation/tiers', function (req, res, next) {
    base.connect(connectionString, function (err, client, done) {
      if (err) {
        console.log("not able to get connection " + err);
        res.status(400).send(err);
      }
      client.query( 'select sum(debit) as debit,sum(credit)as credit,sum(credit-debit) as solde, nom as tiers from historisation join client on client.id = tiers where idcl=1 and tiers != 0 group by nom', function (err, result) {
            done(); // closing the connection;
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
            res.status(200).send(result.rows);
          });
    });
  });
  app.get('/essai', function (req, res, next) {
    base.connect(connectionString, function (err, client, done) {
      if (err) {
        console.log("not able to get connection " + err);
        res.status(400).send(err);
      }
      client.query('SELECT * from client', function (err, result) {
            done(); // closing the connection;
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
            res.status(200).send(result.rows);
          });
    });
  });
  app.get('/',parametre);
  function parametre (req, res, next) {
    // console.log(req.param('login'));
    res.sendFile(path.join(__dirname, 'brick', 'index.html'));
  }
  app.get('/oublier',parametre);
  function parametre (req, res, next) {
    // console.log(req.param('login'));
    res.sendFile(path.join(__dirname, 'brick', 'index.html'));
  }
  app.get('/h', function (req, res, next) {
    // console.log(req.session.nom);
    res.sendFile(path.join(__dirname, 'brick', 'index.html'));
  });
// app.get('/client/:nom/:mdp', function (req, res, next) {
//     base.connect(connectionString, function (err, client, done) {
//         if (err) {
//             console.log("not able to get connection " + err);
//             res.status(400).send(err);
//         }
//         client.query('SELECT id,nom,mdp from client where nom=\'' + req.params.nom + '\'', function (err, result) {
//             done(); // closing the connection;
//             if (err) {
//                 console.log(err);
//                 res.status(400).send(err);
//             }
//             var contents = result.rows;
//             if(contents==undefined) res.status(400).send(err);
//             if(!contents){
//             req.session.nom = contents[0].nom;
//             req.session.id = contents[0].id;
//             var dd = contents[0].length;
//             console.log(dd);
//
//             res.status(200).send(result.rows);
//             }
//         });
//     });
// });

app.get('/client/:nom/:mdp', function (req, res, next) {
  base.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(400).send(err);
    }
    client.query('SELECT id,nom,mdp from client where nom=\'' + req.params.nom + '\'', function (err, result) {
            done(); // closing the connection;
            if (err) {
              console.log(err);
              res.status(200).send("");
            }
            var contents = result.rows;
            if(contents[0]){
              req.session.nom = contents[0].nom;
              req.session.id = contents[0].id;
            }
            res.status(200).send(result.rows);
          });
  });
});
app.get('/perte/:email/:mdp', function (req, res, next) {
  base.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(200).send("err");
    }
    client.query('SELECT id,mail from client where mail=\'' + req.params.email + '\'', function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      var contents = result.rows;
      if(!contents[0]){
        res.status(400).send(err);
        // console.log("non"+contents[0]);
      }
      if(contents[0]){
        req.session.mail = req.params.email;
        res.sendFile(path.join(__dirname, 'brick', 'index.html'));
        res.status(200).send(result.rows);
        // console.log("reussi"+contents[0]);
      }
      done();
      // console.log(result.rows);
    });
  });
});
app.get('/verification/:email', function (req, res, next) {
  base.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(200).send("err");
    }
    client.query('SELECT id,mail from client where mail=\'' + req.params.email + '\'', function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      var contents = result.rows;
      if(!contents[0]){
        res.status(400).send(err);
        // console.log("non"+contents[0]);
      }
      if(contents[0]){
        req.session.mail = req.params.email;
        res.sendFile(path.join(__dirname, 'brick', 'index.html'));
        res.status(200).send(result.rows);
        // console.log("reussi"+contents[0]);
      }
      done();
      // console.log(result.rows);
    });
  });
});
app.get('/changer/:mdp', function (req, res, next) {
  base.connect(connectionString, function (err, client, done) {
    if (err) {
      console.log("not able to get connection " + err);
      res.status(200).send("err");
    }
    client.query('UPDATE client set mdp=\''+req.params.mdp+'\' where mail=\'' + req.session.mail + '\'', function (err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      var contents = result.rows;
      if(!contents[0]){
        res.status(400).send(err);
        // console.log("non"+contents[0]);
      }
      if(contents[0]){
        res.sendFile(path.join(__dirname, 'brick', 'index.html'));
        res.status(200).send(result.rows);
        // console.log("reussi"+contents[0]);
      }
      done();
      // console.log(result.rows);
    });
  });
});
app.listen(4000, function () {
  console.log('Server is running.. on Port 4000');
});