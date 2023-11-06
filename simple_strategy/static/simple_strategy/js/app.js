import {game_canvas} from "./canvas";

class App {
    constructor(canvas_elem, ctx, players, dashboard_elem) {
        this.canvas_elem = canvas_elem;
        this.ctx = ctx;
        this.dashboard_elem = dashboard_elem;
        this.btn_next_player = document.getElementById('btn_next_player');
        this.btn_next_player.addEventListener('click', () => {
            let cur_idx = this.players.indexOf(this.current_player)
            cur_idx++;
            if (cur_idx === this.players.length) {
                this.set_current_player(0);
            } else {
                this.set_current_player(cur_idx)
            }
        })

        this.canvas_elem.addEventListener('click', (evt) => {
            evt.preventDefault()
            let x = evt.offsetX
            let y = evt.offsetY
            let is_selection_process = false

            for (let j = 0, cu; j < this.current_player.units.length; j++) {
                cu = this.current_player.units[j]

                if (Math.sqrt((x - cu.cx) ** 2 + (y - cu.cy) ** 2) <= cu.r) {
                    this.current_player.toggle_unit_selection(cu)
                    is_selection_process = true
                    break
                }
            }
            if (!is_selection_process) {
                for (let j = 0, cu, step, remain; j < this.current_player.selected_units.length; j++) {
                    cu = this.current_player.selected_units[j]
                    step = Math.sqrt((x - cu.cx) ** 2 + (y - cu.cy) ** 2)
                    remain = cu.step_scores - step
                    if (remain > 0) {
                        cu.cx = x
                        cu.x = cu.cx - cu.w / 2
                        cu.cy = y
                        cu.y = cu.cy - cu.h / 2
                        cu.step_scores = remain
                    }

                }
            }
            this.redraw()


        })
        this.players = players;
        this.current_player;
        this.canvas_elem.addEventListener('mousemove', (evt) => {


        })
    }

    set_players(players) {
        this.players = players;
    }

    set_current_player(idx) {
        if (this.current_player !== undefined) this.current_player.deselect_all();
        this.current_player = this.players[idx]
        this.redraw()
    }

    redraw() {
        this.ctx.clearRect(0, 0, 500, 500);
        this.dashboard_elem.innerText = this.current_player.title
        for (let i = 0, cp; i < this.players.length; i++) {
            cp = this.players[i]
            for (let j = 0, cu; j < cp.units.length; j++) {
                cu = cp.units[j]
                cu.draw()
                if (this.current_player.selected_units.indexOf(cu) !== -1) {
                    this.dashboard_elem.innerText += ` ${cu.step_scores}`
                }
            }
        }

    }
}

export {
    App
}