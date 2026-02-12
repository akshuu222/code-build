const express = require('express');
const os = require('os');
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/health', (req, res) => {
  res.json({
    status: "OK",
    hostname: os.hostname()
  })
})

app.get("/info",(req,res)=>{
  res.json({
    message:"hello from akshath"
  })
})

app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that page!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
