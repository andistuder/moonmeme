var MOONMEME = {};

MOONMEME.init = function () {
    this.preloadImages('preloader');
    var image_id = this.moon.computeImageID(new Date());
    this.updateMoonPic('moonpic', image_id);
    this.audio = document.getElementById('she-audio');
    this.play_she();
};

MOONMEME.play_she = function() {
    this.audio.src = 'audio/she-pause.wav';
    this.audio.loop = true;
    this.audio.volume = 0.5;
    this.audio.autoplay = true;
};

MOONMEME.play_story = function() {
    this.audio.src = 'audio/storywointro.wav';
    this.audio.loop = false;
    this.audio.volume = 0.4;
};

MOONMEME.preloadImages = function (element_id) {
    var element = document.getElementById(element_id);
    var lunar_index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    lunar_index.forEach(function(i) {
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
    this.store.createPerson(this.person);
};

MOONMEME._print_row = function (person, row_length) {
    var row_node = document.createElement('div');
    row_node.classList = ['row'];
    row_node.dataset.dob = person.date_ob.getTime();
    this._append_personal_details(row_node, person);
    var image_id;
    var node;
    var row_index = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176];
    row_index.forEach(function(i) {
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
