( function () {

    module.exports.init = function ( twoface ) {

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

            sandbox.router.get( "/", function ( context, done ) {
                sandbox.templates.render( "index" );

                done();
            })
        });
    }

}());