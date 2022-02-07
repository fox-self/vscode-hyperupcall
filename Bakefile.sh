# shellcheck shell=bash

task.publish() {
	bake.assert_cmd 'vsce'

	vsce publish
}
