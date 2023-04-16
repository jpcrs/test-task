import * as vscode from 'vscode';




export function activate(context: vscode.ExtensionContext) {
	vscode.tasks.onDidStartTask((e) => {
		if (e.execution.task.name === 'test-task') {
			vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Global, 'test-task', 'test-task', new vscode.ShellExecution('${command:workbench.action.terminal.moveToEditor}')));
			vscode.tasks.executeTask(new vscode.Task({ type: 'shell' }, vscode.TaskScope.Global, 'test-task', 'test-task', new vscode.ShellExecution('${command:workbench.action.closePanel}')));
		}
	});

	let task = new vscode.Task(
		{ type: 'shell' },
		vscode.TaskScope.Workspace,
		'test-task',
		'test-task',
		new vscode.ShellExecution("echo test-task"),
		'$test-task'
	)

	task.presentationOptions = {
		reveal: vscode.TaskRevealKind.Always,
		focus: true,
		panel: vscode.TaskPanelKind.Dedicated,
		showReuseMessage: false,
		clear: true
	}

	task.isBackground = true;

	let disposable = vscode.commands.registerCommand('test-task.helloWorld', () => {
		vscode.tasks.executeTask(task);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
