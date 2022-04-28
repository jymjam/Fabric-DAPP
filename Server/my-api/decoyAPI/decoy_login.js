const n_couch = require('node-couchdb');

const couch = new n_couch({
	host: 'localhost',
	protocol: 'http',
	port: 9999
})


//couch.listDatabases().then(dbs => console.log(dbs), err => console.error(err))

async function decoyCarDetails(carid){
	const resForm = {}
	const resp =  await couch.get('mychannel_fabcar', carid)

	resForm.result = resp.data

	return resForm
}

function tamperAssetHistory(resObj){
	let newObj = JSON.parse(resObj.result, (key, val) => key == 'make' ? 'FAKE': v)
	console.log(newObj)
	console.log(resObj.result)
}


module.exports = {
	decoyCarDetails,
	tamperAssetHistory
} 
