/**
 * @module Sandbox
 */

var http = require( "http" );

/*
 * @method create
 * @param {Object} server
 * @param {Object} templates
 * @return {Object} sandbox
 */
module.exports.create = function ( server, templates ) {

    var html = "";
    var baseUrl = "";

    return {

        /**
         * @module Router
         */
        router: {

            /**
             * Adds routes, e.g. /result/:id
             *
             * @method get
             * @param {String} pattern
             * @param {Function} callback
             */
            get: function( pattern, callback ) {
                server.get( pattern, function ( req, res, next ) {
                    if ( baseUrl == "" ) {
                        baseUrl = req.protocol + "://" + req.get( "host" );
                    }

                    callback( function () {
                        res.end( html )
                    });
                });
            }
        },

        /**
         * @module Templates
         */
        templates: {

            /**
             * Renders templates
             * name is the name of the template without ".html"
             *
             * @method render
             * @param {String} name
             * @param {Object} data
             */
            render: function( name, data ) {
                var layout = templates[ "layout" ];
                var template = templates[ name ];

                html = layout( { view: template( data || {} ) } );
            }
        },

        /**
         * @module Http
         */
        http: {

            /**
             * Can be used to do http get requests
             * 
             * @method get
             * @param {String} url
             * @param {Function} callback
             */
            get: function( url, callback ) {

                var data = "";
                var url = baseUrl + url;
                
                http.get( url, function( res ) {
                    var chunk = "";

                    res.on( "data", function ( data ) {
                        chunk += data;
                    })
                    .on( "end", function () {
                        var data = JSON.parse( chunk );
                        callback( null, data );
                    });
                }).on( "error", function( e ) {
                    var err = new Error ( "sandbox.http.get(): Failed." )
                    err.message += ", " + e.message || "";
                    callback( err );
                })
            }
        }
    }
}
