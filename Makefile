.EXPORT_ALL_VARIABLES:

NVM_RC_FILE = .nvmrc
NODE_VERSION_FROM_NVM = ${shell cat ${NVM_RC_FILE}}

.PHONY: debug
debug: ensure-node-version
		@echo "Starting What's Playing Bot in debug mode..."
		yarn debug

.PHONY: ensure-node-version
ensure-node-version:
		@node ./scripts/ensureNodeVersion

.PHONY: reset
reset: ensure-node-version
		@echo "Deleting node_modules folder..."
		rm -rf node_modules

.PHONY: delete-build
delete-build: ensure-node-version
		@echo "Deleting build folder..."
		rm -rf build
