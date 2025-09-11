const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// созда. классы тут

class Actor {
constructor(x, y, size, color = "#4caf50", speed = 1)
    {
        this.x = x; 
        this.y = y;
        this.size = size;
        this.color = color;
        this.speed = speed;
        this.isDead = false;
    }
        //функция зарисовки обьекта
        draw()
        { 
            ctx.fillStyle = this.color; 
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    
        //функция расчитывает столкновения очень поленая если да возвращает true сли нет то false
        intersects(other) 
        {
            return this.x < other.x + other.size &&
                    this.x + this.size > other.x &&
                    this.y < other.y + other.size &&
                    this.y + this.size > other.y;
        }
}

class Actor_Character extends Actor{
    constructor(x, y, size, color, speed, health, level, name, cash) {
        super(x, y, size, color, speed);
        this.health = health;
        this.level = level;
        this.name = name;
        this.cash = cash;
        this.experience = 0;
        this.expToNextLevel = 100; // опыт для повышения уровня
    }

    isdamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.isDead = true;
        }
    }
    isHealth(recovery) {
        this.health += recovery;
        if(this.health > 100) {this.health = 100} 
    }
    islevel(lvl){
        this.experience += lvl;
        if(this.experience > this.expToNextLevel)
        {
            this.experience -= this.expToNextLevel;
            this.level += 1;
            this.expToNextLevel = this.expToNextLevel + this.expToNextLevel/10;
        }
    }
}

//создаю обьекты тут

let player = new Actor_Character(180, 120, 40, "#4caf50", 1, 100, 0, "Игрок456", 10);
let enemy = new Actor(100, 100, 40, "#f44336"); // враг 
let hpoint = new Actor(20, 100, 40, "#3665f4ff"); // друг 
let levelpoint = new Actor(20, 200, 40, "#f4cb36ff"); // друг 


//саунд дизайн
const deadSound = new Audio('content/sounds/dead.mp3');


function playerIinteracts(){
    if (player.intersects(enemy)) {player.isdamage(10)}
    if (player.intersects(hpoint)) {player.isHealth(10)}
    if (player.intersects(levelpoint)) {player.islevel(10)}
}
//типо  tick задает все грубо говаря шаг
function drawAll() {
    
    playerIinteracts()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemy.draw();
    player.draw();
    hpoint.draw();
    levelpoint.draw();
    showIsDead();
    showDavMode();

}
//жив или нет проверяет и отпровляет сообщение если здох
function showIsDead() 
{
    const statusText = document.getElementById("showIsDeadText");
        if (!player.isDead) {
            statusText.innerText = "Жив";
        } else {
            statusText.innerText = "Мертв";
            deadSound.play().catch(() => {});
            alert("Ты умер, чувак!");
            
}       

}
//механика движения
function move(action){
    if (player.isDead) return;

        switch (action) {
            case "up":
                if (player.y > 0) player.y -= 10 * player.speed;
                else player.isDead = true;
                break;
            case "down":
                if (player.y + player.size < canvas.height) player.y += 10 * player.speed;
                else player.isDead = true;
                break;
            case "left":
                if (player.x > 0) player.x -= 10 * player.speed;
                else player.isDead = true;
                break;
            case "right":
                if (player.x + player.size < canvas.width) player.x += 10 * player.speed;
                else player.isDead = true;
                break;
        }
    drawAll();
}
//упровление с клавиш стрелочек
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        move("up");
    } else if (event.key === "ArrowDown") {
        move("down");
    } else if (event.key === "ArrowLeft") {
        move("left");
    } else if (event.key === "ArrowRight") {
        move("right");
    }
});
//кнопка вкл выкл dave моде
let isDaveMode = false;
function DaveModebtn(){
    if(isDaveMode != false)
    {
        isDaveMode = false;
        document.getElementById("DaveModebtnbttn").innerText = "Show";
        showDavMode();
    }
    else
    {
        isDaveMode = true;
        document.getElementById("DaveModebtnbttn").innerText = "Scrit";
        showDavMode();
    }
}
//показывает Davmode вещи и читы для разработки
function showDavMode(){
    if(isDaveMode != false){
        document.getElementById("dav-mode-show").innerHTML = `
        <h1>Dav Mode Panel</h1>
        <h3>player X:${player.x} Y:${player.y} Hp:${player.health}</h3>
        <h3>player Exp:${player.experience} Lvl:${player.level} extnl:${player.expToNextLevel}</h3>
        <button onclick="DaveModebtn()" id="DaveModebtnbttn">scrit</button>
        `
    }
    else {
        document.getElementById("dav-mode-show").innerHTML = `
        <h1>Dav Mode Panel</h1>
        <button onclick="DaveModebtn()" id="DaveModebtnbttn">show</button>
        `
    }
}
//рандом принимает MAX и MIN 
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min); // Минимум
  max = Math.floor(max); // максимум
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Первоначальный отрисовка
drawAll();

//зделай механику хп и опыта, взаимодействия с обьектами