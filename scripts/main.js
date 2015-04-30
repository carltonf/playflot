var persist_data = {};

$(function() {
    var jsFlotEditor = CodeMirror($("#js-editor")[0], {
        value: "// Put your code below",
        mode:  "javascript"
    });

    /* only with an explicit number as height, the editArea of CodeMirror would
       not be autoresized.

       WARNING: With this part, we void the responsiveness of our code. Maybe
       this is not that important.
    */
    jsFlotEditor.setSize(null,
                         $("#graph").css('height').replace("px", "") - 5);

    function safer_eval (code_str) {
        try {
            eval(code_str);
        } catch (e) {
            /* if (e instanceof SyntaxError) {
               } */
            // nothing
        }
    };

    $.ajax({
        /* Need mimeType to override file type, see
         * http://stackoverflow.com/questions/1828228/why-does-jquery-insist-my-plain-text-is-not-well-formed
         */
        mimeType: 'text/plain; charset=x-user-defined',
        url:         "prefilled.js",
        type:        "GET",
        dataType:    "text",
        cache:       false,
        success:     function( data, textStatus, jqxhr ) {
            persist_data.prefilled_data = data;
            jsFlotEditor.setValue(data);

            safer_eval(data);
            // console.log( data ); // Data returned
            // console.log( textStatus ); // Success
            // console.log( jqxhr.status ); // 200
            // console.log( "Load was performed." );
        }
    });

    jsFlotEditor.on('changes', function(e){
        safer_eval(jsFlotEditor.getValue());
    })
});

