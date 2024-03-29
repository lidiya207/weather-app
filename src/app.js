const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils copy/geocode')
const forecast = require('./utils copy/forecast')


const app = express();


app.set('view engine', 'hbs');

const viewsPath = path.join(__dirname, '../templates/views');
app.set('views', viewsPath);
const partialspath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialspath);

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather ',
        name:'lidiya'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name:'lidiya'
    }) 
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help', (req ,res)=>{
    res.render('Help',{
        title:'Help Me',
        textmessage: 'this text message is all about help',
        name:'lidiya'
    });
});

app.get('/help/*', (req ,res)=>{
    res.render('404',{
        title:' 404',
       errormessage:'this text is not found'
  
    });
});


app.get('*',(req ,res)=>{
    res.render('404', {
        title:'404',
        errormessage:'page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});
