# shellcheck shell=bash

task.build() {
	pnpm run build
}

task.publish() {
	bake.assert_cmd 'vsce'

	vsce publish
}
