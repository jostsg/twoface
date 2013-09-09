( function () {
    var Sandbox = require( "./sandbox_client.js" );
    var page = require( "../page/index.js" );

    /**
     * @class framework
     * @static
     */
    var framework = {

        /**
         * @method module
         * @param {Function} module
         */
        module: function ( module ) {
            module( Sandbox.create( page ) );
        },

        /**
         * Starts routing
         *
         * @method run
         */
        run: function () {
            page();
        }
    };

    /**
     * @module framework
     */
    module.exports = framework;

}());