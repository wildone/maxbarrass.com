/*global defaults:false, parse:false, Compressor:false, JS_Parse_Error:false, DefaultsError:false */
/*jshint globalstrict:true */

'use strict';

window.Uglify = window.Uglify || {};

;(function ($, undefined) {


    Uglify.default_options = {
        parse: {
            strict: false
        },
        mangle: {
            mangle: true
        },
        compress: {
            sequences: true,
            properties: true,
            dead_code: true,
            drop_debugger: true,
            unsafe: false,
            unsafe_comps: false,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            hoist_vars: false,
            if_return: false,
            join_vars: true,
            cascade: true,
            pure_getters: false,
            pure_funcs: null,
            drop_console: false,
            side_effects: true,
            negate_iife: false,
            screw_ie8: false,
            warnings: true,
            global_defs: {}
        },
        output: {
            beautify: false,
            indent_level: 4,
            indent_start: 0,
            quote_keys: false,
            space_colon: true,
            ascii_only: false,
            inline_script: false,
            width: 80,
            max_line_len: 32000,
            bracketize: false,
            semicolons: true,
            comments: false,
            source_map: null,
            preserve_line: false,
            screw_ie8: false
        }
    };

    Uglify.default_options_unsafe = {
        parse: {
            strict: false
        },
        mangle: {
            mangle: true
        },
        compress: {
            sequences: true,
            properties: true,
            dead_code: true,
            drop_debugger: true,
            unsafe: true,
            unsafe_comps: true,
            conditionals: true,
            comparisons: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            hoist_vars: false,
            if_return: true,
            join_vars: true,
            cascade: true,
            side_effects: true,
            negate_iife: true,
            screw_ie8: false,
            warnings: true,
            global_defs: {}
        },
        output: {
            indent_start: 0,
            indent_level: 4,
            quote_keys: false,
            space_colon: true,
            ascii_only: false,
            inline_script: true,
            width: 80,
            max_line_len: 32000,
            beautify: false,
            source_map: null,
            bracketize: false,
            semicolons: true,
            comments: false,
            preserve_line: false,
            screw_ie8: false
        }
    };



    Uglify.default_options_safe = {
        parse: {
            strict: false
        },
        mangle: {
            mangle: false
        },
        compress: {
            sequences: false,
            properties: false,
            dead_code: false,
            drop_debugger: false,
            unsafe: false,
            unsafe_comps: false,
            conditionals: false,
            comparisons: false,
            evaluate: false,
            booleans: false,
            loops: false,
            unused: false,
            hoist_funs: false,
            hoist_vars: false,
            if_return: false,
            join_vars: false,
            cascade: false,
            side_effects: false,
            negate_iife: false,
            screw_ie8: false,
            warnings: false,
            global_defs: {}
        },
        output: {
            beautify: false,
            indent_start: 0,
            indent_level: 4,
            quote_keys: false,
            space_colon: true,
            ascii_only: false,
            inline_script: true,
            width: 80,
            max_line_len: 32000,
            source_map: null,
            bracketize: false,
            semicolons: true,
            comments: false,
            preserve_line: false,
            screw_ie8: false
        }
    };

    Uglify.uglify = function(code, options) {
        // Create copies of the options
        var parse_options = defaults({}, options.parse);
        var mangle_options = defaults({}, options.mangle);
        var compress_options = defaults({}, options.compress);
        var output_options = defaults({}, options.output);

        parse_options = defaults(parse_options, Uglify.default_options.parse, true);
        mangle_options = defaults(mangle_options, Uglify.default_options.mangle, true);
        compress_options = defaults(compress_options, Uglify.default_options.compress, true);
        output_options = defaults(output_options, Uglify.default_options.output, true);

        // 1. Parse
        var toplevel_ast = parse(code, parse_options);
        toplevel_ast.figure_out_scope();

        // 2. Compress
        var compressor = new Compressor(compress_options);
        var compressed_ast = toplevel_ast.transform(compressor);

        // 3. Mangle
        compressed_ast.figure_out_scope();
        compressed_ast.compute_char_frequency();
        // console.log(["mangle",mangle_options.mangle]);
        if (mangle_options.mangle) {
            compressed_ast.mangle_names();
        }


        // 4. Generate output
        code = compressed_ast.print_to_string(output_options);

        return code;
    };


    function encodeHTML(str) {
        return (str + '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;');
    };


    Uglify.format_error = function(e, param) {
        if (e instanceof JS_Parse_Error) {
            var input = param;
            var lines = input.split('\n');
            var line = lines[e.line - 1];
            e = 'Parse error: <strong>' + encodeHTML(e.message) + '</strong>\n' +
                '<small>Line ' + e.line + ', column ' + e.col + '</small>\n\n' +
                (lines[e.line-2] ? (e.line - 1) + ': ' + encodeHTML(lines[e.line-2]) + '\n' : '') +
                e.line + ': ' +
                encodeHTML(line.substr(0, e.col)) +
                    '<mark>' + encodeHTML(line.substr(e.col, 1) || ' ') + '</mark>' +
                encodeHTML(line.substr(e.col + 1)) + '\n' +
                (lines[e.line] ? (e.line + 1) + ': ' + encodeHTML(lines[e.line]) : '');
        } else if (e instanceof DefaultsError) {
            e = '<strong>' + encodeHTML(e.msg) + '</strong>';
        } else if (e instanceof Error) {
            e = e.name + ': <strong>' + encodeHTML(e.message) + '</strong>';
        } else {
            e = '<strong>' + encodeHTML(e) + '</strong>';
        }
        return (e);
    };


    function loadBodyScript(url) {
        var script= document.createElement('script');
        script.type= 'text/javascript';
        script.src= url;
        script.async = false;
        document.body.appendChild(script);
    }



    $(document).ready(function() {

        loadBodyScript("/assets/tools/plugins/uglify2/utils.js");
        loadBodyScript("/assets/tools/plugins/uglify2/ast.js");
        loadBodyScript("/assets/tools/plugins/uglify2/parse.js");
        loadBodyScript("/assets/tools/plugins/uglify2/transform.js");
        loadBodyScript("/assets/tools/plugins/uglify2/scope.js");
        loadBodyScript("/assets/tools/plugins/uglify2/output.js");
        loadBodyScript("/assets/tools/plugins/uglify2/compress.js");

    });


})(jQuery);