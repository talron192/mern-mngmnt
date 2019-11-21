const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const Routes = express.Router();
const fs = require('fs');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const path_ = require('path');
const bcrypt = require('bcrypt');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


// var url = 'mongodb://talRon:talro1992@ds131737.mlab.com:31737/heroku_cfp0fh8k‏';
// var url = 'mongodb+srv://talGlobalRon:talro1992!@cluster0-dklnq.mongodb.net/test?retryWrites=true&w=majority';
// var url = 'mongodb://talRon192:talro1992!@ds337507-a0.mlab.com:37507,ds337507-a1.mlab.com:37507/heroku_m6ndjfwk?replicaSet=rs-ds337507';
// var url = 'mongo ds337507-a0.mlab.com:37507/heroku_m6ndjfwk -u talRon192 -p talro1992!';
// var url = 'mongodb+srv://talRon:talro1992@cluster0-qpd3p.mongodb.net/customers';
var url = 'mongodb://127.0.0.1:27017/customers';

const port = process.env.MONGODB_URI || PORT;

let Customer = require('./customer.model');
let LoginDetails = require('./loginDetails.model');
var pathToCustomerId;
const multer = require('multer');
// const ejs = require('ejs');


//****Upload files*****/

//Storage a files

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = `${pathToCustomerId}`;
        if (fs.existsSync(path)) {
            cb(null, path);
        } else {
            fs.mkdirSync(path);
            cb(null, path);
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
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

Routes.route('/sendEmail/:id').post(function (req, res) {
    // service =req.body.email.split('@')[1].split('.')[0]; 
    // console.log('service1',service1);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'talglobalron@gmail.com',
            pass: 'talro1992'
        }
    });
    var mailOptions = {
        from: 'talglobalron@gmail.com',
        to: req.body.email,
        subject: req.body.subject,
        text: req.body.content,
        attachments: [
            {   // file on disk as an attachment
                filename: req.body.templateName+'.pdf',
                path:`../public/uploads/${req.params.id}/${req.body.templateName}.pdf`

            },
        ]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('$%$%$error');
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.json('ייפוי הכח נשלח בהצלחה ללקוח');
        }
    });
})
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
    let path = '../public/uploads/' + req.body.cid;
    pathToCustomerId = path;
    // console.log('pathToCustomerId', pathToCustomerId);
});

/* get list of files */



Routes.route('/getListFiles/:id').get(function (req, res) {
    let path = '../public/uploads/' + req.params.id;
    var filesTimeUploaded = [];
    fs.readdir(path, (err, files) => {
        files.forEach((file) => {
            filesTimeUploaded.push(getFileTimeUploaded(file, req.params.id));
        });
        // filesTimeUploaded.push(files);
        res.json({ filesTimeUpload: filesTimeUploaded, filesList: files });
    });

});

function getFileTimeUploaded(fileName, id) {
    let path = '../public/uploads/' + id + '/' + fileName;
    let uploadTime = fs.statSync(path).mtime.getTime();
    var date = new Date(uploadTime);
    month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();
    hour = date.getHours();
    minutes = date.getMinutes();
    minAndHour = [hour, minutes].join(':');
    fullDate = [year, month, day].join('-');
    fullDateTime = [fullDate, minAndHour].join(',');

    // console.log('date', fullDateTime);

    return fullDateTime;
}

/* get list of files */

