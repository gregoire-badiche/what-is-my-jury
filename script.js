var canvas = document.getElementById('particles_canvas');
context = this.canvas.getContext("2d");

var colorList = [
    "blue",
    "chartreuse",
    "orange",
    "yellow",
    "red",
    "purple"
];

var particleList = [];
var filteredParticleList = [];

class Particle {
    constructor(x, y, radius, gauche) {
        this.x = x;
        this.y = y;
        this.color = colorList[Math.floor(Math.random() * colorList.length)];
        this.radius = radius;
        this.movementX = Math.random() * 4.5 + 1;
        this.movementY = Math.random() * -3 - 0.5;
        this.gauche = gauche;
        this.gravity = 0.05;
    }
    update() {
        if (this.gauche) {
            this.x += this.movementX;
        }
        else {
            this.x -= this.movementX;
        }
        this.movementY += this.gravity;
        this.y += this.movementY;
        let ctx = context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    //context.fillStyle = "#FFFFFF10";
    //context.fillRect(0, 0, canvas.width, canvas.height)
}

function resizeCanvas() {
    canvas.width = document.getElementById("body").clientWidth;
    canvas.height = document.getElementById("body").clientHeight;
}

function startAnimation() {
    canvas.width = document.getElementById("body").clientWidth;
    canvas.height = document.getElementById("body").clientHeight;
}

function updateCanvas() {
    clearCanvas();
    for (var i = 0; i < particleList.length; i++) {
        if (particleList[i] != undefined) {
            particleList[i].update();
            if (particleList[i].y > (canvas.height + 10)) {
                delete particleList[i];
            }
        }
    }
    filteredParticleList = particleList.filter(el => {
        return el != undefined;
    });
    particleList = filteredParticleList;
    particleList.push(new Particle(0, canvas.height / 4, 5, true));
    particleList.push(new Particle(canvas.width, canvas.height / 4, 5, false));
    
};

const start = () => {
    startAnimation();
    setInterval(updateCanvas, 17);
}