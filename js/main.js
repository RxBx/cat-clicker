var model = {

    admin: false,

    allCats: [], // array for all cats

    currentCat: {}, // will hold the currently selected object for loading & scoring

    catNames: ['Jerry', 'George', 'Elaine', 'Kramer', 'Larry'], // array of names for cats

    init: function() {
        var Cat = function(name, imageURL) { //prototype maker for cat objects
            var obj = Object.create(Cat.prototype);
            obj.score = 0;
            obj.name = name;
            obj.imageURL = imageURL;
            //obj.idNumber;
            return obj;
        };

        Cat.prototype.scorer = function() {
            this.score += 1;
            //document.getElementById(this.name + "Score").textContent = this.score;
        };

        // loop to create cat objects based on list of cat names
        for (i = 0; i < this.catNames.length; i++) {
            var catImageURL = 'images/cat' + (i + 1) + '.jpg'; //creates URL path for cat image
            var nextCat = Cat(this.catNames[i], catImageURL); //creates the cat object
            this.allCats.push(nextCat); //creates the cat
            this.currentCat = this.allCats[i]; //makes the newly created cat the "currentCat"
            this.currentCat.idNumber = i; //assigns the index number to the cat for later ref in load/scoring
        }

    }

};

var octopus = {

    init: function() {
        model.init(); // make the cat array

        model.currentCat = model.allCats[0];

        viewList.init(); // create the first list

        view.init(); //attaches the scoring function to the image

        viewAdmin.init();

    },

    getAllCats: function() {
        return model.allCats;
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    setCurrentCat: function(catObject) {
        model.currentCat = catObject;
    },

    scoreAdvance: function() {
        model.currentCat.scorer();
        //console.log("scoreAdvance " + model.currentCat.score);
        //return model.currentCat.score;
    },

    load: function(catName) {
        //console.log(catName);
        for (i = 0; i < model.allCats.length; i++) {
            if (model.allCats[i].name === catName) {
                model.currentCat = model.allCats[i];
                view.renderCat(model.currentCat);
            }
        }
    },

    setAdmin: function(boolean) {
        model.admin = boolean;
    },

    getAdmin: function() {
        return model.admin;
    },

    update: function() {
        var updateName = viewAdmin.formNameHTML.value;
        var updateURL = viewAdmin.formURLHTML.value;
        var updateScore = parseInt(viewAdmin.formClicksHTML.value, 10);
        model.currentCat.name = updateName;
        model.currentCat.imageURL = updateURL;
        model.currentCat.score = updateScore;
    }
};

var viewList = {

    init: function() {
        this.catListHTML = document.getElementById('catList');
        this.render();
    },

    render: function() {
        this.catListHTML.innerHTML = '';
        var allTheCats = octopus.getAllCats();
        for (i = 0; i < allTheCats.length; i++) {

            var nextCatListItem = document.createElement('li'); // VIEW
            nextCatListItem.textContent = allTheCats[i].name; //VIEW
            this.catListHTML.appendChild(nextCatListItem); // VIEW
            currentChild = this.catListHTML.lastChild; // VIEW
            currentChild.addEventListener('click', (function(catObjectCopy) {
                return function() {
                    octopus.setCurrentCat(catObjectCopy);
                    view.render();
                };
            })(allTheCats[i]));
        }
    }
};


var view = {

    catURL: document.getElementById('catURL'),
    catScoreHTML: document.getElementById('catScore'),
    catNameHTML: document.getElementById('catName'),

    init: function() { //attaches the score function to picture clicks
        this.catURL.addEventListener('click', function() {
            octopus.scoreAdvance();
            //console.log("view " + updatedScore);
            //console.log(this);
            //view.catScoreHTML.textContent = updatedScore;
            view.render();
        }, false);
        this.render();
    },

    render: function() {
        //VIEW
        var catObject = octopus.getCurrentCat();
        this.catNameHTML.textContent = catObject.name; //VIEW
        this.catScoreHTML.textContent = catObject.score; //VIEW
        this.catURL.src = catObject.imageURL; //VIEW
    }
};

var viewAdmin = {

    adminHTML: document.getElementById('admin'),
    adminButtonHTML: document.getElementById('adminButton'),
    adminFormHTML: document.getElementById('adminForm'),
    formNameHTML: document.getElementById('formName'),
    formURLHTML: document.getElementById('formURL'),
    formClicksHTML: document.getElementById('formClicks'),
    cancelButtonHTML: document.getElementById('cancelButton'),
    saveButtonHTML: document.getElementById('saveButton'),

    init: function() {
        this.adminButtonHTML.addEventListener('click', function() {
            octopus.setAdmin(true);
            viewAdmin.render();
        }, false);

        this.cancelButtonHTML.addEventListener('click', function() {
            octopus.setAdmin(false);
            viewAdmin.render();
        }, false);

        this.saveButtonHTML.addEventListener('click', function() {
            octopus.update();
            octopus.setAdmin(false);
            viewList.render();
            view.render();
            viewAdmin.render();
        }, false);

        viewAdmin.render();
    },

    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.formNameHTML.value = currentCat.name;
        this.formURLHTML.value = currentCat.imageURL;
        this.formClicksHTML.value = currentCat.score;

        if (octopus.getAdmin() === false) {
            this.adminFormHTML.style.display = 'none';
        } else {
            this.adminFormHTML.style.display = 'block';
        }
    }

};

octopus.init();