Routes.route('/getId/:id').get(function (req, res) {
    let id = req.params.id;
    // let files= fs.readFileSync('public/uploads/756756867754');

    Customer.findById(id, function (err, customer) {
        if (err) {
            console.log("error:", err);
        } else {
            // console.log('getId', customer);
            res.json(customer);

        }
    });
});
Routes.route('/getComments/:id').get(function (req, res) {
    let id = req.params.id;
    // let files= fs.readFileSync('public/uploads/756756867754');

    Customer.findById(id, function (err, customer) {
        if (err) {
            console.log("error:", err);
        } else {
            res.json(customer.event);

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

Routes.route('/signUp').post(async (req, res) => {

    let _id = await (req.body._id);
    let salt = await bcrypt.genSalt();
    let hashPass = await bcrypt.hash(req.body.password, salt);
    const params = await { _id: _id, password: hashPass };
    console.log('fsdfsdfsd', params);

    let loginDetails = new LoginDetails(params);

    loginDetails.save()
        .then(() => {
            res.status(200).json({ 'ERROR_CODE': '200', 'auth': 'בוצע בהצלחה' });
        }).
        catch((e) => res.status(200).json({ 'ERROR_CODE': '500', 'auth': 'משתמש זה קיים במערכת' }));

});

Routes.route('/login').post(async (req, res_) => {
    let _id = await Number(req.body.loginDetails._id);
    // LoginDetails.findById(_id, (err, loginDetails) => {

    LoginDetails.findById(_id).then(loginDetails => {

        bcrypt.compare(req.body.loginDetails.password, loginDetails.password).then(res => {
            if (res) {
                res_.status(200).json('Verification done');
            } else {
                console.log('No matched');
                res_.status(201).json('אחד מהפרטים שהוקלדו שגויים!');
            }
        })
    }).catch(err => {
        console.log('ERROR', err);
    });
});

Routes.route('/deleteEvent/:id').post(function (req, res) {
    var customer_id = req.body.customer_id;
    var eventObj = req.body;

    update = {
        $set: { event: eventObj }
    },
        options = { upsert: true, useFindAndModify: false };

    Customer.findOneAndUpdate(customer_id, update, options, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!data) {
            return res.status(404).end();
        }
        return res.status(200).send(data);
    });

})


Routes.route('/uploadEvent/:id').post(function (req, res) {
    var customer_id = req.body.customer_id;
    var eventObj = req.body;
    var eventId = req.body._id;

    Customer.findById(customer_id, function (err, customer) {

        arrOfEvents = customer.event;
        for (let i in arrOfEvents) {

            if (arrOfEvents[i].eventID == eventId) {
                arrOfEvents[i] = eventObj;
                customer.event = arrOfEvents;
                query = { '_id': customer_id },
                    update = {
                        $set: { event: customer.event }
                    },
                    options = { upsert: true };
                Customer.findOneAndUpdate(query, update, options, function (err, data) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    if (!data) {
                        return res.status(404).end();
                    }
                    return res.status(200).send(data);
                });
            }
        }

    })
});

Routes.route('/addEvent/:id').post(function (req, res) {
    var id = req.body._id;
    var event = req.body;
    Customer.findById(id, function (err, customer) {

        arrOfEvents = customer.event;
        if (customer && arrOfEvents.length > 0) {
            arrOfEvents.push(event);
            customer.event = arrOfEvents;

        } else {
            customer.event = event;
        }
        customer.save()
            .then(customer => {
                res.send('אירוע נוצר בהצלחה!')
            })
            .catch(err => {
                res.status(400).send('update not possible');
            })
        // }
    })
});

Routes.route('/addTemplateFile/:id').post(function (req, res) {
    var id = req.body._id;
    var templateName = req.body.templateName;
    var fileToPdf;
    Customer.findById(id, function (err, customer) {
        var path = `../public/uploads/${id}`;
        if (!fs.existsSync(path)) {
            console.log('before create dir');
            fs.mkdirSync(path);
        }
        fs.readFile(`../backend/templates/${templateName}.html`, 'utf8', (err, file) => {
            if (err) throw err;
            fileToPdf = file;
            if (templateName == 'ProdRecipet') content_recieptFile = replaceAll(file, req.body, customer);
            if (templateName == 'PowerAttorney') content_recieptFile = replaceAllVars(file, req.body, customer);
            //  fs.writeFile(path+`/${templateName}.html`,content_recieptFile,(err,res_)=>{
            //     console.log('done');
            //  });
            var options = {
                format: 'A4',
                base: path + `/${templateName}.html`
            };
            fs.readFile(path + `/${templateName}.html`, (err, file) => {
                pdf.create(fileToPdf, options).toFile(`../public/uploads/${id}/${templateName}.pdf`,
                    (err) => {
                        if (err) return console.log('error', err);
                    })
                res.json(`המסמך נשמר בתיקית הלקוח`);
                //    console.log(file);

                // res.json(`../../public/uploads/${id}/Recipts/ProdReciept.html`);
            });
        });
    });
})


Routes.route('/addReceipt/:id').post(function (req, res) {
    var id = req.body._id;
    Customer.findById(id, function (err, customer) {

        var path = `../public/uploads/${id}/Recipts`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        fs.readFile('../backend/templates/ProdRecipet.html', 'utf8', (err, file) => {
            if (err) throw err;
            content_recieptFile = replaceAll(file, req.body, customer);
            fs.writeFile(path + '/ProdReciept.html', content_recieptFile, (err, res_) => {
                console.log('done');
            });
            fs.readdir(path + '/ProdReciept.html', (err, file) => {
                res.json(`../../public/uploads/${id}/Recipts/ProdReciept.html`);
            });
        });
    });
});

function replaceAllVars(file, details, customer) {
    var mapObj = {
        contactName: customer.fullName,
        ID: customer._id,
        busNAME: customer.fullName,
        numHp: customer._id
    }
    file = file.replace(/contactName|ID|busNAME|numHp/gi, function (matched) {
        return mapObj[matched];
    });
    return file;
}

function replaceAll(file, recipetDetails, customer) {
    // console.log(customer.phoneNumber);

    var mapObj = {

        AgentAddress: customer.address.houseAddress,
        AgentFax: 'מידע צחי',
        AgentEmail: customer.email,
        ContactName: customer.fullName,
        Customer_name: customer.fullName,
        Phone_number: customer.phoneNumber,
        ActionType: customer.actionType,
        RecipetDate: '25/04/1992',
        Description: recipetDetails.description,
        PerHour: '-------',
        CountHours: '--------',
        FixedPayment: recipetDetails.priceBeforeVAT,
        Discount: recipetDetails.discount,
        TotalPrice: recipetDetails.priceAfterDiscount
    }

    file = file.replace(/AgentAddress|AgentFax|AgentEmail|ContactName|Customer_name|Phone_number|ActionType|RecipetDate|Description|PerHour|CountHours|FixedPayment|Discount|TotalPrice/gi, function (matched) {
        return mapObj[matched];
    });
    return file;

}

Routes.route('/add').post(function (req, res) {
    let customer = new Customer(req.body);
    fs.mkdirSync(`../public/uploads/${customer._id}`);

    let address = req.body.address;
    customer.address = address;
    customer.save()
        .then(customer => {
            res.status(200).json({ 'customer': 'customer added successfuly', customer });
        });
});

Routes.route('/files-list').post(function (req, res) {
    let files = fs.readFileSync('756756867754');

    // console.log('files', files);
})

/*upload files */



app.use('/customers', Routes);
// app.use('https://peaceful-mesa-16202.herokuapp.com', Routes);


app.listen(port, function () {
    console.log("Server is listening to:" + port);
})