import express from "express";
import mysql from "mysql";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
const saltRounds = 10;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST,GET"],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "signup",
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.json({Message: "We need token  please provide it. "})
  }else{
    jwt.verify(token, "our-jsonwebtoken-secret-key",(err, decoded) => {
      if(err){
        return res.json({Message: "Authentication Error. "})
      }else{
        req.name = decoded.name;
        next();
      }
    })
  }
}

app.get('/',verifyUser,(req, res) => {
 return res.json({Status: "Success", name: req.name})
})

app.post('/login',(req,res) => {
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql,[req.body.email,req.body.password+10+"@network"],(err, data) =>{
    if(err) return res.json({Message: "Server Side Error"});
    if(data.length > 0 ){

      const name  = data[0].name;
      const token =jwt.sign({name},"our-jsonwebtoken-secret-key", {expiresIn: '1d'});
      res.cookie('token',token);
      return res.json({Status: "Success"})

    }else{
      return res.json({Message:"No Records existed"})
    }
  })
})


app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
   
      if (result.length == 0) {
        const name  =   req.body.email;
        const token =jwt.sign({name},"our-jsonwebtoken-secret-key", {expiresIn: '1d'});
        res.cookie('token',token);
       
        const q="INSERT INTO users (`email`,`password`) VALUES (?)"
    const values=[
        req.body.email,
        password+10+"@network",
       
    ]

    db.query(q,[values],(err,data)=>{
        if(err) res.json(err)
      
       
        return res.json({Status: "Success"})
    })

    
      } else {
        res.send({ msg: "Email var" });
      }
    });
  });

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"})

})

app.listen(8080, () => {
  console.log("Running");
});