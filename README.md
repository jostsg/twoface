# TwoFace
TwoFace is an example implementation of a framework that follows the shared code approach. It is not meant to be used in production.

# Getting Started
Install TwoFace with `bower` and `npm`. This is necessary since they have different endpoints.

## Setup server
```js
// server.js
var twoface     = require( "twoface" );
var express     = require( "express" );
var path        = require( "path" );
var app         = require( "./app" );

// add an assets path
twoface.server.use( "/assets", express.static( path.join ( __dirname, "dist" ) ) );

// path to the directoy containing your templates
// structure has to be flat
twoface.templates( path.join( __dirname, "templates" ) );

// Initialize app server-side
app.init( twoface );

// Start server
twoface.run();
```

## Setup client
```js
// client.js
var app = require( "./app" );

// Make sure TwoFace is installed using bower
var twoface = require( "./bower_components/twoface/client.js" );

// Init
app.init( twoface );

// Start routing
twoface.run();
```

## Add Layout

By convention TwoFace looks for a layout at `:templatePath/layout.html`.

Since this is a show case, TwoFace depends on jQuery for cleaner examples. Make sure jQuery is added to the layout.

```html
<!-- :templates/layout.html -->
<!doctype html>
<html>

<head>
    <title>Shared Code</title>
</head>

<body>
    <!-- Rendered templates will be put here  -->
    <div id="view">{{{view}}}</div>

    <script src="modules/jquery/index.js"></script>
    <script src="assets/js/client.js"></script>
</body>

</html>
```

## Write a module
```html
// :templates/index.html
<h1>Index</h1>
```

```js
// app.js
( function () {

    module.exports.init = function ( twoface ) {

        twoface.module( function ( sandbox ) {

            sandbox.router.get( "/", function ( context, done ) {
                sandbox.templates.render( "index" );

                // Has to be called, so the server knows when to answer
                // Has no effect on client-side currently
                done();
            })
        });
    }

}());
```

## Build client file
The client file has to be built using `browserify` since TwoFace embraces the CommonJS module pattern.

`npm install browserify --save-dev`

`node_modules/.bin/browserify client.js dist/js/client.js`

## Start server
`node server.js`




# Sandbox API

## router

##### get( pattern:String, callback: Function )
`get()` adds routes

- `pattern` can be any pattern that page.js and express.js allow
- `callback` will be called like this `callback( done )`
  - `done` is a function to indicate that a routing process is done

```js
sandbox.router.get( "/my-route", function ( done ) {
    // do smth
    done();
});
```

## http

##### get( url: String, callback: Function )
`get()` does http requests.

- `url` is the url to the service endpoint
- `callback` follows the Node.js callback pattern, `callback( err, data )`

```js
sandbox.http.get( "/service", function ( err, data ) {
    if ( err == null ) {
        console.log( "success" );    
    } else {
        throw err;   
    }
});
```

## templates

##### render( name: String, data: Object )
`render()` renders templates at `:templates/:name` with the given `data`.

```js
var data = {
    someData: [
        { descripton "lorem ipsum" }
    ]
};

sandbox.templates.render( "data", data );
```
