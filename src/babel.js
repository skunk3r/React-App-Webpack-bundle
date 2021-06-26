async function start() {
	return await Promise.resolve('hi from babel.js')
}

start().then(console.log)
