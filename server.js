const express = require("express")
const bcrypt = require("bcrypt")

const app = express()

app.use(express.json())

const users = ["test"]

app.get('/test', (req, res) => {
    res.json(users);
})

app.post('/test', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }

})


app.post('/test/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null)
    {
        return res.status(400).send("ga ada usernya coy. Yakin uda perna daftar?")

    }
    try {
        if (await bcrypt.compare(req.body.password, user.password))
        {
            res.send("sukses")
        } else {
            res.send("ga boleh")
        }  
    } catch (error) {
        res.status(500).send()
    }
})
app.listen(3000)