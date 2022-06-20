import * as vscode from 'vscode'
import {
	logger,
	formatEditProvider,
	foldingRangeProvider,
} from './modules/env-format'
import {
	activateWatchers,
	deactivateWatchers,
	watchFileCreate,
} from './modules/env-sync'

const watchers: Array<vscode.Disposable> = []

export function activate(context: vscode.ExtensionContext) {
	// env-format
	context.subscriptions.push(logger, formatEditProvider, foldingRangeProvider)

	// env-sync
	const fileWatcher = vscode.workspace.createFileSystemWatcher(`**/*.env`)
	fileWatcher.onDidCreate((file: vscode.Uri): void => {
		console.log('createeee')
		watchFileCreate(file)
	})
	// context.subscriptions.push(fileWatcher)

	context.subscriptions.push(activateWatchers(watchers))
	context.subscriptions.push(deactivateWatchers(watchers))
	vscode.commands.executeCommand('sync-env.activateWatchers')
}

export function deactivate() {
	// env-sync
	vscode.commands.executeCommand('sync-env.deactivateWatchers')
}
