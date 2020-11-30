module.exports = function() {
  var express = require('express');
  var router = express.Router();

  function getDrivers(res, mysql, context, complete) {
    mysql.pool.query("SELECT driver_id as id, driver_name, DATE_FORMAT(driver_dob, '%m/%d/%Y') as driver_dob, driver_height, driver_weight, team_name, driver_wins, vehicle_make, vehicle_model FROM driver LEFT OUTER JOIN team ON driver.team_id = team.team_id JOIN vehicle ON driver.vehicle_id = vehicle.vehicle_id", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.driver = results;
      complete();
    });
  }

  function getDriversByName(req, res, mysql, context, complete) {
    var query = "SELECT driver_id as id, driver_name, DATE_FORMAT(driver_dob, '%m/%d/%Y') as driver_dob, driver_height, driver_weight, team_name, driver_wins, vehicle_make, vehicle_model FROM driver LEFT OUTER JOIN team ON driver.team_id = team.team_id JOIN vehicle ON driver.vehicle_id = vehicle.vehicle_id WHERE driver_name LIKE " + mysql.pool.escape('%' + req.params.s + '%');
    console.log(query);

    mysql.pool.query(query, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.driver = results;
      complete();
    });
  }

  function getDriver(res, mysql, context, id, complete) {
    var sql = "SELECT driver_id as id, driver_name, DATE_FORMAT(driver_dob, '%Y-%m-%d') as driver_dob, driver_height, driver_weight, team_id, driver_wins, vehicle_id FROM driver WHERE driver_id = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.driver = results[0];
      complete();
    });
  }

  function getVehicles(res, mysql, context, complete) {
    mysql.pool.query("SELECT vehicle_id as id, vehicle_make, vehicle_model, vehicle_year FROM vehicle", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.vehicle = results;
      complete();
    });
  }

  function getVehicle(res, mysql, context, id, complete) {
    var sql = "SELECT vehicle_id as id, vehicle_make, vehicle_model, vehicle_year FROM vehicle WHERE vehicle_id = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.vehicle = results[0];
      complete();
    });
  }

  function getTeams(res, mysql, context, complete) {
    mysql.pool.query("SELECT team_id as id, team_name FROM team", function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.team = results;
      complete();
    });
  }

  function getTeam(res, mysql, context, id, complete) {
    var sql = "SELECT team_id as id, team_name FROM team WHERE team_id = ?";
    var inserts = [id];
    mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        res.write(JSON.stringify(error));
        res.end();
      }
      context.team = results[0];
      complete();
    });
  }

  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["searchDrivers.js", "delete.js"];
    context.active = { driver: true };
    var mysql = req.app.get('mysql');
    getDrivers(res, mysql, context, complete);
    getVehicles(res, mysql, context, complete);
    getTeams(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if ( callbackCount >= 3 ) {
        res.render('driver', context);
      }
    }
  });

  // Display one driver for the update driver Page
  router.get('/ud:id', function(req,res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["selected.js", "updateDriver.js"];
    var mysql = req.app.get('mysql');
    getDriver(res, mysql, context, req.params.id, complete);
    getVehicles(res, mysql, context, complete);
    getTeams(res, mysql, context, complete);
    function complete() {
      callbackCount++;
      if ( callbackCount >= 3 ) {
        res.render('driver_edit', context);
      }
    }
  });

  // Display one team for the update team Page
  router.get('/ut:id', function(req,res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["updateTeam.js"];
    var mysql = req.app.get('mysql');
    getTeam(res, mysql, context, req.params.id, complete);
    function complete() {
      callbackCount++;
      if ( callbackCount >= 1 ) {
        res.render('team_edit', context);
      }
    }
  });

  // Display one team for the update team Page
  router.get('/uv:id', function(req,res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["updateVehicle.js"];
    var mysql = req.app.get('mysql');
    getVehicle(res, mysql, context, req.params.id, complete);
    function complete() {
      callbackCount++;
      if ( callbackCount >= 1 ) {
        res.render('vehicle_edit', context);
      }
    }
  });

  router.get('/search/:s', function(req, res) {
      var callbackCount = 0;
      var context = {};
      context.jsscripts = ["searchDrivers.js"];
      context.active = { driver: true };
      var mysql = req.app.get('mysql');
      getDriversByName(req, res, mysql, context, complete);
      getVehicles(res, mysql, context, complete);
      getTeams(res, mysql, context, complete);
      function complete() {
        callbackCount++;
        if ( callbackCount >= 3 ) {
          res.render('driver', context);
        }
      }
  });

  router.post('/', function(req, res) {
    console.log(req.body.driver);
    console.log(req.body);
    var mysql = req.app.get('mysql');
    var sql;
    var inserts;
    if(req.body.insertDriver != null){
      if (!req.body.team) {
        if (!req.body.vehicle){
	        return;
        } else {
          sql = "INSERT INTO driver (driver_name, driver_dob, driver_height, driver_weight, driver_wins, vehicle_id) VALUES (?,?,?,?,?,?)";
          inserts = [req.body.name, req.body.dob, req.body.height, req.body.weight, req.body.wins, req.body.vehicle];
        }
      } else {
	      if (!req.body.vehicle){
	        return;
	      } else {
          sql = "INSERT INTO driver (driver_name, driver_dob, driver_height, driver_weight, team_id, driver_wins, vehicle_id) VALUES (?,?,?,?,?,?,?)";
          inserts = [req.body.name, req.body.dob, req.body.height, req.body.weight, req.body.team, req.body.wins, req.body.vehicle];
        }
      }
    }
    if (req.body.insertVehicle != null) {
      sql = "INSERT INTO vehicle (vehicle_make, vehicle_model, vehicle_year) VALUES (?,?,?)";
      inserts = [req.body.make, req.body.model, req.body.year];
    }
    if (req.body.insertTeam != null) {
      sql = "INSERT INTO team (team_name) VALUES (?)";
      inserts = [req.body.teamName];
    }
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(JSON.stringify(error));
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.redirect('/driver');
      }
    });
  })

  router.put('/ud:id', function(req, res) {
    var mysql = req.app.get('mysql');
    console.log(req.body);
    console.log(req.params.id);
    var sql = "UPDATE driver SET driver_name=?, driver_dob=?, driver_height=?, driver_weight=?, team_id=?, driver_wins=?, vehicle_id=? WHERE driver_id=?";
    var inserts;
    if ( req.body.team_id == "" ) {
      inserts = [req.body.name, req.body.dob, req.body.height, req.body.weight, null, req.body.wins, req.body.vehicle_id, req.params.id];
    } else {
      inserts = [req.body.name, req.body.dob, req.body.height, req.body.weight, req.body.team_id, req.body.wins, req.body.vehicle_id, req.params.id];
    }
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(error);
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.status(200);
        res.end();
      }
    });
  });

  router.put('/ut:id', function(req, res) {
    var mysql = req.app.get('mysql');
    console.log(req.body);
    console.log(req.params.id);
    var sql = "UPDATE team SET team_name=? WHERE team_id=?";
    var inserts = [req.body.name, req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(error);
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.status(200);
        res.end();
      }
    });
  });

  router.put('/uv:id', function(req, res) {
    var mysql = req.app.get('mysql');
    console.log(req.body);
    console.log(req.params.id);
    var sql = "UPDATE vehicle SET vehicle_make=?, vehicle_model=?, vehicle_year=? WHERE vehicle_id=?";
    var inserts = [req.body.make, req.body.model, req.body.year, req.params.id];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
      if (error) {
        console.log(error);
        res.write(JSON.stringify(error));
        res.end();
      } else {
        res.status(200);
        res.end();
      }
    });
  });

  router.delete('/dd:id', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM driver WHERE driver_id = ?";
      var inserts = [req.params.id];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.status(400);
              res.end();
          }else{
              res.status(202).end();
          }
      })
  })

  router.delete('/dt:id', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM team WHERE team_id = ?";
      var inserts = [req.params.id];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.status(400);
              res.end();
          }else{
              res.status(202).end();
          }
      })
  })

  router.delete('/dv:id', function(req, res){
      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM vehicle WHERE vehicle_id = ?";
      var inserts = [req.params.id];
      sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if(error){
              console.log(error)
              res.write(JSON.stringify(error));
              res.status(400);
              res.end();
          }else{
              res.status(202).end();
          }
      })
  })
  return router;
}();
