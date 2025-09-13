const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// созда. классы тут



//создаю обьекты тут

let player = new Actor_Character((getRandomIntInclusive(1, 76)*10), 170, 40, "#4caf50", 4, 100, 0, "Игрок456", 10);

let obfuel = new Actor_Enemy_fuel((getRandomIntInclusive(1, 76)*10), 0, 50, "#f4cb36ff"); // друг 

// массивы
let enemies = [];
let healths = [];
let clouds = [];
let lastclouds = [];
let stars = [];
//постоянно срабатывает 1000 = секунда

setInterval(() => {
    drawAll();
}, 100);

setInterval(() => {
    showUserGui();
    showDavMode();
    oblMoves();
}, 200);

setInterval(() => {

    if (stars.length < 4) { 
        let newstar = new Actor_Enemy_star(
            getRandomIntInclusive(1, 76) * 10,
            0,
            getRandomIntInclusive(35, 45),
            "#f44336"
        );
        stars.push(newstar);
    }

    if (healths.length < 2) { 
        let newhealt = new Actor_Enemy_health(
            getRandomIntInclusive(29, 48) * 10,
            0,
            getRandomIntInclusive(35, 45),
            "#f44336"
        );
        healths.push(newhealt);
    }

    if (clouds.length < 6) { 
        let newcloud = new Actor_Enemy_cloud(
            getRandomIntInclusive(1, 76) * 10,
            0,
            getRandomIntInclusive(60, 80),
            "#f44336"
        );
        clouds.push(newcloud);
    }

    if (lastclouds.length < 8) { 
        let newcloud = new Actor_Enemy_cloud(
            getRandomIntInclusive(1, 76) * 10,
            0,
            getRandomIntInclusive(20, 30),
            "#f44336"
        );
        lastclouds.push(newcloud);
    }

    if (enemies.length < (1 + (player.level/2))) { 
        let newEnemy = new Actor_Enemy_mob(
            getRandomIntInclusive(1, 76) * 10,
            0,
            55,
            "#f44336"
        );
        enemies.push(newEnemy);
    }
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
    

    for(let star of stars) {
        testObjectMove(star, getRandomIntInclusive(25, 45))
    }

    for(let enemy of enemies) {
        testObjectMove(enemy, getRandomIntInclusive(10, 30))
    }

    for(let health of healths) {
        testObjectMove(health, getRandomIntInclusive(30, 40))
    }

    for (let cloud of clouds) {
        testObjectMove(cloud, getRandomIntInclusive(15 , 25))
    }

    for (let cloud of lastclouds) {
        testObjectMove(cloud, getRandomIntInclusive(1 , 5))
    }

    testObjectMove(obfuel, getRandomIntInclusive(5, 15));
}

function playerIinteracts(){
    for (let enemy of enemies) {
        if (player.intersects(enemy)) {
            player.isdamage(10);
        }
    }

    for (let star of stars) {
        if (player.intersects(star)) {
            player.stars += 1;
            star.x = (getRandomIntInclusive(1, 76)*10), star.y = 0;
        }
    }

    for (let health of healths) {
        if (player.intersects(health)) {
            player.isHealth(10);
            health.x = (getRandomIntInclusive(29, 48)*10), health.y = 0;
        }
    }

    if (player.intersects(obfuel)) {player.isFuel()}
}

const bg = document.getElementById("bgImage");
//типо  tick задает все грубо говаря шаг
function drawAll() {
    
    playerIinteracts()

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let enemy of enemies) {
        enemy.draw();
    }

    for (let cloud of clouds) {
        cloud.draw();
    }

    for (let cloud of lastclouds) {
        cloud.draw();
    }

    for (let star of stars) {
        star.draw();
    }

    for (let health of healths) {
        health.draw();
    }

    player.draw();
    obfuel.draw();
    showIsDead();

    ctx.fillStyle = "#fff"; // Цвет текста (можно поменять)
    ctx.font = "20px Kelly Slab"; // Размер и шрифт текста

    // Позиция текста на экране (x, y)
    ctx.fillText(`Здоровье: ${player.health}`, 10, 25); 
    ctx.fillText(`Топливо: ${player.fuel}`, 10, 50);
    ctx.fillText(`Звезды: ${player.stars}`, 10, 75);

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
    <h4>игрок: ${player.name} Звезда: ${player.stars}</h4>
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