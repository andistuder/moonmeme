MOONMEME.store = {};

MOONMEME.store.init = function () {
    var config = {
        apiKey: "AIzaSyBAc-y_cSMAKD3O2veGCoOXPX1Lck_03lI",
        authDomain: "moonmeme-d632f.firebaseapp.com",
        databaseURL: "https://moonmeme-d632f.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "324764381108"
    };
    firebase.initializeApp(config);
};

MOONMEME.store.createPerson = function (person) {
    var record = { dob: person.dob, name: person.name };
    var newPostKey = firebase.database().ref().child('people').push().key;
    var updates = {};
    updates['/people/' + newPostKey] = record;
    return firebase.database().ref().update(updates);
};

MOONMEME.store.createInitialSetOfPeople = function () {
    var people = all_people();
    people.forEach(function(person) {
        console.log(MOONMEME.store.createPerson(person));
    });
};

MOONMEME.store.loadPeople = function (element_id) {
    firebase.database().ref().on("value", function(snapshot) {
        var records = snapshot.val().people
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
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
};
