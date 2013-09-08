/**
 * @module Sandbox
 */

/**
 * @method create
 * @param {Object} page
 * @param {Object} templates
 * @param {Object} Sandbox
 */
module.exports.create = function ( page, templates ) {

    /**
     * @property html
     * @type String
     * @default ""
     * @private
     */
    var html = "";


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
                page( pattern, function ( context, next ) {
                    var context = {
                        params: context.params
                    };

                    callback( context, function () {} );
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

                var url = "/templates/" + name;

                $.ajax({
                    type: "POST",
                    data: JSON.stringify( data ),
                    contentType: "application/json",
                    url: url,
                    success: function( html ) {
                        $( "#view" ).html( html )
                    }
                });
            }
        },

        /**
         * @module Http
         */
        http: {

            /**
             * Does http get requests
             *
             * @method get
             * @param {String} url
             * @param {Function} callback
             */
            get: function( url, callback ) {
                $.get( url )
                    .done( function ( data ) {
                        callback( null, data );
                    })
                    .fail( function () {
                        var err = new Error( "sandbox.http.get(): Failed." );
                        callback( err );
                    });
            }
        }
    }
}
