var twoface     = require( "twoface" );
var express     = require( "express" );
var path        = require( "path" );
var App         = require( "./app" );


twoface.server.use( "/assets", express.static( path.join ( __dirname, "dist" ) ) );
twoface.server.use( "/modules", express.static( path.join ( __dirname, "bower_components" ) ) );

// twoface.server.get( "/result", function ( x, y, next ) {
//     console.log( "server request" );
//     next();
// });

twoface.server.get( "/api/result", function ( req, res, next ) {
    res.json( {
        result: [
            { name: "Einz" },
            { name: "Zwei" }
        ]
    })
});

twoface.templates( path.join( __dirname, "templates" ) );

App.create( twoface );

twoface.run();