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
const bcrypt = require('bcrypt');
const rateLimit = require("express-rate-limit");
const schedule = require('node-schedule');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// const url = 'mongodb+srv://talGlobalRon:4jqSIpibugSJp9AO@cluster0-dklnq.mongodb.net/customers?retryWrites=true&w=majority';
// const url = 'mongodb+srv://talGlobalRon:rXZL7HbEaAZw03tO@cluster0-dklnq.mongodb.net/customers?retryWrites=true&w=majority';
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
                filename: req.body.templateName + '.pdf',
                path: `../public/uploads/${req.params.id}/${req.body.templateName}.pdf`

            },
        ]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            req.body.templateName == 'PowerAttorney' ? res.json('ייפוי כח נשלח בהצלחה ללקוח') : res.json('קבלה נשלחה למייל')
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
        if (files) {

            files.forEach((file) => {
                filesTimeUploaded.push(getFileTimeUploaded(file, req.params.id));
            });
            res.json({ filesTimeUpload: filesTimeUploaded, filesList: files });
        } else { res.json('אין קבצים שהועלו') }
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


const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 1 hour window
    max: 5, // start blocking after 5 requests
    message:
        "Too many accounts created from this IP, please try again after an hour"
});

Routes.route('/signUp').post(async (req, res) => {

    let _id = await (req.body._id);
    let salt = await bcrypt.genSalt();
    let hashPass = await bcrypt.hash(req.body.password, salt);
    const params = await { _id: _id, password: hashPass };

    let loginDetails = new LoginDetails(params);

    loginDetails.save()
        .then(() => {
            res.status(200).json({ 'ERROR_CODE': '200', 'auth': 'בוצע בהצלחה' });
        }).
        catch((e) => res.status(200).json({ 'ERROR_CODE': '500', 'auth': 'משתמש זה קיים במערכת' }));

});

Routes.route('/login').post(loginLimiter, async (req, res_) => {
    let _id = await Number(req.body.loginDetails._id);
    // LoginDetails.findById(_id, (err, loginDetails) => {
    console.log(req.body);
    LoginDetails.findById(_id).then(loginDetails => {

        //  const token =  jwt.sign(
        //     {
        //       userName: loginDetails._id,
        //       password: loginDetails.password
        //     },
        //     'bfbdxbdfbdfmjh,jkgh',
        //     { expiresIn: '1h' }
        //   );

        bcrypt.compare(req.body.loginDetails.password, loginDetails.password).then(res => {
            if (res) {
                res_.status(200).json({ token: 'token' });
            } else {
                console.log('No matched');
                res_.status(201).json('אחד מהפרטים שהוקלדו שגויים!');
            }
        })

    }).catch(err => {
        res_.status(500).json(err);
    });
});

Routes.route('/deleteEvent/:id').post(function (req, res) {
    var customer_id = req.params.id;
    var eventObj = req.body;
    query = { '_id': customer_id },
        update = {
            $set: { event: eventObj }
        },
        options = { upsert: true, useFindAndModify: false };
    Customer.findOneAndUpdate(query, update, options, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        // console.log('data',data);
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
            .then(() => {
                res.send('אירוע נוצר בהצלחה!')
            })
            .catch(err => {
                res.status(400).send('update not possible', err);
            })
        // }
    })
});

Routes.route('/fileIsExist/:id').post(function (req, res) {
    console.log('server-fileIsExist', req.body);
    isExist = false;
    var path = `../public/uploads/${req.body.customerId}/${req.body.fileName}.pdf`;
    try {
        if (fs.existsSync(path)) {
            isExist = true;
        }
        res.json(isExist);
    } catch (err) {
        console.error(err)
    }
})

