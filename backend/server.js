const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const Routes = express.Router();
const fs = require('fs');

// var url = 'mongodb://talRon:talro1992@ds131737.mlab.com:31737/heroku_cfp0fh8k‏';
var url = 'mongodb+srv://talGlobalRon:talro1992!@cluster0-dklnq.mongodb.net/test?retryWrites=true&w=majority';
// var url = 'mongodb://talRon192:talro1992!@ds337507-a0.mlab.com:37507,ds337507-a1.mlab.com:37507/heroku_m6ndjfwk?replicaSet=rs-ds337507';
// var url = 'mongo ds337507-a0.mlab.com:37507/heroku_m6ndjfwk -u talRon192 -p talro1992!';
// var url = 'mongodb+srv://talRon:talro1992@cluster0-qpd3p.mongodb.net/customers';
// var url = 'mongodb://127.0.0.1:27017/customers';

console.log('port============',process.env.MONGODB_URI);
const port = process.env.MONGODB_URI || PORT;


let Customer = require('./customer.model');
let LoginDetails = require('./loginDetails.model');

var pathToCustomerId;

const multer = require('multer');
// const ejs = require('ejs');
const path = require('path');

//****Upload files*****/

//Storage a files

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = `${pathToCustomerId}`;
        if (fs.existsSync(path)) {
            console.log('path exist');
            cb(null, path);
        } else {
            console.log('path not exist');
            fs.mkdirSync(path);
            cb(null, path);
        }
    },
    filename: function (req, file, cb) {
        console.log('file', file);
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});
//Init upload
const upload = multer({
    storage: Storage,
}).single('file');

Routes.route('/upload/').post(function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log('error in upload file', err);
        } else {
            res.send('!!המסמך הועלה בהצלחה');
        }
    });
});

//EJS
//app.set('view engine', 'ejs');

//public folder
//app.use(express.static('public'));

//app.get('/',(req,res)=>res.render('index'));

//****Upload files*****/

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(url, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log('MongoDb connection succssesfully');
});

Routes.route('/get-id/').post(function (req, res) {
    let path = 'public/uploads/' + req.body.cid;
    pathToCustomerId = path;
    console.log('pathToCustomerId', pathToCustomerId);
});

Routes.route('/getId/:id').get(function (req, res) {
    let id = req.params.id;
    // let files= fs.readFileSync('public/uploads/756756867754');

    Customer.findById(id, function (err, customer) {
        if (err) {
            console.log("error:", err);
        } else {
            res.json(customer);

        }
    });
});

Routes.route('/get').get(function (req, res) {
    Customer.find(function (err, customers) {
        if (err) {
            console.log(err);
        } else {
            res.json(customers);

        }
    });
});

Routes.route('/loginDetails').get(function (req, res) {
    LoginDetails.find(function (err, loginDetails) {
        if (err) {
            console.log(err);
        } else {
            res.json(loginDetails);

        }
    })

});



Routes.route('/add').post(function (req, res) {
    console.log('route-add');
    console.log(req.body);
    let customer = new Customer(req.body);
    fs.mkdirSync(`public/uploads/${customer._id}`);

    let address = req.body.address;
    customer.address = address;
    console.log('added customer', customer);

    customer.save()
        .then(customer => {
            res.status(200).json({ 'customer': 'customer added successfuly', customer });
        });
});

Routes.route( '/files-list').post(function (req,res){
    let files= fs.readFileSync('756756867754');

    console.log('files',files);
})

/*upload files */

app.use('/customers', Routes);
// app.use('https://peaceful-mesa-16202.herokuapp.com', Routes);


app.listen(port, function () {
    console.log("Server is listening to:" + port);
})