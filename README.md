# Custom Fail Sound

An extension that plays a sound whenever your terminal command fails (exits with a non-zero code)!

## Features
- Listens to terminal exit codes.
- Plays `a sound` on failure.

## Requirements
- VS Code ^1.93.0

## Building the Extension

To create a `.vslx` file from the source code:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install VSCE** (Visual Studio Code Extension packager):
   ```bash
   npm install -g vsce
   ```

3. **Build the extension**:
   ```bash
   npm run compile
   ```

4. **Package as VSIX**:
   ```bash
   vsce package
   ```

   This will create a `.vsix` file (e.g., `custom-fail-sound-0.1.0.vsix`) in your project directory.

## Installation

### Option 1: Command Line
1. Download the `.vslx` file
2. Open your terminal and run:
   ```bash
   code --install-extension path/to/CustomFailSound.vslx
   ```

### Option 2: VS Code UI
1. Download the `.vslx` file
2. Open VS Code
3. Go to the Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
4. Click the "..." menu in the top right corner
5. Select "Install from VSIX..."
6. Select the downloaded `.vslx` file

## Customizing the Sound

To use your own custom sound instead of the default:

1. Locate the extension directory:
   - **macOS/Linux**: `~/.vscode/extensions/custom-fail-sound-*/`
   - **Windows**: `%APPDATA%\Code\User\extensions\custom-fail-sound-*\`

2. Replace the sound file:
   - Navigate to the `assets` folder
   - Replace `sound.mp3` with your custom audio file
   - Supported formats: MP3, WAV, AIFF, and other common audio formats

3. Reload VS Code:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS)
   - Type "Reload Window" and select it

4. Test: Run a command that fails and you should hear your custom sound!

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for the full text.

Third-party libraries (for example `play-sound`) have their own licenses in `node_modules` after you run `npm install`.
