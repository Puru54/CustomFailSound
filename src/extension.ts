import * as vscode from 'vscode';
import * as path from 'path';

// Load play-sound
const player = require('play-sound')({});

export function activate(context: vscode.ExtensionContext) {
    console.log('CustomFailSound extension is now active');

    // 1. Listen for the end of a shell execution
    // This event was introduced in VS Code 1.93.0
    const disposable = (vscode.window as any).onDidEndTerminalShellExecution?.((event: any) => {
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

function playSound(context: vscode.ExtensionContext) {
    // Path to your sound file inside the extension folder
    const soundPath = path.join(context.extensionPath, 'assets', 'sound.mp3');
    console.log('Attempting to play sound from:', soundPath);

    // 3. Trigger the audio
    player.play(soundPath, (err: any) => {
        if (err) {
            console.error("Could not play sound:", err);
            // Fallback for macOS if play-sound fails
            if (process.platform === 'darwin') {
                require('child_process').exec(`afplay "${soundPath}"`);
            }
        }
    });
}

export function deactivate() { }
