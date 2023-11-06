/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./simple_strategy/src/units/buildman.png":
/*!************************************************!*\
  !*** ./simple_strategy/src/units/buildman.png ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "dirname/7e10b486d4f12085211a025279a80b07.png");

/***/ }),

/***/ "./simple_strategy/static/simple_strategy/js/app.js":
/*!**********************************************************!*\
  !*** ./simple_strategy/static/simple_strategy/js/app.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./canvas */ "./simple_strategy/static/simple_strategy/js/canvas.js");


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



/***/ }),

/***/ "./simple_strategy/static/simple_strategy/js/canvas.js":
/*!*************************************************************!*\
  !*** ./simple_strategy/static/simple_strategy/js/canvas.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ctx: () => (/* binding */ ctx),
/* harmony export */   game_canvas: () => (/* binding */ game_canvas)
/* harmony export */ });
const game_canvas = document.getElementById('game_canvas');
const ctx = game_canvas.getContext('2d');





/***/ }),

/***/ "./simple_strategy/static/simple_strategy/js/player.js":
/*!*************************************************************!*\
  !*** ./simple_strategy/static/simple_strategy/js/player.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
class Player{
    constructor(app, title, color, data){
        this.app = app;
        this.title = title;
        this.color = color;
        this.data = data;
        this.step_scores = 100;
        this.step_scores_max = 100;
        this.units = [];
        this.selected_units = []
    }
    add_unit(unit){
        this.units.push(unit)
    }
    toggle_unit_selection(unit){
        let idx = this.selected_units.indexOf(unit)
        if(idx!==-1){
            console.log('deselect')
            this.selected_units.splice(idx, 1)
        }else{
            console.log('select')
            this.selected_units.push(unit)
        }
    }
    deselect_all(){
        this.selected_units = []
        this.app.redraw()
    }
}



/***/ }),

/***/ "./simple_strategy/static/simple_strategy/js/unit.js":
/*!***********************************************************!*\
  !*** ./simple_strategy/static/simple_strategy/js/unit.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Unit: () => (/* binding */ Unit)
/* harmony export */ });
/* harmony import */ var _src_units_buildman_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../src/units/buildman.png */ "./simple_strategy/src/units/buildman.png");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ "./simple_strategy/static/simple_strategy/js/canvas.js");



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
        this.image.src = _src_units_buildman_png__WEBPACK_IMPORTED_MODULE_0__["default"];
    }

    set_player(player) {
        this.player = player;
    }

    draw() {
        _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.beginPath();
        _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.arc(this.cx, this.cy, this.r, 0, 2 * Math.PI);
        _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.fillStyle = this.player.color;
        _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.fill();
        if (this.player.selected_units.indexOf(this) === -1) {
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.strokeStyle = '#EEEEEE'
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.stroke();
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.closePath();
        } else {
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.strokeStyle = '#FF4400'
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.stroke();
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.closePath();

            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.beginPath();
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.arc(this.cx, this.cy, this.step_scores, 0, 2 * Math.PI);
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.strokeStyle = '#EEEEEE'
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.stroke();
            _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.closePath();
        }

        _canvas__WEBPACK_IMPORTED_MODULE_1__.ctx.drawImage(this.image, this.x, this.y, this.w, this.h);

    }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************************!*\
  !*** ./simple_strategy/static/simple_strategy/js/main.js ***!
  \***********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unit */ "./simple_strategy/static/simple_strategy/js/unit.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ "./simple_strategy/static/simple_strategy/js/app.js");
/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./canvas */ "./simple_strategy/static/simple_strategy/js/canvas.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player */ "./simple_strategy/static/simple_strategy/js/player.js");





let chosen_unit;

const dashboard = document.getElementById('dashboard');
const app = new _app__WEBPACK_IMPORTED_MODULE_1__.App(_canvas__WEBPACK_IMPORTED_MODULE_2__.game_canvas, _canvas__WEBPACK_IMPORTED_MODULE_2__.ctx,[], dashboard);


const pl_1 = new _player__WEBPACK_IMPORTED_MODULE_3__.Player(app, 'Player 1', '#ffcccc')
const pl_2 = new _player__WEBPACK_IMPORTED_MODULE_3__.Player(app, 'Player 2', '#ccccff')

app.set_players([pl_1, pl_2]);
console.log(app)


window.addEventListener('DOMContentLoaded', () => {
    pl_1.add_unit(new _unit__WEBPACK_IMPORTED_MODULE_0__.Unit(100, 100, pl_1));
    pl_1.add_unit(new _unit__WEBPACK_IMPORTED_MODULE_0__.Unit(200, 100, pl_1));

    pl_2.add_unit(new _unit__WEBPACK_IMPORTED_MODULE_0__.Unit(100, 200, pl_2));
    pl_2.add_unit(new _unit__WEBPACK_IMPORTED_MODULE_0__.Unit(200, 200, pl_2));

    app.set_current_player(0)

})
})();

/******/ })()
;
//# sourceMappingURL=play_game.js.map