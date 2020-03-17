const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

//old
const get_url = "enter URL"
const hyperlink= "compress"

//connect mongo
mongoose.connect('mongodb://localhost/5000', {
    useNewUrlParser: true, useUnifiedTopology: true
});

// set up app
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls })
    
})

app.post('/shortUrls', async (request, res) => {
    await ShortUrl.create({ full: request.body.fullUrl })

    res.redirect('/')
    
})

app.get('/:shortUrl', async(request, res) =>{
    const shortUrl = await ShortUrl.findOne({short: request.params.shortUrl})
    if (shortUrl == null){
        return res.sendStatus(404)
    }
    shortUrl.clicks++
    shortUrl.save()


    res.redirect(shortUrl.full)
})


app.listen(process.env.PORT || 5000);