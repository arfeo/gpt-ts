"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_1 = require("../../constants/game");
var events_1 = require("./events");
var utils_1 = require("./utils");
var GameComponent = /** @class */ (function () {
    function GameComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.cellSize = utils_1.setCellSize(game_1.DEFAULT_VMIN_VALUE);
        this.storagePrefix = game_1.DEFAULT_STORAGE_PREFIX;
        typeof this.init === 'function' && this.init.apply(this, args);
        this.render();
        events_1.setUpEventHandlers.call(this);
    }
    GameComponent.prototype.destroy = function () {
        typeof this.unmount === 'function' && this.unmount();
        events_1.removeEventHandlers.call(this);
    };
    return GameComponent;
}());
exports.GameComponent = GameComponent;
