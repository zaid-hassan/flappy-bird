const backgroundImage = new Image();
backgroundImage.src = './sprites/background-day.png';
const BirdImage = new Image();
BirdImage.src = './sprites/sprite_sheet.png';

class Game{
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gameFrame = 0;
        this.staggerFrame = 5;
        this.width = canvas.width;
        this.height = canvas.height;
        this.bird = new Bird(this);
    }
    
    
    render() {
        this.bird.draw();
    }
}

class Bird {
    constructor(game) {
        this.game = game;
        this.image = BirdImage;
        this.x = this.game.width * 0.25;
        this.y = this.game.height * 0.5;
        this.frameX = 0;
        // sw = source width
        this.sw = 45;
        this.sh = 45;
        this.sy = 0;
        this.speedY = 0;
        this.gravity = 0.35;
        this.lift = -5;
    }

    update() {
        this.speedY += this.gravity;
        this.y += this.speedY;

        // Constraints
        if (this.y + this.sh >= this.game.height) {
            this.y = this.game.height - this.sh;
            this.speedY = 0;
            this.frameX = 2;
        }
        if (this.y <= 0) {
            this.y = 0;
            this.speedY = 0;
        }
    }
    draw () {
        this.game.ctx.beginPath();
        this.game.ctx.drawImage(this.image, this.frameX * this.sw, this.sy, this.sw, this.sh, this.x, this.y, this.sw, this.sh)
        if(this.game.gameFrame % this.game.staggerFrame == 0) {
            if(this.frameX < 2) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
        this.game.gameFrame++;
        console.log('fill')
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    let game;

    canvas.width = backgroundImage.width;
    canvas.height = backgroundImage.height;


    startgame()

    function startgame() {
        game = new Game(canvas, ctx);
        function animate() {
            game.ctx.clearRect(0, 0, game.width, game.height);

            game.render()
            requestAnimationFrame(animate)

        }
        animate()
    }
})
