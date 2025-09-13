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

class Actor_Character extends Actor {
    constructor(x, y, size, color, speed, health, level, name, cash) {
        super(x, y, size, color, speed);
        this.health = health;
        this.level = level;
        this.name = name;
        this.cash = cash;
        this.fuel = 100;
        this.fuelback = 100;
        this.stars = 0;

        // Загружаем текстуру игрока
        this.image = new Image();
        this.image.src = "content/texture/player.png";
    }

    draw() {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        } else {
            // fallback если текстура еще не загружена
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
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
        if((this.fuel + 25)>100){this.fuel = 100;}
        if((this.fuel + 25)<100){this.fuel += 25;}

        if (this.fuel <= 0) {
        this.isDead = true;
        }

        this.level += 1; 

        obfuel.x = getRandomIntInclusive(1, 76)*10;
        obfuel.y = 0;
    }
}

class Actor_Enemy_mob extends Actor {
    constructor(x, y, size, color, speed) {
        super(x, y, size, color, speed);

        // Загружаем текстуру игрока
        this.image = new Image();
        this.image.src = "content/texture/enemy.png";
    }

    draw() {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        } else {
            // fallback если текстура еще не загружена
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

}

class Actor_Enemy_fuel extends Actor {
    constructor(x, y, size, color, speed) {
        super(x, y, size, color, speed);

        // Загружаем текстуру игрока
        this.image = new Image();
        this.image.src = "content/texture/fuel.png";
    }

    draw() {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        } else {
            // fallback если текстура еще не загружена
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

}

class Actor_Enemy_health extends Actor {
    constructor(x, y, size, color, speed) {
        super(x, y, size, color, speed);

        // Загружаем текстуру игрока
        this.image = new Image();
        this.image.src = "content/texture/healter.png";
    }

    draw() {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        } else {
            // fallback если текстура еще не загружена
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

}

class Actor_Enemy_cloud extends Actor {
    constructor(x, y, size, color, speed) {
        super(x, y, size, color, speed);

        // Загружаем текстуру игрока
        this.image = new Image();

        let texID = getRandomIntInclusive(1, 3);
        switch (texID) {
            case 1:
                this.image.src = "content/texture/cloud1.png";
                break;
            case 2:
                this.image.src = "content/texture/cloud2.png";
                break;
            case 3:
                this.image.src = "content/texture/cloud3.png";
                break;
            default:
                break;
        }
    }

    draw() {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        } else {
            // fallback если текстура еще не загружена
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

}

class Actor_Enemy_star extends Actor {
    constructor(x, y, size, color, speed) {
        super(x, y, size, color, speed);

        // Загружаем текстуру игрока
        this.image = new Image();
        let texID = getRandomIntInclusive(1, 3);
        switch (texID) {
            case 1:
                this.image.src = "content/texture/star1.png";
                break;
            case 2:
                this.image.src = "content/texture/star2.png";
                break;
            case 3:
                this.image.src = "content/texture/star3.png";
                break;
            default:
                break;
        }
    }

    draw() {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
        } else {
            // fallback если текстура еще не загружена
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

}