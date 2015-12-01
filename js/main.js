var score = 0;

document.getElementById("score").textContent = score;

var cat = document.getElementById("cat");

cat.addEventListener("click", function(e) {
    score += 1;
    document.getElementById("score").textContent = score;
    e.preventDefault();
    e.stopPropagation();
}, false);
