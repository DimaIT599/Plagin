import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const outputChannel = vscode.window.createOutputChannel("TODO/BUG Comments"); // Создание панели для отображения найденных комментариев

    let disposable = vscode.commands.registerCommand('extension.findTodosAndBugs', () => { // Объявление команды

        const editor = vscode.window.activeTextEditor; // Получаем документы
        if (editor) {
            const document = editor.document;
            let todosAndBugs: string[] = [];

            for (let line = 0; line < document.lineCount; line++) { // Ищем все строки с TODO или BUG
                let text = document.lineAt(line).text;

                if (text.includes("TODO") || text.includes("BUG")) {
                    todosAndBugs.push(`Line ${line + 1}: ${text}`);
                }
            }

            if (todosAndBugs.length > 0) { // Показываем найденные комментарии в панели
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