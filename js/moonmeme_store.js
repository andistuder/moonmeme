MOONMEME.store = {};
MOONMEME.store.path = 'people';
MOONMEME.store.maxRows = 125;

MOONMEME.store.init = function () {
    MOONMEME.store.path = (window.location.pathname.indexOf('/moonmeme/') == 0) ? 'people' : 'people_staging';
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
    var newPostKey = firebase.database().ref().child(MOONMEME.store.path).push().key;
    var updates = {};
    updates['/'+ MOONMEME.store.path + '/' + newPostKey] = record;
    return firebase.database().ref().update(updates);
};

MOONMEME.store.createInitialSetOfPeople = function () {
    var people = all_people();
    people.forEach(function(person) {
        console.log('createInitialSetOfPeople', MOONMEME.store.createPerson(person));
    });
};

MOONMEME.store.loadPeople = function (element_id) {
    firebase.database().ref(MOONMEME.store.path).on("value", function(snapshot) {
        var records = snapshot.val();
        var people = [];
        var record;
        var dob_string;
        if (!records) {
            MOONMEME.people = [];
            return;
        }
        var keys = Object.keys(records);

        keys.slice(Math.max(keys.length - MOONMEME.store.maxRows, 1)).forEach(function(key) {
            record = records[key];
            dob_string = (record.dob.length < 11) ? record.dob + ' 12:00' : record.dob;

            record.date_ob = new Date(dob_string);
            record.image_id = MOONMEME.moon.computeImageID(record.date_ob);

            people.push(record);
        });

        MOONMEME.people = people.sort(function(a, b) {
            return a.date_ob - b.date_ob;
        });
        if (element_id) MOONMEME.printPeople(element_id);
    }, function(errorObject) {
        console.error("The read failed: " + errorObject.code);
    });
};