Routes.route('/addTemplateFile/:id').post(function (req, res) {
    var id = req.body._id;
    var templateName = req.body.templateName;
    var fileToPdf;
    Customer.findById(id, function (err, customer) {
        var path = `../public/uploads/${id}`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        fs.readFile(`../backend/templates/${templateName}.html`, 'utf8', (err, file) => {
            if (err) throw err;
            fileToPdf = file;
            if (templateName == 'ProdRecipet') content_recieptFile = replaceAll(file, req.body, customer);
            if (templateName == 'PowerAttorney') content_recieptFile = replaceAllVars(file, req.body, customer);
            fs.writeFile(path + `/${templateName}.html`, content_recieptFile, (err, res_) => {
                console.log('done');
                var options = {
                    format: 'A4',
                    base: path + `/${templateName}.html`
                };
                fs.readFile(path + `/${templateName}.html`, 'utf8', (err, file) => {
                    pdf.create(content_recieptFile, options).toFile(`../public/uploads/${id}/${templateName}.pdf`,
                        (err) => {
                            if (err) return console.log('error', err);
                        })
                    res.json(`המסמך נשמר בתיקית הלקוח`);
                    //    console.log(file);

                });
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
        tz: customer._id,
        busNAME: "מידע צחי",
        numHp: "מידע צחי"
    }
    file = file.replace(/contactName|tz|busNAME|numHp/gi, function (matched) {
        return mapObj[matched];
    });
    return file;
}

function replaceAll(file, recipetDetails, customer) {
    // console.log(customer.phoneNumber);
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    var today = dd + '/' + mm + '/' + yyyy;
    var mapObj = {

        AgentAddress: 'מידע צחי',
        houseAddress: customer.address.houseAddress ? customer.address.houseAddress : '',
        AgentFax: 'מידע צחי',
        AgentEmail: customer.email ? customer.email : '',
        ContactName: customer.fullName ? customer.fullName : '',
        Customer_name: customer.fullName ? customer.fullName : '',
        Phone_number: customer.phoneNumber ? customer.phoneNumber : '',
        ActionType: customer.actionType ? customer.actionType.split('-')[1] : '',
        Email: customer.email ? customer.email : '',
        RecipetDate: today,
        ReciepDate: today,
        Fax: customer.fax,
        Description: recipetDetails.description,
        PerHour: '-------',
        CountHours: '--------',
        FixedPayment: recipetDetails.priceBeforeVAT,
        Discount: recipetDetails.discount,
        TotalPrice: recipetDetails.priceAfterDiscount
    }

    file = file.replace(/AgentAddress|ReciepDate|Email|AgentFax|Fax|AgentEmail|ContactName|Customer_name|Phone_number|ActionType|RecipetDate|Description|PerHour|CountHours|FixedPayment|Discount|TotalPrice/gi, function (matched) {
        return mapObj[matched];
    });
    return file;

}

Routes.route('/add').post(function (req, res) {
    let customer = new Customer(req.body);
    console.log(customer.date.split('-'));
    if (!fs.existsSync(`../public/uploads/${customer._id}`)) {
        fs.mkdirSync(`../public/uploads/${customer._id}`);
    }
    scheduleMailToBirthDay(customer.date, customer.email);
    let address = req.body.address;
    customer.address = address;
    customer.save()
        .then(customer => {
            res.status(200).json({ 'customer': 'customer added successfuly', customer });
        });
});

function scheduleMailToBirthDay(birthDate, email) {
    schedule.scheduleJob(`05 18 ${birthDate.split('-')[2]} ${birthDate.split('-')[1]} *`, function () {
        let text = "מזל טוב ליום הולדתך עד 120 ,צחי כהן.";
        console.log('time to send happy birthday to' + email);
        sendEmail(email, "ברכה קטנה", text);
    });
}

function sendEmail(email, subject, text) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'talglobalron@gmail.com',
            pass: 'talro1992'
        }
    });
    var mailOptions = {
        from: 'talglobalron@gmail.com',
        to: email,
        subject: subject,
        text: text,
        secure: true,
        // attachments: [
        //     {   // file on disk as an attachment
        //         filename: req.body.templateName + '.pdf',
        //         path: `../public/uploads/${req.params.id}/${req.body.templateName}.pdf`

        //     },
        // ]
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            req.body.templateName == 'PowerAttorney' ? res.json('ייפוי כח נשלח בהצלחה ללקוח') : res.json('קבלה נשלחה למייל')
        }
    });
}

Routes.route('/updateCustomer/:id').post(function (req, res) {
    var customer_id = req.params.id;
    let objData = req.body;
    console.log('id', customer_id);
    let propsToUpdate = [];
    let obj={};
    for(let key in objData ){
        console.log('key',key);
        if(key !== 'address'){
            obj[key]=objData[key];
            propsToUpdate.push({$set :obj});
        }
    }
    console.log('objData', objData);

    query = { '_id': customer_id },
        update = {
            $set: objData
        },
        options = { upsert: true,useFindAndModify:false };
    Customer.findOneAndUpdate(query, update, options, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!data) {
            return res.status(404).end();
        }
        return res.status(200).send(data);
    });
});

Routes.route('/saveProcessStatus/:id').post(function (req, res) {
    var id = req.params.id;
    var processStatus = req.body;
    console.log('processStatus', processStatus);
    console.log('id', id);
    Customer.findById(id, function (err, customer) {

        customer.processStatus = processStatus;
        customer.save()
            .then(() => {
                res.send('נשמר בהצלחה!')
            })
            .catch(err => {
                res.status(400).send('update not possible', err);
            })
        // }
    })
});

Routes.route('/getProcessStatus/:id').post(function (req, res) {
    let id = req.params.id;
    console.log('getProcessStatus id', id);
    Customer.findById(id, function (err, customer) {
        if (err) {
            console.log("error:", err);
        } else {
            res.json(customer.processStatus);

        }
    });
});

Routes.route('/deleteFile/:id').post(async function (req, res) {
    let id = req.params.id;
    console.log('getProcessStatus------:::::::::::::::::::------id', id);
    console.log('req.params', req.body);
    let path = '../public/uploads/' + req.params.id;
    let filesTimeUploaded = [];

    await fs.unlink(req.body.filePath, async function (res_){
        // console.log('res------------',res);
        await fs.readdir(path, (err, files) => {
            if (files) {
    
                files.forEach((file) => {
                    filesTimeUploaded.push(getFileTimeUploaded(file, req.params.id));
                });
                res.json({ filesTimeUpload: filesTimeUploaded, filesList: files });
            } else { res.json('אין קבצים שהועלו') }
        });
    })

});



/*upload files */



app.use('/customers', Routes);
// app.use('https://peaceful-mesa-16202.herokuapp.com', Routes);


app.listen(port, function () {
    console.log("Server is listening to:" + port);
})