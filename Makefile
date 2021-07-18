.EXPORT_ALL_VARIABLES:

NVM_RC_FILE = .nvmrc
NODE_VERSION_FROM_NVM = ${shell cat ${NVM_RC_FILE}}

.PHONY: start
start: ensure-node-version
		@echo "Starting What's Playing Bot in debug mode..."
		yarn start

.PHONY: ensure-node-version
ensure-node-version:
		@npx ts-node ./scripts/ensureNodeVersion
