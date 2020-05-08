const express = require('express');
const bcrypt = require('bcrypt');
require('dotenv').config()

const app = express();
app.use(express.json())

const users = [
  // {
  //   name: 'alan',
  //   password: "password"
  // },
  // {
  //   name: 'rick',
  //   password: "password"
  // },
  // {
  //   name: 'monty',
  //   password: "password"
  // }
]

app.get('/users', (req,res) => {
  res.json(users)
})

app.post('/users', async (req,res) => {

  const user = {
    name: req.body.name,
    password: req.body.password
  }
  
  // const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(user.password, 10)

  user.password = hashedPassword
  console.log(user);
  users.push(user)
  console.log(users);
  
  res.send(user)

})

app.post('/users/login', async (req,res) => {

  const user = users.find(user => user.name == req.body.name)
  if(user == null) return res.status(400).send('user not found')
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.redirect('https://google.com')
    } else {
      res.send('this is no such a user')
    }
    
    
  } catch (error) {
    res.status(500).send()
  }

    
})

app.listen(3000)
