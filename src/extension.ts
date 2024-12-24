import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // Создаем панель для отображения найденных комментариев
    const outputChannel = vscode.window.createOutputChannel("TODO/BUG Comments");

    // Регистрация команды
    let disposable = vscode.commands.registerCommand('extension.findTodosAndBugs', () => {

        // Получаем все открытые документы
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            let todosAndBugs: string[] = [];

            // Ищем все строки с TODO или BUG
            for (let line = 0; line < document.lineCount; line++) {
                let text = document.lineAt(line).text;

                if (text.includes("TODO") || text.includes("BUG")) {
                    todosAndBugs.push(`Line ${line + 1}: ${text}`);
                }
            }

            // Показываем найденные комментарии в панели
            if (todosAndBugs.length > 0) {
                outputChannel.clear();
                todosAndBugs.forEach(comment => outputChannel.appendLine(comment));
                outputChannel.show();
            } else {
                vscode.window.showInformationMessage("No TODO/BUG comments found.");
            }
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
