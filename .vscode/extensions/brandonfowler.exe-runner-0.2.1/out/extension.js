"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const url_1 = require("url");
let terminal;
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('exe-runner.run', (fileUri) => {
        var _a;
        // Fallback to active editor for command palette
        fileUri = fileUri || ((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri);
        // Handle unsaved editors, remote editors etc.
        if (!fileUri || fileUri.scheme !== 'file') {
            vscode.window.showErrorMessage('Selected file is an invalid local file.');
            return;
        }
        let filePath = url_1.fileURLToPath(fileUri.toString());
        let isWin = process.platform === 'win32';
        // Create the terminal and show it
        terminal = terminal || vscode.window.createTerminal('exe Runner', isWin ? 'C:\\Windows\\System32\\cmd.exe' : undefined);
        terminal.show();
        terminal.sendText(`${isWin ? '' : 'wine '}"${filePath}"`);
        // Unset the terminal variable when the terminal is closed
        vscode.window.onDidCloseTerminal(closedTerminal => {
            if (closedTerminal === terminal) {
                terminal = undefined;
            }
        });
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map