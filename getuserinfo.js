const https = require('https')
const id = process.argv.slice(2)[0]


async function getData(id) { 
	const gd = () => {
		return new Promise((resolve, reject) => {
			const options = {
				hostname: 'discord.com',
				port: 443,
				path: '/api/v8/users/' + id,
				headers: {'Authorization': 'Bot INSERT_TOKEN_HERE'},
				method: 'GET'
			}

			const req = https.request(options, (res) => {
				console.log(`statusCode: ${res.statusCode}`)

				
				  res.on('data', d => {
					  try {
						  resolve(JSON.parse(d))
					  }
					  catch {
						  console.log("ERROR - This user has non ascii username.")
						  var nothing = {}
						  resolve(nothing)
					  }
				  })
				})

				req.on('error', error => {
				  console.error(error)
				})
			req.end()

		})
	}
	return await gd()
}

const Snowflake = require("./discord/Snowflake")

async function main() {
	var creation = new Date(Snowflake.deconstruct(id).timestamp)
	var data = await getData(id)
	var userdata = "ID: "+ data.id + "\nUsername: " + data.username + "\nAvatar: " + data.avatar + "\nDiscriminator: " + data.discriminator + "\nPublic Flags: " + data.public_flags + "\nDate of Creation: " + creation

	console.log(userdata)
}
main()
