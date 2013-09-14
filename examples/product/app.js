( function () {

    /**
     * @class myApp
     * @static
     */
    var MyApp = {};
    
    /**
     * @method init
     * @param {Object} twoface
     */
    MyApp.create = function ( twoface ) {

        twoface.module( function ( sandbox ) {

            sandbox.router.get( "/result", function ( done ) {

                sandbox.http.get( "/api/result", function ( err, data ) {

                    if ( err != null ) {
                        throw err;
                    }
                    
                    sandbox.templates.render( "result", data );
                    
                    done();
                });
            });

            sandbox.router.get( "/", function ( done ) {
                sandbox.templates.render( "index" );

                done();
            })
        });
    }

    module.exports = MyApp;

}());