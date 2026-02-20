/* -*- mode: javascript; tab-width: 4; indent-tabs-mode: nil; -*- */

/**
 * @fileOverview This file "prod.js" is the graphical content of the intro.
 *
 * This initial example belongs to the starter package of "Let's make a demo
 * 1.x" party coding workshop. During 3 x 4 tutored hours and your own effort
 * between them, this file eventually becomes your own artistic production.
 * Additionally, you will replace song.js with your own music exported from
 * SoundBox as JavaScript, write your own README.txt and set up a few names in
 * Settings.mk.
 *
 * How to start:
 *
 * 1. Make a complete copy of the whole "example0" directory and rename it
 *    according to your planned concept or just "PaulsFirstIntro" or whatever
 *
 * 2. If you happen to know what it means, do your favorite flavor of 'git init;
 *    git add *.js *.txt *.mk Makefile; git commit -m "Start from the example"' 
 *
 *    If you don't know what it means, skip that one.
 *
 * 3. Make sure that you can build and preview the example without problems.
 *
 * 4. Explore and try to learn how the example works.
 *
 * 5. Gradually, piece by piece, make it your own. Ask help from a workshop
 *    tutor. I recommend starting from very small changes to the example that
 *    help your understanding - how you change a color, how you change a
 *    location, how you change a rotation, how you sync something with the song
 *    time, ...
 *
 * 6. At some point, when comfortable, you can let go of these how-to comments
 *    and make this code file completely yours. One thing I recommend is storing
 *    your SoundBox song URL in a comment so it doesn't get lost.
 *
 **/

/*
The visuals of this production are synced to the following song
created using the great SoundBox minisynth:

http://sb.bitsnbites.eu/?data=U0JveAwC7dm9SsNQGMbx56RpBoeqizgGexWCuzeiWIoSxBIIRcwSQmiQlCKIeCdOjl6Nl6AnX5Dix5zo_5e-73vaLCfhTH1OD6SJfNc5izV6i2Ud7tp27BnnVc5040V2NXI9W3Z6jqNAS6Wdnm31lfouCL7f_6qat7rv-f6vFCnp9HSrZ71__7PZQrEWzYyrab9pHobzKEmivu__Qje66_RrndtT0_ZwwOd_qVyPX85_0cy1rY0AAAAAAAAAAPibulHZvtqoTH4ZlUmmuhrPT3oY8qPW-y__-C-qWKBYK1cZ8WVEAQAAAAAAAAAAAP_Sx8LYkpHrTetfnInkt7dNqV6m9vNb8S4BAAAAAAAAAAAwLHldJ-7OkV29jGXeU_mX4z23vGuarKxqZRr2Q6UkZQAAAAAAAAAAABiWTw

One older version, as an example of "keeping track of your song versions":

http://sb.bitsnbites.eu/?data=U0JveAwC7dk9SgNBGAbgd2MS0MKfSsvFnELwOJZCGhsRJN0SEiQhCCLexMrS03gE3c0aiKLWRp9n-L4ZdqaY2fa9Pky2U3Y7Z6NsPY9SO9qr20m_6DylM1j0L-tVO5JhrlKt9fGHPslvNxx-ff9J3ae5y82n87P3eV7XIgAAAAAAAPw16ynZQVYpWcomJUuK5Uge7nO7ya9s799kXrNlIjabZ5om3RtLwQAAAAAAAP6l14uirhTp9gftl85uUq62i0aqpPqp_EYAAAAAAAA2y7St0-7Ocb167KV4qVKe9_a7zW7RxmTLIOybqoRkAAAAAAAAbJY3

*/

// ----------------------------------------------------------------------------
// Global variables that you MUST define - they are used by the library code:

/** Song tempo; the library computes time in beats for easy sync. */
var songBeatsPerMinute = 116;

/** 
 * Frame producer function must be selected; this tutorial example depends on
 * the exact selection done here. In fact, everything after this selection could
 * be very different for different approaches of how to paint each graphics frame.
 *
 * TODO: In the future (maybe not yet in 2024) there could be a larger selection
 * of "demo type" choices here. So far there is the classic adaptation of course
 * exercise answers: You provide a scenegraph with objects, camera, and light.
 * The frame producer function traverses the graph and puts stuff to screen.
 */
var frameProducerFunction = frameProducerVanilla14;

/**
 * Shader selection; this tutorial example depends on the exact ones selected.
 * You better know what you do, if you change these. That said, why not ... The
 * library compiles the combination of shaders given here and uses that as the
 * shader program for everything that you draw.
 *
 * TODO: (Probably after 2024) This is related to the "demo type" choices which
 * I'd like to provide in the library. So far let's have one simple one: It has
 * a Phong shading model with exactly one light source. No white fog this year..
 */
var shaders = [vert_shader_vanilla14, frag_shader_vanilla14];

/** You must give an RGBA color; scene background is cleared by the library.*/
var clearColor = [0,0,0,1];

