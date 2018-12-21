const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
});
app.get('/index.htm', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
});

app.get('/get_used_value', function (req, res, next) {

    let data = req.query;
    let value = 0;
    console.dir(data);
    if (!data) {
        res.json({
            used_value: value
        });
        next();
        return;
    }

    value = data.value;
    let age = data.age;
    let miles = data.miles;
    let owners = data.owners;
    let collisions = data.collisions;

    if (value <= 0) {
        res.json({
            used_value: 0
        });
        next();
        return;
    }

    //age
    if (age > 10) {
        age = 10;
    } else if (age < 0) {
        age = 0;
    }
    console.log('age: ' + age);
    value -= age * 0.005 * value;
    console.log('value: ' + value);

    //miles
    if (miles > 150000) {
        miles = 150000;
    } else if (miles < 0) {
        miles = 0;
    }
    console.log('miles: ' + miles);
    value -= Math.floor(miles / 1000) * 0.002 * value;
    console.log('value: ' + value);

    //bad owners
    if (owners >= 2) {
        console.log('owners: ' + owners);
        value = value * 0.75;
        console.log('value: ' + value);
    }

    //collisions
    if (collisions > 5) {
        collisions = 5;
    } else if (collisions < 0) {
        collisions = 0;
    }
    console.log('collisions: ' + collisions);
    value -= collisions * 0.02 * value;
    console.log('value: ' + value);

    //good owners
    if (owners <= 0) {
        console.log('owners: ' + owners);
        value = value * 1.1;
        console.log('value: ' + value);
    }
    console.log('value: ' + value);
    res.json({
        used_value: value
    });
});

const server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;
});