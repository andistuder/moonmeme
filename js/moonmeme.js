var MOONMEME = {};

MOONMEME.init = function () {
    this.preloadImages('preloader');
    var image_id = this.moon.computeImageID(new Date());
    this.updateMoonPic('moonpic', image_id);
    this.audio = new Audio();
};

MOONMEME.play_she = function() {
    if (this.audio.src.indexOf('she-pause.mp3') != -1) return;

    this.audio.src = 'audio/she-pause.mp3';
    this.audio.loop = true;
    this.audio.load();
    this.audio.volume = 0.5;
    this.audio.play();
};

MOONMEME.play_story = function() {
    this.audio.src = 'audio/storywointro.mp3';
    this.audio.loop = false;
    this.audio.load();
    this.audio.volume = 0.4;
    this.audio.play();
};

MOONMEME.preloadImages = function (element_id) {
    var element = document.getElementById(element_id);

    [...Array(28).keys()].forEach(function(i) {
        var image_node = document.createElement('IMG');
        image_node.src = "images/moon-" + i + ".jpg";
        image_node.height = "1";
        image_node.width = "1";
        element.appendChild(image_node);
    });
};

MOONMEME.showPerson = function () {
    this.hideElement('single-row-container');
    this.hideElement('tiles-container');
    this.hideElement('show-today-button');
    this.hideElement('show-today-button-top');
    this.hideElement('myModal');
    document.body.classList = [];
    this.showElement('sticky-footer');
    this.showElement('center-container');

    this.updateMoonPic('moonpic', this.person.image_id);
    this.hideElement('input-text');
    this.showElement('user-data');
    this.printSubmittedData('user-data', this.person);
};

MOONMEME.showToday = function () {
    this.hideElement('single-row-container');
    this.hideElement('tiles-container');
    this.hideElement('show-today-button');
    this.hideElement('show-today-button-top');
    document.body.classList = [];
    this.showElement('sticky-footer');
    this.showElement('center-container');

    var image_id = this.moon.computeImageID(new Date());
    this.updateMoonPic('moonpic', image_id);
    this.hideElement('user-data');
    this.showElement('input-text');
};

MOONMEME.showSingleRow = function () {
    this.hideElement('sticky-footer');
    this.hideElement('center-container');
    this.hideElement('tiles-container');
    this.hideElement('show-today-button');
    this.hideElement('show-today-button-top');
    document.body.classList = ['year_tiles'];

    this.printPerson('single-row-container');
    this.showElement('single-row-container');
};

MOONMEME.showAllRows = function () {
    this.hideElement('sticky-footer');
    this.hideElement('center-container');
    this.hideElement('single-row-container');
    document.body.classList = ['year_tiles'];

    this.printPeople('tiles-container');
    this.showElement('tiles-container');
    this.showElement('show-today-button');
    this.showElement('show-today-button-top');
};


MOONMEME.parsePerson = function (form_data) {

    var dob = form_data.get('year') + '-' +
        form_data.get('month') + '-' +
        form_data.get('day');

    if (form_data.get('minute') && form_data.get('hour')) {
        dob = dob + ' ' +
            ('0' + form_data.get('hour')).slice(-2) + ':' +
            ('0' + form_data.get('minute')).slice(-2);
    }

    var date_ob = new Date(dob);

    this.person = {
        dob: dob,
        name: form_data.get('name'),
        date_ob: date_ob,
        image_id: this.moon.computeImageID(date_ob)
    };

    this.people.push(this.person);
    this.people = this.people.sort(function(a, b){return a.date_ob-b.date_ob});
    this.store.createPerson(this.person).catch(e => {
        console.error("Create Person failed: " + e.message);
    });
};

MOONMEME._print_row = function (person, row_length) {
    var row_node = document.createElement('div');
    row_node.classList = ['row'];
    row_node.dataset.dob = person.date_ob.getTime();
    this._append_personal_details(row_node, person);
    var image_id;
    var node;
    [...Array(row_length).keys()].forEach(function(i) {
        image_id = ((i + person.image_id + 28) % 28);
        node = document.createElement('div');
        node.classList = ['moon'];
        node.style = 'background-image: url(\"images/moon-' + image_id + '.jpg\")';
        row_node.appendChild(node);
    });
    return row_node;
}

MOONMEME._append_row = function (element, person, row_length) {
    setTimeout(function(){
        var row_node = MOONMEME._print_row(person, row_length);
        element.appendChild(row_node);
        // do other things
    }, 400);
};

MOONMEME._append_personal_details = function (row_node, person) {
    var node = document.createElement('div');
    node.classList = ['name'];
    node.appendChild(document.createTextNode(person.dob.split(' ')[0]));
    node.appendChild(document.createElement('br'));
    node.appendChild(document.createTextNode(person.name));
    row_node.appendChild(node);
};

MOONMEME.printPerson = function (element_id) {
    var element = document.getElementById(element_id);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    this._append_row(element, this.person, 177);
};

MOONMEME.printPeople = function (element_id) {
    var element = document.getElementById(element_id);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    this.people.forEach(function(person) {
        MOONMEME._append_row(element, person, 177);
    });
};

MOONMEME.updateMoonPic = function (element_id, image_id) {
    var element = document.getElementById(element_id);
    element.src = "images/moon-" + image_id + ".jpg";
    element.style.display = 'inline';
};

MOONMEME.printSubmittedData = function (element_id, person) {
    var element = document.getElementById(element_id);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    this._append_personal_details(element, person);
};

MOONMEME.hideElement = function (element_id) {
    document.getElementById(element_id).style.display = 'none';
};

MOONMEME.showElement = function (element_id) {
    document.getElementById(element_id).style.display = 'inline';
};