// ----------------------------------------------------------------------------
// Global variables that belong to your own production - the library does not
// use these, so you can change or add whatever you want here. They need to be
// global so they are available in your draw function below:

var objTile, objBackground, objBall;

// ----------------------------------------------------------------------------
/**
 * Initialize the constant and pre-computed "assets" used in your own
 * production; the library calls this function once before entering the main
 * loop.
 *
 * Things like graphics primitives / building blocks can be generated
 * here. Basically anything that you want to compute once, before the
 * show starts. Due to the current library workings, this includes all
 * shapes that you're going to use - modifying shapes on-the-fly is not
 * yet supported.
 */
function initAssets(){
    // The library provides some elementary ways to create shapes, as per
    // the MIT OCW first course in computer graphics that was its inspiration.
    // Once a shape is created, any number of transformed copies can be placed
    // in the scene.

    // Here, we create the most elementary of the elementary building blocks as
    // an example: the box and the ball.

    // Now there is a box shape available in the library:
    objTile = new funCircle(1,10,.5);

    // In initAssets():
    macaroniControlPoints = [
    // Curved elbow path
    0, 0, 0, 1,        // start
    0, 0.75, 0, 1,        // curve up
    0, 1.5, 0, 1,        // curve right
    1.5, 1.5, 0, 1         // end
    ];

    objMacaroni = new GenCyl(new funCircle(-0.3, 5, 1), 16, new funBezierCurve(macaroniControlPoints));
    objMacaroni_inside = new GenCyl(new funCircle(0.3, 5, -1), 15, new funBezierCurve(macaroniControlPoints));
    
    // Can make the radius negative to make an interior of a ball:
    objBackground = new GenCyl(new funCircle(-10,10,.5), 32,
                               new funCircle(0,32));

}


/**
 * Example of how you can structure your scene graph using functions that build
 * sub-graphs. Use names that are relevant to your production. Function
 * "snowman" builds a snowman for example. If you build a squirrel, you can call
 * the function "squirrel".
 *
 * Pro tip: Create meaningful and named parameters, too. Here, "handwave_amount"
 * would have been better than "t" etc. Do better than these examples..
 *
 */

/** 
 * Example of a function that returns a diffuse non-shiny basic coloring
 * compatible with the Vanilla 1.4 shader
 */
function basic_color(r,g,b){
    return [r/3, g/3, b/3, 0,
            r,   g,   b,   0,
            0,   0,   0,   1,
            0,   0,   0,   0]
}

function buildSceneAtTime(t){
    
    var sceneroot = {f:[],o:[],c:[]};

    var ctausta=
        [.1, .1, .2, 1,
         .3, .3,  1, 1,
         .1, .1, .1, 2,
          0,  0,  0, 0 ];

    var tausta = {
        f:[],
        o:[new Material(ctausta), objBackground],
        c:[]
    };

    sceneroot.c.push({f:[scaleXYZ_wi(3,3,3)],
                      o:[],
                      c:[tausta]});

    sceneroot.c.push({f:[translate_wi(0,5,0), rotY_wi(t/3), translate_wi(0,0,30), rotX_wi(.2)],
                      o:[],
                      c:[],
                      r:[new Camera()]});
    sceneroot.c.push({f:[translate_wi(9*Math.sin(t), 3+Math.sin(t), 0), scale_wi(.1)],
                      o:[new Material(basic_color(9,9,9)), objTile],
                      c:[],
                      r:[new Light()]});

    sceneroot.c.push({
        f: [scale_wi(2+Math.sin(t)), rotX_wi(t/2), rotY_wi(t/2), rotZ_wi(t/2)],
        o: [new Material(basic_color(0.85, 0.75, 0.6)), objMacaroni],
        c: []
    })

    sceneroot.c.push({
        f: [scale_wi(2+Math.sin(t)), rotX_wi(t/2), rotY_wi(t/2), rotZ_wi(t/2)],
        o: [new Material(basic_color(0.85, 0.75, 0.6)), objMacaroni_inside],
        c: []
    })

return sceneroot;
}




// -----------------------------------------------------------------------------

/**
 * (Optionally) initialize additional HTML and CSS parts of the
 * document. This can be used, for example, for scrolling or flashing
 * text shown as usual HTML or hypertext. Not often used in actual
 * demoscene productions.
 */
const synth = window.speechSynthesis;
const voices = synth.getVoices();
async function initDocument(){
    text = document.createElement("div");
    text.style.position = "fixed";
    text.style.font = "10em Arial";
    document.body.appendChild(text);

    console.log(voices);
    const finnishVoice = voices.find(v => v.lang === "fi-FI");
    var utterance = new SpeechSynthesisUtterance("Makarooooni");
    for (let step = 0; step < 100; step++) {
    utterance.voice = finnishVoice
        synth.speak(utterance);
    }
}

function updateDocument(t){
    text.textContent = "MAKAROONI :DDDD";
}
