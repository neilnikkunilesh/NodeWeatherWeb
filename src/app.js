// const path  = require('path');
// const express = require('express');
// const hbs = require('hbs');
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')

// const app = express()
// // Define path for Express config
// const publicDirPath = path.join(__dirname,'../public')
// const viewsPath = path.join(__dirname,'../template/views')
// const partialsPath = path.join(__dirname,'../template/partials')
// const port = 3000

// // Setup handlebars engine and views location
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

// // Setup static directory to serve
// app.use(express.static(publicDirPath))



// app.get('', (req, res)=>{
//     res.render('index',{
//         title:'Weather App',
//         name:'Nilesh'
//     })
// })

// app.get('/about', (req, res)=>{
//     res.render('about',{
//         title:'ABOUT',
//         name:'Kinson'
//     })
// })
// app.get('/help', (req, res) => {
//     res.render('help',{
//         title:'HELP',
//         help:'We are here for you helping you any time'
//     })
// })

// app.get('/help/*', (req, res) => {
//     res.send('Help artical not Found');
// });

// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'You must provide an address!'
//         })
//     }

//     geocode(req.query.address, (error, { latitude, longitude, location }) => {
//         if (error) {
//             return res.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }

//             res.send({
//                 forecast: forecastData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })

// app.get('/products', (req, res) => {
//     if(!req.query.search){
//        return res.send({ // stopping the function to go in next code
//             error:'You must provide a search term'
//         })
//     }
    
//     console.log(req.query.search);
//     res.send({
//         products:[]
//     })
    
// })


// app.get('*', (req, res) => {
//     res.render('404');
// })
// app.listen(port, () => {
//     console.log(`Server started on port ${port}`);
// })




const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Port
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    if(req.query.address == 'boston'){
        res.send({
            forecast: 'Rain and breezy starting in the evening. Is is currently 44.88 degree out. There is a 0% chance or rain.',
                location:'Boston, Massachusetts, United States',
                address:'boston'
        })
            
    }else if(req.query.address == 'pune'){
        res.send({
            forecast: 'Sunny is too much . Is is currently 50 degree out. There is a 0% chance or rain.',
            location:'Pune, Maharastra, India',
            address:'pune'
        })
    }
    else{
        res.send({
            forecast: 'Your on Marce. No there is no CO2 for human',
            location:'Akhash ganga, near Sun',
            address:'marce'
        })
    }

    // geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
    //     if (error) {
    //         return res.send({ error })
    //     }

    //     forecast(latitude, longitude, (error, forecastData) => {
    //         if (error) {
    //             return res.send({ error })
    //         }

    //         res.send({
    //             forecast: forecastData,
    //             location,
    //             address: req.query.address
    //         })
    //     })
    // })
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
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port'+ port)
})