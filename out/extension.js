"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
// Load play-sound
const player = require('play-sound')({});
function activate(context) {
    console.log('CustomFailSound extension is now active');
    // 1. Listen for the end of a shell execution
    // This event was introduced in VS Code 1.93.0
    const disposable = vscode.window.onDidEndTerminalShellExecution?.((event) => {
        const exitCode = event.exitCode;
        console.log('Command finished with exit code:', exitCode);
        // 2. Check if the command failed (non-zero)
        if (exitCode !== undefined && exitCode !== 0) {
            playSound(context);
        }
    });
    if (disposable) {
        context.subscriptions.push(disposable);
    }
}
function playSound(context) {
    // Path to your sound file inside the extension folder
    const soundPath = path.join(context.extensionPath, 'assets', 'sound.mp3');
    console.log('Attempting to play sound from:', soundPath);
    // 3. Trigger the audio
    player.play(soundPath, (err) => {
        if (err) {
            console.error("Could not play sound:", err);
            // Fallback for macOS if play-sound fails
            if (process.platform === 'darwin') {
                require('child_process').exec(`afplay "${soundPath}"`);
            }
        }
    });
}
function deactivate() { }
//# sourceMappingURL=extension.js.map