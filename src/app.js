import express from "express"
import { bd } from "./db.js"

const app = express()

app.use (express.text())
app.use (express.json())

app.get("/",(rep, res) => {
    res.send("Pagina principal")
})

app.get("/user", (req, res) => {
    res.json (bd);
})

app.get ("/user/:id", (req, res) => {
    const userid = parseInt(req.params.id)

    const getuser = bd.find((e)=> e.id === userid)
if (getuser){
    res.json(getuser)
}else{
    res.json({"mensaje":"Este usuario no existe"})
}
})

app.post("/user", (req, res) =>{
    const id = req.body.id
    const user = req.body.user

    const newuser = bd.push({
        "id":id,
        "user": user
    })

    res.json({"mensaje": "Usuario creado"});

    console.log(newuser)
})

app.put("/user/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    const { user } = req.body;

    const getuser = bd.find((e)=> e.id === userid);

    getuser.user = user;

    console.log(getuser)

    res.json({"mensaje":"Usuario actualizado"})

})

app.delete("/user/:id", (req, res) => {
    const userid = parseInt(req.params.id);
    const getuser = bd.find((e)=> e.id === userid);
    
    const indexUser = bd.indexOf(getuser)
    const deleteUser = bd.splice(indexUser, 1)

    res.json({"mensaje":"Usuario eliminado"})
})

app.listen(3000, console.log("servidor funcionando"))