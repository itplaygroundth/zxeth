const mysql      = require('mysql');
const express    = require('express');
const bodyParser = require("body-parser");
const app        = express();
const { base64encode, base64decode } = require('nodejs-base64');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fx2"
});
con.connect(function(err) {
    if (err) throw err;
});
app.get('/login' , function(req, res){
  res.json({status: true});
});
app.post('/login' , function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    con.query("SELECT * FROM user_info WHERE username = '"+username+"' AND password = '"+password+"' LIMIT 1", function (err, result) {
      if(result.length > 0){
        res.json({status: true , userid: result[0].id});
      }else{
        res.json({status: false});
      }
    });
});
app.post('/checkuser' , function(req, res){
    var data = req.body.username;
    con.query("SELECT * FROM server_user_list", function (err, result) {
      if(result.length > 0){
        res.json({status: true});
      }else{
        res.json({status: false});
      }
    });
});
app.post('/getUserInfo' , function(req, res){
    var userid = req.body.userid;
    con.query("SELECT username,gclub_user,gclub_pass,setting FROM user_info WHERE id = '"+userid+"'", function (err, result) {
      res.json(result);
    });
});


app.get('/getUserList' , function(req, res){
  con.query("SELECT user FROM server_user_list", function (err, result) {
    var encoded = base64encode(JSON.stringify(result));
    res.send(encoded.replace(/H/g, '99H9'));
  });
});



app.post('/getSetting' , function(req, res){
  var userid = req.body.userid;
  con.query("SELECT setting FROM user_info WHERE id = '"+userid+"'", function (err, result) {
    res.json(result);
  });
});
app.post('/getGpass' , function(req, res){
  var userid = req.body.userid;
  con.query("SELECT gclub_pass FROM user_info WHERE id = '"+userid+"'", function (err, result) {
    res.json(result);
  });
});
app.post('/saveSetting' , function(req, res){
  var userid = req.body.userid;
  var data = req.body.data;
  var datas = JSON.stringify(data);
  con.query("UPDATE user_info SET setting = '"+datas+"' WHERE id = '"+userid+"'", function (err, result) {
    if(!err){
      res.json({status: true});
    }else{
      res.json({status: false});
    }
  });
});
app.post('/saveGpass' , function(req, res){
  var userid = req.body.userid;
  var data = req.body.data;
  con.query("UPDATE user_info SET gclub_pass = '"+data.gpass+"' WHERE id = '"+userid+"'", function (err, result) {
    if(!err){
      res.json({status: true});
    }else{
      res.json({status: false});
    }
  });
});
app.post('/saveuser' , function(req, res){
    var data = req.body;
    var promise1 = new Promise((resolve, reject) => {
        con.query("SELECT * FROM user_info WHERE username = '"+data.username+"' OR gclub_user = '"+data.gclub_user+"' LIMIT 1", function (err, result) {
            if(result.length === 0){
                resolve({status: true});
            }else{
                resolve({status: false});
            }
          });
    });
    promise1.then((value) => {
        if(value.status === true){
            con.query("INSERT INTO user_info(username,password,gclub_user,gclub_pass) VALUES ('"+data.username+"','"+data.password+"','"+data.gclub_user+"','"+data.gclub_pass+"')", function (err, result) {
                if(!err){
                    var returns = { status: true , msg: 'บันทึกข้อมูลสำเร็จ'};
                }else{
                    var returns = { status: false , msg: 'บันทึกข้อมูลไม่สำเร็จ'};
                }
                res.json(returns);
            });
        }else{
            res.json({ status: false , msg: 'รหัสใช้งาน หรือ ยูสเซอร์จีคลับ ซ้ำกับผู้อื่นกรุณาเปลี่ยนใหม่'});
        }
    })
});
app.listen(3000);