# Example product

# Init
`bower install`

`npm install -d`

# Start
`node server.js`

# Development
The client.js has to be built using browserify since TwoFace embraces the CommonJS module pattern.

`node_modules/.bin/browserify app.js > dist/js/client.js`