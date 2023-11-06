import png from "../../../src/units/buildman.png";
import {ctx} from "./canvas";

class Unit {
    constructor(x, y, player) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.r = 25;
        this.step_scores = 100;
        this.step_scores_max = 100;

        this.image = new Image(50, 50);
        this.w = this.image.width;
        this.h = this.image.height;
        this.cx = this.x + this.w / 2;
        this.cy = this.y + this.h / 2;
        this.image.addEventListener('load', () => {
            this.draw()
        })
        this.image.src = png;
    }

    set_player(player) {
        this.player = player;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.player.color;
        ctx.fill();
        if (this.player.selected_units.indexOf(this) === -1) {
            ctx.strokeStyle = '#EEEEEE'
            ctx.stroke();
            ctx.closePath();
        } else {
            ctx.strokeStyle = '#FF4400'
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(this.cx, this.cy, this.step_scores, 0, 2 * Math.PI);
            ctx.strokeStyle = '#EEEEEE'
            ctx.stroke();
            ctx.closePath();
        }

        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

    }
}

export {
    Unit
}