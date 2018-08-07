var Authentication = {};

var GenerateJwtToken = require('./GenerateJwtToken');

Authentication.authenticate = function(req, res) {

  //console.log(req.body);

  var jwtToken = GenerateJwtToken.createToken(req).then(function(result) {
    console.log(jwtToken);
    console.log(jwtToken);
    if (jwtToken) {
      res.header({
        "jwtToken": jwtToken
      });
      //res.setHeader('Content-Type', 'application/json');
      res.json({
        authenticated: true
      });
    } else {
      res.json({
        authenticated: false
      });
    }
  }).catch(function(e) {
    res.json({
      authenticated: false
    });
  });

};

//basic operation end points


// app.get('/getDetail', function(req, res) {
//   res.send("get details");
// });
//
// app.post('/postItem', function(req, res) {
//   res.send('post Request');
// });
//
// app.delete('/deleteItem', function(req, res) {
//   res.send('DELETE Request');
//});

module.exports = Authentication;
