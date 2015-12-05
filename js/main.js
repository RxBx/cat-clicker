var model = {

    allCats: [], // array for all cats

    currentCat: {}, // will hold the currently selected object for loading & scoring

    catNames: ['Jerry', 'George', 'Elaine', 'Kramer', 'Larry'], // array of names for cats

    init: function() {
        var Cat = function(name, imageURL) { //prototype maker for cat objects
            var obj = Object.create(Cat.prototype);
            obj.score = 0;
            obj.name = name;
            obj.imageURL = imageURL;
            obj.idNumber;
            return obj;
        };

        Cat.prototype.scorer = function() {
            this.score += 1;
            //document.getElementById(this.name + "Score").textContent = this.score;
        }

        // loop to create cat objects based on list of cat names
        for (i = 0; i < this.catNames.length; i++) {
            var catImageURL = 'images/cat' + (i + 1) + '.jpg'; //creates URL path for cat image
            var nextCat = Cat(this.catNames[i], catImageURL); //creates the cat object
            this.allCats.push(nextCat); //creates the cat
            this.currentCat = this.allCats[i]; //makes the newly created cat the "currentCat"
            this.currentCat.idNumber = i; //assigns the index number to the cat for later ref in load/scoring
        }

    }


}


var octopus = {

    init: function() {
        model.init(); // make the cat array

        for (i = 0; i < model.allCats.length; i++) {
            console.log(model.allCats[i].name + ' and ' + model.allCats[i].imageURL);

            view.listItemMaker(model.allCats[i]); // make the DOM list items
        };

        view.init(); //attaches the scoring function to the image

    },

    scoreAdvance: function() {
        model.currentCat.scorer();
        //console.log("scoreAdvance " + model.currentCat.score);
        return model.currentCat.score;
    },

    load: function(catName) {
        //console.log(catName);
        for (i = 0; i < model.allCats.length; i++) {
            if (model.allCats[i].name === catName) {
                model.currentCat = model.allCats[i];
                view.renderCat(model.currentCat);
            }
        }
    }
}



var view = {

    catListHTML: document.getElementById('catList'),
    catURL: document.getElementById('catURL'),
    catScoreHTML: document.getElementById('catScore'),
    catNameHTML: document.getElementById('catName'),

    init: function() { //attaches the score function to picture clicks
        this.catURL.addEventListener('click', function() {
            var updatedScore = octopus.scoreAdvance();
            //console.log("view " + updatedScore);
            //console.log(this);
            view.catScoreHTML.textContent = updatedScore;
        }, false)
    },

    listItemMaker: function(catObject) {
        var nextCatListItem = document.createElement('li'); // VIEW
        nextCatListItem.textContent = catObject.name; //VIEW
        this.catListHTML.appendChild(nextCatListItem); // VIEW
        currentChild = this.catListHTML.lastChild; // VIEW
        currentChild.addEventListener('click', function(e) { //VIEW
            octopus.load(this.textContent);
        });
    },

    renderCat: function(catObject) {
        //VIEW
        this.catNameHTML.textContent = catObject.name; //VIEW
        this.catScoreHTML.textContent = catObject.score; //VIEW
        this.catURL.src = catObject.imageURL; //VIEW
    }
}

octopus.init();

//Create Cat prototype

/*var giveName = function(variable) {
  for (var prop in this) {
    if (variable === this[prop]) {
      return prop;
    }
  }
}*/








/*


*/


/*
var cat1NameHTML = document.getElementById('cat1Name');

cat1NameHTML.textContent = cat1.name;

var cat1ScoreHTML = document.getElementById('cat1Score');

cat1ScoreHTML.textContent = cat1.score;

var cat1URLHTML = document.getElementById('cat1URL');

cat1URLHTML.src = cat1.imageURL;

cat1URLHTML.addEventListener('click', function(e) {
    cat1.scorer();
    cat1ScoreHTML.textContent = cat1.score;
}, false);


var cat2 = Cat("Joey", "images/cat2.jpg");

var cat2NameHTML = document.getElementById('cat2Name');

cat2NameHTML.textContent = cat2.name;

var cat2ScoreHTML = document.getElementById('cat2Score');

cat2ScoreHTML.textContent = cat2.score;

var cat2URLHTML = document.getElementById('cat2URL');

cat2URLHTML.src = cat2.imageURL;

cat2URLHTML.addEventListener('click', function(e) {
    cat2.scorer();
    cat2ScoreHTML.textContent = cat2.score;
}, false);

/* Original Code
var score = 0;

document.getElementById("score").textContent = score;

var cat = document.getElementById("cat");

cat.addEventListener("click", function(e) {
    score += 1;
    document.getElementById("score").textContent = score;
    e.preventDefault();
    e.stopPropagation();
}, false);*/
