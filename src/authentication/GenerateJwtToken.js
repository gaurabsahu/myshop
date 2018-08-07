var jwt = require('jsonwebtoken');
var Connection = require('../jdbc/Connection');
var jwtToken;

//v//ar app = express();


var GenerateJwtToken = {};

// authorization
GenerateJwtToken.validateToken = (async (req, res) => {
  try {
    //console.log(req.headers);
    const token = req.headers['jwttoken'];
    //console.log(token);
    const {
      username
    } = await jwt.verify(token, 'secret');
    req.username = username;
    //console.log(req.username);
    return req.next();
  } catch (e) {
    console.log('error' + e);
    return res.send("you are not authenticated");;
  }
});

GenerateJwtToken.createToken = function(req) {
  //console.log(req.body);
  var user = {
    userName: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  //console.log(user.userName);
  var con = Connection.getConnection();
  try {
    return promise = new Promise(function(resolve, reject) {
      con.query('select * from user where username=?', [user.userName],
        function(err, rows, fields) {
          if (!err && rows.length > 0) {
            console.log("rows" + rows.length);
            for (var i = 0; i < rows.length; i++) {
              console.log(rows[i].username);
              if (user.userName === rows[i].username &&
                user.password === rows[i].password) {
                console.log("verifyed")
                jwtToken = generateToken(user);
                console.log(jwtToken);
                resolve(jwtToken);
              } else {
                console.log("username not found");
                reject();
              }
            }

          } else {
            reject();
            //return err;
          }
          return promise;
        });
    });

  } catch (e) {
    console.log(e)
    //return e;
  } finally {
    con.end();
  }
  //console.log(jwtToken);
  //return jwtToken;
};
var generateToken = function(user) {
  jwtToken = jwt.sign({
    username: user.userName
  }, 'secret', {
    expiresIn: 100000
  });
  console.log(jwtToken);
  return jwtToken;
}


module.exports = GenerateJwtToken;
