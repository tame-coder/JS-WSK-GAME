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
        this.fuel = 100;
        this.fuelback = 100; // опыт для повышения уровня
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
    isFuel(){

        this.fuel = 100;

        obfuel.x = getRandomIntInclusive(1, 76)*10;
        obfuel.y = 0;
    }
}

//создаю обьекты тут

let player = new Actor_Character((getRandomIntInclusive(1, 76)*10), 170, 40, "#4caf50", 4, 100, 0, "Игрок456", 10);
let obfuel = new Actor((getRandomIntInclusive(1, 76)*10), 0, 40, "#f4cb36ff"); // друг 

let enemy = new Actor((getRandomIntInclusive(1, 76)*10), 0, 40, "#f44336"); // враг 
let enemya = new Actor((getRandomIntInclusive(1, 76)*10), 0, 40, "#f44336");

//постоянно срабатывает 1000 = секунда
setInterval(() => {
    drawAll();
}, 100);

setInterval(() => {
    showUserGui();
    showDavMode();
    oblMoves();
}, 500);

setInterval(() => {
    player.fuel -= 5
}, 1000);

//саунд дизайн
const deadSound = new Audio('content/sounds/dead.mp3');

function testObjectMove(obj, val)
{
    if(obj.y < 359){obj.y += val;}
    else{obj.x = (getRandomIntInclusive(1, 76)*10); obj.y = 0}
}

function oblMoves(){
    testObjectMove(enemy, getRandomIntInclusive(10, 60));
    testObjectMove(enemya, getRandomIntInclusive(20, 50));
    testObjectMove(obfuel, 10);
}
function playerIinteracts(){
    if (player.intersects(enemy)) {player.isdamage(10)}
    if (player.intersects(enemya)) {player.isdamage(10)}
    if (player.intersects(obfuel)) {player.isFuel()}
}
//типо  tick задает все грубо говаря шаг
function drawAll() {
    
    playerIinteracts()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    enemy.draw();
    enemya.draw();
    player.draw();
    obfuel.draw();
    showIsDead();
    checkPlayerFuel();
}

function checkPlayerFuel() {
    if (player.fuel <= 0) {
        player.isDead = true;
    }
}


//жив или нет проверяет и отпровляет сообщение если здох
function showIsDead() 
{
    const statusText = document.getElementById("showIsDeadText");
        if(player.fuel < 1){player.isDead = true}
        if (!player.isDead) {
            statusText.innerText = "Жив";
        } else {
            statusText.innerText = "Мертв";
            deadSound.play().catch(() => {});
            alert("Ты умер, чувак!");
            window.location.href = 'index.html';
            
}       

}
//механика движения
function move(action){
    if (player.isDead) return;

        switch (action) {
            case "up":
                /*
                if (player.y > 0) player.y -= 10 * player.speed;
                else player.isDead = true;
                */
                oblMoves();
                break;
            case "down":
                /*
                if (player.y + player.size < canvas.height) player.y += 10 * player.speed;
                else player.isDead = true;
                */
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
//
function showUserGui()
{
    document.getElementById("user-gui").innerHTML = `
    <h4>Здоровье: ${player.health} Топливо:${player.fuel}</h4>
    <h4>игрок: ${player.name}</h4>
    <h4></h4>
    `
}

//показывает Davmode вещи и читы для разработки
function showDavMode(){
    if(isDaveMode != false){
        document.getElementById("dav-mode-show").innerHTML = `
        <h1>Dav Mode Panel</h1>
        <h3>player X:${player.x} Y:${player.y} Hp:${player.health}</h3>
        <h3>player Fuel:${player.fuel} Lvl:${player.level} fb:${player.fuelback}</h3>
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

function myButtonRegCheck(){
    window.location.href = 'Main.html'; 
}

function myButton() {
    document.getElementById("reg-main").innerHTML = `
        <label for="">введите имя</label>
        <input type="text" name="" id="userName">
        <button onclick="myButtonRegCheck()">Начать</button>
    `   
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