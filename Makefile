pretest:
	@node ./node_modules/.bin/tslint -p ./tsconfig.json "./src/**/*.ts" "./test/**/*.ts"
test:
	@node node_modules/.bin/jest
coveralls:
	cat ./coverage/lcov.info | node ./node_modules/.bin/coveralls
commonjs:
	@node ./node_modules/.bin/tsc -p ./tsconfig.build.json
esm2015:
	@node ./node_modules/.bin/tsc -p ./tsconfig.build.esm2015.json
clean:
	@node ./node_modules/.bin/rimraf ./dist
packaging:
	@node ./node_modules/.bin/ts-node ./tools/packaging.ts

.PHONY: pretest test coveralls commonjs esm2015 clean packaging
