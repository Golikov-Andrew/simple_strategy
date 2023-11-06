import {Unit} from "./unit";
import {App} from "./app";
import {ctx, game_canvas} from "./canvas";
import {Player} from "./player";

let chosen_unit;

const dashboard = document.getElementById('dashboard');
const app = new App(game_canvas, ctx,[], dashboard);


const pl_1 = new Player(app, 'Player 1', '#ffcccc')
const pl_2 = new Player(app, 'Player 2', '#ccccff')

app.set_players([pl_1, pl_2]);
console.log(app)


window.addEventListener('DOMContentLoaded', () => {
    pl_1.add_unit(new Unit(100, 100, pl_1));
    pl_1.add_unit(new Unit(200, 100, pl_1));

    pl_2.add_unit(new Unit(100, 200, pl_2));
    pl_2.add_unit(new Unit(200, 200, pl_2));

    app.set_current_player(0)

})