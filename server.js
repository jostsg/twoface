var templates   = {};
var handlebars  = require( "handlebars" );
var fs          = require( "fs" );
var path        = require( "path" );
var express     = require( "express" );
var server      = express();
var Sandbox     = require( "./sandbox_server" );

// has to happen before route registration, otherwise the parser breaks
server.use( express.bodyParser() );

var framework = {
    /**
     * Expose server to be able to add custom middleware
     *
     * @property server
     * @type Object
     */
    server: server,

    /**
     * Registers all templates in the given directory
     *
     * @method templates
     * @param {String} templatesPath
     */
    templates: function ( templatesPath ) {

        var templatesRawFiles = fs.readdirSync( templatesPath );
        templatesRawFiles.map( function ( file ) {
            var templateRaw = fs.readFileSync( path.join( templatesPath, file ), "utf8" );
            templates[ path.basename( file, ".html" ) ] = handlebars.compile( templateRaw );
        });

        /**
         * Sets up a service to render templates for the client
         */
        server.post( "/templates/:name", function ( req, res ) {
            var templateName = req.params.name;
            var template = templates[ templateName ];
            var data = req.body;

            res.send( template( data ) );
        });
    },

    /**
     * Creates a sandbox to pass to the module callback 
     *
     * @method module
     * @param {Function} module
     */
    module: function ( module ) {
        var sandbox = Sandbox.create( server, templates );
        module( sandbox );
    },

    /**
     * @method run
     * @param {Number} [port]
     */
    run: function ( port ) {
        port || ( port = 3000 )

        server.listen( port )
        console.log( "Server running on " + port + "." );
    }
}

/**
 * @module framework
 */
module.exports = framework;