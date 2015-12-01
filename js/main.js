
//Create Cat prototype
var Cat = function(name, imageURL) {
	var obj = Object.create(Cat.prototype);
	obj.score = 0;
	obj.name = name;
	obj.imageURL = imageURL;
	return obj;
};

Cat.prototype.scorer = function() {
	this.score += 1;
	//document.getElementById(this.name + "Score").textContent = this.score;
}

/*var giveName = function(variable) {
  for (var prop in this) {
    if (variable === this[prop]) {
      return prop;
    }
  }
}*/

var cat1 = Cat("Tommy", "images/cat1.jpg");

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
