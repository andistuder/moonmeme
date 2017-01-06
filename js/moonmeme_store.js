MOONMEME.store = {};

MOONMEME.store.init = function () {
    // var config = {
    //     apiKey: "AIzaSyBAc-y_cSMAKD3O2veGCoOXPX1Lck_03lI",
    //     authDomain: "moonmeme-d632f.firebaseapp.com",
    //     databaseURL: "https://moonmeme-d632f.firebaseio.com",
    //     storageBucket: "",
    //     messagingSenderId: "324764381108"
    // };
    // firebase.initializeApp(config);
};

MOONMEME.store.createPerson = function (person) {
    var record = { dob: person.dob, name: person.name };
    this.httpPostAsync('http://localhost:8080/people', record, function(){console.log('ok')})
};

MOONMEME.store.createInitialSetOfPeople = function () {
    var people = all_people();
    people.forEach(function(person) {
        console.log(MOONMEME.store.createPerson(person));
    });
};

MOONMEME.store.loadPeople = function (element_id) {
    this.httpGetAsync('http://localhost:8080/people', function(records_json) {
        var records = JSON.parse(records_json);
        var people = [];
        var record;
        var dob_string;
        for (var key in records) {
            record = records[key];
            dob_string = (record.dob.length < 11) ? record.dob + ' 12:00' : record.dob;

            record.date_ob = new Date(dob_string);
            record.image_id = MOONMEME.moon.computeImageID(record.date_ob);

            people.push(record);
        }

        MOONMEME.people = people.sort(function(a, b){return a.date_ob-b.date_ob});
        if (element_id) {
            MOONMEME.printPeople(element_id);
        }
    });
};

MOONMEME.store.httpGetAsync = function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        console.log('Call: ' + theUrl + ' Status: ' + xmlHttp.status);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
};

MOONMEME.store.httpPostAsync = function httpPostAsync(theUrl, data, callback) {
    var xmlHttp = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;

    for(name in data) {
      urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }

    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

    xmlHttp.onreadystatechange = function() {
        console.log('Call: ' + theUrl + ' Status: ' + xmlHttp.status);
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttp.send(urlEncodedData);
};
