// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { formatSwagger, unFormatSwagger } from './utils.js';

// Function to find the start of a comment block going backward
function findBackward(text, index) {
    for (let i = index; i >= 1; i--) {
        let char1 = text.charAt(i);
        let char2 = text.charAt(i - 1);
        if (char1 === '*' && char2 === '/') {
            return i - 1;
        }
    }

    // When reaching the start of the text without finding a comment block
    return -1;
}

// Function to find the end of a comment block going forward
function findForward(text, index) {
    for (let i = index; i < text.length - 1; i++) {
        let char1 = text.charAt(i);
        let char2 = text.charAt(i + 1);
        if (char1 === '*' && char2 === '/') {
            return i + 1;
        }
    }

    // When reaching the end of the text without finding a comment block
    return -1;
}

// Function to find the selection range of the comment block
function findSelection(selection) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return selection;
    }

    let selectionStart = editor.document.offsetAt(selection.start) - 1;
    let selectionEnd = editor.document.offsetAt(selection.end);
    let text = editor.document.getText();

    var backwardIndex = findBackward(text, selectionStart);
    var forwardIndex = findForward(text, selectionEnd);

    if (backwardIndex !== -1 && forwardIndex !== -1) {
        // Converting text index to VS Code selection index
        return new vscode.Selection(
            editor.document.positionAt(backwardIndex - 1),
            editor.document.positionAt(forwardIndex + 1)
        );
    }

    return selection;
}

/**
 * Activate function for the VS Code extension
 * 
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
    console.log('Congratulations, your extension "phpdoc-swagger-indenter" is now active!');
  
    context.subscriptions.push(
        vscode.commands.registerCommand('phpdoc-swagger-indenter.format', () => {
            const editor = vscode.window.activeTextEditor;

            if (!editor) {
                vscode.window.showWarningMessage('Please open a file with swagger comments in it');
                return;
            }

            const selection = findSelection(editor.selection);

            const text = editor.document.getText(selection);
            if (!text) {
                vscode.window.showErrorMessage('Please select a swagger-phpdoc comment');
                return;
            }

            const formatted = formatSwagger(text);
            if (!formatted) {
                vscode.window.showErrorMessage('An error occurred while formatting your comment');
                return;
            }

            editor.edit((e) => {
                e.replace(selection, formatted);
            });
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('phpdoc-swagger-indenter.unformat', () => {
            const editor = vscode.window.activeTextEditor;

            if (!editor) {
                vscode.window.showWarningMessage('Please open a file with swagger comments in it');
                return;
            }

            const selection = findSelection(editor.selection);
            const text = editor.document.getText(selection);

            if (!text) {
                vscode.window.showErrorMessage('Please place your cursor within a swagger-phpdoc comment');
                return;
            }

            const formatted = unFormatSwagger(text);

            if (!formatted) {
                vscode.window.showErrorMessage('An error occurred while unformatting your comment');
                return;
            }

            editor.edit((e) => {
                e.replace(selection, formatted);
            });
        })
    );
}

// Deactivate function for the VS Code extension
export function deactivate() {}
