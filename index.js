const express=  require("express");
const users=require("./MOCK_DATA.json")
const fs=require("fs");
const { error } = require("console");

const app=express();
const PORT=8080;
//Middleware
app.use(express.urlencoded({extended : false}))
//Custom-middleware examples
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`${Date.now()}: ${req.method} ${req.path}\n`,(err,result)=>{
        console.log("Appended to file.");
        next();
    })
    
})
//routes
app.get("/users",(req,res)=>{
    const html=`
    <ul>
        ${users.map(user=>
            `<li>${user.first_name}</li>`
        ).join('')}
    </ul>
    `;
    return res.send(html);
});
//REST-API
app.get("/api/users",(req,res)=>{
    return res.json(users);
});
app.get("/api/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    const user=users.find((user)=> user.id === id);
    return res.json(user);
});

app.post("/api/users",(req,res)=>{
    const body = req.body;
users.push({ ...body, id: users.length + 1 });

fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    if (err) {
        return res.status(500).send("Problem on our side, please try later.");
    } else {
        return res.status(201).json({
            status: "Success",
            id: users.length
        });
    }
});

console.log(req.body);

  
});

app.patch("/api/users/:id", (req, res) => {
    const body = req.body;
    let id = Number(req.params.id);  

    if (id < 1 || id > users.length) {
        return res.status(400).json({ status: "Invalid user ID" });
    }

    users[id - 1].first_name = body.first_name;
    users[id - 1].last_name = body.last_name;
    users[id - 1].email = body.email;
    users[id - 1].gender = body.gender;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).send("Problem on our side.");
        } else {
            return res.json({ status: "successful" });
        }
    });
});

app.delete("/api/users/:id",(req,res)=>{
    const body=req.body;
    users.pop({...body,id: req.params.id});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        if(err){
            res.send("problem on our side.");
        }
        else{
            return res.json({ status: "successfull"})
        }
    })
})

app.listen(PORT,()=>console.log(`Server Started! at ${PORT}`));
