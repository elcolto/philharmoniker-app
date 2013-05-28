/** @fileoverview Haupt JavaScript Datei des Apps. */

/**
 * Die Musician Klasse repräsentiert einen Musiker im App.
 * @param id CSS id des Musiker-DIVs (mit '#')
 * @param soundfile hauptteil der verschiedenen sound-datei-namen. Es werden die drei Varianten daraus generiert
 * @constructor
 */
function Musician( id, soundfile )
{
    'use strict';

    var self = this, // this referenz für closures
        num_frames = 12,
        normal_speed = 12,
        high_speed = 24,
        low_speed = 6;

    this.id = id;
    this.soundfile_normal = 'sound/' + soundfile + '_normal.mp3';
    this.soundfile_slow = 'sound/' + soundfile + '_langsam.mp3';
    this.soundfile_fast = 'sound/' + soundfile + '_schnell.mp3';

    this.is_playing = false;
    this.speed = normal_speed;

    this.sound_normal = new Howl(
        {
            urls: [this.soundfile_normal]
        });

    this.sound_slow = new Howl(
        {
            urls: [this.soundfile_slow]
        });

    this.sound_fast = new Howl(
        {
            urls: [this.soundfile_fast]
        });

    this.start_playing = function ()
    {
        if ( ! this.is_playing ) // spielen wir schon?
        {
            $(id).sprite({ fps: this.speed, no_of_frames: num_frames });
            this.sound_normal.play();
            this.is_playing = true;
        }
    };

    this.toggle_playing = function ()
    {
        if ( this.is_playing )
        {
            $(id).destroy();
            this.sound_slow.stop();
            this.sound_normal.stop();
            this.sound_fast.stop();
            this.is_playing = false;
        }
        else
        {
            $(id).sprite({ fps: this.speed, no_of_frames: num_frames });
            this.sound_normal.play();
            this.is_playing = true;
        }
    };

    this.stop_playing = function ()
    {
        $(id).destroy();
        this.sound_normal.stop();
        this.is_playing = false;
    };

    function change_anim_speed( speed )
    {
        self.speed = speed;
        $(id).fps(self.speed);
    }

    this.slower = function ()
    {
        change_anim_speed(low_speed);
        var position = this.sound_normal.pos();
        this.sound_normal.stop();

        this.sound_slow.play();
        this.sound_slow.pos(position);
    };

    this.faster = function ()
    {
        change_anim_speed(high_speed);

        var position = this.sound_normal.pos();
        this.sound_normal.stop();

        this.sound_fast.play();
        this.sound_fast.pos(position);
    };
}

function generate_gesture( gesture )
{
    // generiere irgendwie Gestendaten
    // schreibe sie in das Gestenobjekt
    gesture.works = true;
}

/**
 * Verarbeitet eine erhaltene Geste und bestimmt, was im Spiel als nächste s geschieht
 * @param gesture Irgendein tolles Gestenobjekt
 */
function process_gesture( gesture )
{
    // TODO: gestenobjekt erhalten und dann tolle Sachen damit machen
    var gesture_type = 0;
    switch ( gesture_type )
    {
        case 0:
            // Geste 0 erkannt! mach was!
            break;
        case 1:
            break;
        default:
            break;
    }
}

/**
 * Bookmark-Erinnerungs bubble anzeigen
 */
function remind_to_bookmark()
{
    'use strict';

    window.setTimeout(function()
    {
        var bubble = new google.bookmarkbubble.Bubble(),
            parameter = 'bmb=1';

        // Hash-Problem workaround von hier: https://code.google.com/p/mobile-bookmark-bubble/issues/detail?id=7
        bubble.hasHashParameter = function()
        {
            //return window.location.hash.indexOf(parameter) != -1; // Konflikt mit JQM hash
            return window.location.search.indexOf(parameter) != -1; // workaround
        };

        bubble.setHashParameter = function()
        {
            //if (!this.hasHashParameter()) { window.location.hash += parameter; } // Konflikt mit JQM hash
            if (!this.hasHashParameter())
            {
                if (window.location.search.indexOf('?') == -1)
                {
                    window.history.replaceState('Object', 'Title', window.location + '?' + parameter);
                }
                else
                {
                    window.history.replaceState('Object', 'Title', window.location + '&' + parameter);
                }
            }
        };

        bubble.getViewportHeight = function() {
            return window.innerHeight;
        };

        bubble.getViewportScrollY = function() {
            return window.pageYOffset;
        };

        bubble.registerScrollHandler = function(handler) {
            window.addEventListener('scroll', handler, false);
        };

        bubble.deregisterScrollHandler = function(handler) {
            window.removeEventListener('scroll', handler, false);
        };

        // Grafiken in base64
        bubble.IMAGE_ARROW_DATA_URL_ = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAATCAYAAABlcqYFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAB49JREFUeAEAfweA+AD///////33//Tiof/3wxL//MIA//zCAP/8wgD//MIA//zCAP/8wgD//MIA//zCAP/8wgD//MIA//zCAP/8wgD//MIA//zCAf/7wgL//MIB//vCAv/5wgn/9c1B////////////AAAAABP///////31//Dhp//4wgz//MIB//zCAP/8wgD//MIA//zCAP/8wgD//MIA//zCAP/8wgD//MIA//zCAP/7wgP/+cIJ//vCA//7wgL/+sIF//PMRP//+eX//////wAAABMAAAAAIAAAADH19fX4//75/+zXiP/7wgT//MIB//zCAP/8wgD//MIA//zCAP/8wgD//MIA//zCAP/8wgD//MIB//fCEP/7wgT/+8ID//zCAP/wyDv///zy//////8AAAAxAAAAIAAAAAAdAAAANAAAAEj///////vv/+bMav/7wgP//MIA//zCAP/8wgD//MIA//zCAP/8wgD//MIA//zCAP/6wgT/+cII//vCA//8wgD/98QV///33///////AAAASAAAADQAAAAdAAAAABMAAAAnAAAAPgAAAFP///7///jg//TFI//8wgH//MIA//zCAP/8wgD//MIA//zCAP/8wgD//MIC//vCAv/7wgL//MIA//vCBP/578j//////wAAAFMAAAA/AAAAJwAAABMAAAAABgAAABMAAAAoAAAAQb29vdf///7/+fHQ//rCB//8wgH//MIA//zCAP/8wgH/+sIF//jCCf/6wgX//MIA//zCAP/7wgP/+uy8/////v/f39/sAAAAQQAAACgAAAATAAAABgAAAAABAAAABgAAABUAAAAsAAAAR9/f3+z/////9OzJ//nCCP/8wgD//MIA//vCAf/2wg//+sIF//zCAP/8wgD//MIA//Dox///////39/f7AAAAEgAAAAtAAAAFQAAAAYAAAABAP///wAAAAABAAAACQAAABsAAAA1AAAATurq6vL/////7+3e//rCBP/8wgD//MIA//vCAv/8wgH//MIA//zCAP/s2pf////9//T09PkAAABPAAAANwAAABwAAAAKAAAAAQAAAAAA////AP///wAAAAADAAAADgAAACIAAAA7AAAAUfT09Pn/////789c//zCAP/8wgD//MIB//zCAf/7wgL/7tBl///////09PT5AAAAUgAAADwAAAAjAAAADgAAAAQAAAAAAAAAAAD///8A////AAAAAAEAAAAFAAAAEQAAACUAAAA9AAAAUv//////+eT/6c1h//vCA//8wgD/+8IC/+XJXf///vz//////wAAAFIAAAA+AAAAJgAAABIAAAAGAAAAAQAAAAAAAAAAAP///wD///8A////AAAAAAEAAAAGAAAAEgAAACYAAAA+AAAAU///////+ur/5Mli//vCAf/myFn///32//////8AAABTAAAAPgAAACYAAAASAAAABgAAAAEAAAAAAAAAAAAAAAAA////AP///wD///8A////AAAAAAEAAAAGAAAAEgAAACgAAABAvb291//////49ur/9cQd//jz3v//////vLy81wAAAEEAAAAoAAAAEgAAAAYAAAABAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AAAAAAEAAAAGAAAAFQAAACwAAABH1NTU5P////////7//////9PT0+YAAABHAAAALAAAABUAAAAGAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AAAAAAD///8A////AAAAAAEAAAAJAAAAGwAAADUAAABN4ODg6//////f39/sAAAATQAAADUAAAAbAAAACQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8AAAAAAP///wD///8A////AAAAAAMAAAANAAAAIQAAADoAAABO7Ozs8AAAAE8AAAA6AAAAIQAAAA0AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAARAAAAJAAAADgAAABBAAAAOAAAACQAAAARAAAABQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAYAAAARAAAAHgAAACYAAAAeAAAAEQAAAAYAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAYAAAAMAAAADwAAAAwAAAAGAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAEAAAAAgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA///7pcKKFmowtgAAAABJRU5ErkJggg==';
        bubble.IMAGE_CLOSE_DATA_URL_ = 'data:image/png;base64,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/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAwBQTFRFaWlpX19fdnZ2ZGRkl5eXW1tbTk5OUVFRiYmJS0tLrKysb29vSUlJY2Nj////BQUFBQUFBQUFBgYGBgYGBgYGBwcHBwcHBwcHCAgICAgICAgICQkJCQkJCQkJCgoKCgoKCgoKCwsLCwsLCwsLDAwMDAwMDAwMDQ0NDQ0NDQ0NDg4ODg4ODg4ODw8PDw8PDw8PEBAQEBAQEBAQEREREREREREREhISEhISEhISExMTExMTExMTFBQUFBQUFRUVFRUVFRUVFhYWFhYWFhYWFxcXFxcXFxcXGBgYGBgYGBgYGRkZGRkZGRkZGhoaGhoaGhoaGxsbGxsbHBwcHBwcHBwcHR0dHR0dHR0dHh4eHh4eHh4eHx8fHx8fHx8fICAgICAgICAgISEhISEhIiIiIiIiIiIiIyMjIyMjIyMjJCQkJCQkJCQkJSUlJSUlJiYmJiYmJiYmJycnJycnJycnKCgoKCgoKCgoKSkpKSkpKioqKioqKioqKysrKysrKysrLCwsLCwsLS0tLS0tLS0tLi4uLi4uLi4uLy8vLy8vMDAwMDAwMDAwMTExMTExMjIyMjIyMjIyMzMzMzMzNDQ0NDQ0NDQ0NTU1NTU1NjY2NjY2Nzc3Nzc3Nzc3ODg4ODg4OTk5OTk5Ojo6Ojo6Ozs7Ozs7Ozs7PDw8PDw8PT09PT09Pj4+Pj4+Pz8/Pz8/QEBAQEBAQUFBQUFBQkJCQkJCQ0NDQ0NDRERERUVFRUVFRkZGRkZGR0dHR0dHSEhISUlJSUlJSkpKS0tLS0tLTExMTU1NTU1NTk5OT09PT09PUFBQUVFRUlJSUlJSU1NTVFRUVVVVVlZWV1dXV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYmJiY2NjZGRkZWVlZmZmaGhoaWlpa2trbGxsbm5ub29vcXFxcnJydHR0dnZ2eHh4enp6fHx8f39/gYGBhISEhoaGiYmJjIyMkJCQk5OTl5eXnJycoKCgpqamrKyss7Ozvb29ycnJ29vb////NqHexAAAASBJREFUeAEAEAHv/gANDQ0NDQ0NDQ0NDQ0NDQ0NAA0ODg4ODg4ODg4ODg4ODg0ADQ4ODg4ODg4ODg4ODg4ODQANDg4FBwoODg4OCwcKDg4NAA0OBAkMBwoODgsMDAIODg0ADQ4OCAkMBwoLDAwLDg4ODQANDg4OCAkMBgwMCw4ODg4NAA0ODg4OCAkMDAAODg4ODg0ADQ4ODg4LDAwMBwoODg4ODQANDg4OCwwMAwkMBwoODg4NAA0ODgsMDAsOCAkMBwoODg0ADQ4KCQwLDg4OCAkMAA4ODQANDg4ICw4ODg4OCAEODg4NAA0ODg4ODg4ODg4ODg4ODg0ADQ4ODg4ODg4ODg4ODg4ODQANDQ0NDQ0NDQ0NDQ0NDQ0NAQAA//+e5Qx66mujHwAAAABJRU5ErkJggg==';

        bubble.TIME_UNTIL_AUTO_DESTRUCT = 10000; // auto hide in ms

        bubble.showIfAllowed();
    }, 1000);
}

/**
 * Code wird beim laden der #app-page ausgeführt (einmalig)
 */
$(document).on('pageinit', '#app-page', function ()
{
    'use strict';

    // Musiker-Objekte
    var geigerin = new Musician('#geigerin', 'geige'),
        floetistin = new Musician('#floetistin', 'floete'),
        harfenspieler = new Musician('#harfenspieler', 'harfe');

    /**
     * Musiker Tap-Eventhandler
     * @param event
     */
    function tap_handler( event )
    {
        event.stopPropagation(); // event bubbling stoppen

        var musician;
        switch ($(this).parent()[0].id) // id des angeklickten divs
        {
            case 'geigerin':
                musician = geigerin;
                break;
            case 'floetistin':
                musician = floetistin;
                break;
            case 'harfenspieler':
                musician = harfenspieler;
                break;
            default:
                break;
        }

        musician.toggle_playing();
    }

    /**
     * Drag Handler für die Stimmungs-Icons
     * @param event
     */
    function icon_drag_handler( event )
    {
        var x = event.originalEvent.changedTouches[0].pageX,
            y = event.originalEvent.changedTouches[0].pageY,
            offset_x = x - $(this).offset().left,
            offset_y = y - $(this).offset().top;

        $(this).detach();
        $(this).appendTo($('body'));
        $(this).css('position', 'fixed');
        var x = event.originalEvent.changedTouches[0].pageX;
        var y = event.originalEvent.changedTouches[0].pageY;
        $(this).css('left', x - offset_x);
        $(this).css('top', y - offset_y);

        // Handler für den Bewegungsteil des Drags
        function drag_move_handler( event )
        {
            event.preventDefault();
            var x = event.originalEvent.changedTouches[0].pageX;
            var y = event.originalEvent.changedTouches[0].pageY;
            $(this).css('left', x - offset_x);
            $(this).css('top', y - offset_y);
        }

        $(this).on('touchmove', drag_move_handler);

        /**
         * Drop-Handler für die Stimmungs-Icons
         * @param event
         */
        function drag_end_Handler( event )
        {
            $(this).removeAttr('style');
            $(this).detach();
            $(this).appendTo($('#mood-container'));

            var x = event.originalEvent.changedTouches[0].pageX;
            var y = event.originalEvent.changedTouches[0].pageY;
            var element = document.elementFromPoint(x, y);

            switch (element)
            {
                case $('#geigerin .hitbox').get(0):
                    geigerin.slower();
                    break;
                case $('#floetistin .hitbox').get(0):
                    floetistin.faster();
                    break;
                case $('#harfenspieler .hitbox').get(0):
                    harfenspieler.slower();
                    break;
                default:
                    break;
            }

            // TODO: weitere musiker

            $(this).off('touchmove'); // Move Handler entfernen
        }

        $(this).on('touchend', drag_end_Handler); // Drop-Handler anhängen
    }

    // Musiker an Events hängen
    $('.hitbox').on('tap', tap_handler);

    // Mood Icons an Events hängen
    $('.mood-icon').on('touchstart', icon_drag_handler);

    // Podium Doppel-Tap für Spielstart
    $('#podium-right').doubleTap(function ()
    {
        console.log('double tap');
        /*
         TODO: Spiel start!
         */
    });

    // Aktiviere den Gesten Canvas
    $('#knight5').on('tap',function( event )
    {
        $('#gestures').removeClass('hidden'); // canvas anzeigen

        $('#app-page').removeClass('js-blur-rev'); // Hintergrund weichzeichnen
        $('#app-page').addClass('js-blur'); // Hintergrund weichzeichnen
     });

    // Gestenobjetk, wird in einer Funktion "zusammengebaut"
    var gesture = {};
    gesture.works = false;

    // Touch events auf dem Gesten Canvas
    $('#gestures').on('touchend',function( event )
    {
        // touch ende -> canvas wieder verstecken und geste auswerten
        $('#gestures').addClass('hidden');

        $('#app-page').removeClass('js-blur');
        $('#app-page').addClass('js-blur-rev');

        // Geste auswerten...
        generate_gesture(gesture);
        process_gesture(gesture);
    });
});



/**
 * Code hier wird nur beim laden der ersten Page (preload) ausgeführt!
 * */
$(document).ready(function ()
{
    'use strict';

    // TODO: anzahl der dateien aus manifest datei extrahieren
    var num_files_total = 47, // Anzahl aller Dateien
        num_files_cached = 0; // Anzahl Datein die bereits geladen wurden

    // Progress-Balken
    var $progress_bar = TolitoProgressBar('progressbar')
        .setOuterTheme('e')
        .setInnerTheme('e')
        .isMini(true)
        .setMax(num_files_total)
        .setStartFrom(num_files_cached)
        .showCounter(true)
        .build();

    // Ist application cache API verfügbar?
    if ( window.applicationCache !== undefined )
    {
        var cache = window.applicationCache;

        // Überprüfe auf neue Version auf dem Server:               CHECKING
        cache.addEventListener('checking', function ( event )
        {
            $('#progressbar-btn').parent().find('.ui-btn-inner .ui-btn-text').attr('href', '#').text('Überprüfe...');
        });

        // Version ist aktuell:                                     NOUPDATE
        cache.addEventListener('noupdate', function ( event )
        {
            $progress_bar.setValue(num_files_total);
            $('#progressbar-btn').parent().find('.ui-btn-inner .ui-btn-text').attr('href', '#app-page').text('Starte App');
            remind_to_bookmark();
        });

        // App das erste mal gecached:                              CACHED
        cache.addEventListener('cached', function ( event )
        {
            $progress_bar.setValue(num_files_total);
            $('#progressbar-btn').parent().find('.ui-btn-inner .ui-btn-text').attr('href', '#app-page').text('Starte App');
            remind_to_bookmark();
        });

        // Download startet:                                        DOWNLOADING
        cache.addEventListener('downloading', function ( event )
        {
            $('#progressbar-btn').parent().find('.ui-btn-inner .ui-btn-text').attr('href', '#').text('Lade App...');
        });

        // listener für progress bar, 1x fire -> +1, dann den balken updaten: PROGRESS
        cache.addEventListener('progress', function ( event )
        {
            num_files_cached ++;
            $progress_bar.setValue(num_files_cached);
        });

        // update wurde heruntergeladen, verwenden?: UPDATEREADY
        // TODO: Evtl. nur ein silent update durchführen, ohne popup. Führt aber dazu, dass das App "immer komisch neu lädt"
        cache.addEventListener('updateready', function ( event )
        {
            cache.swapCache(); // neuen cache benutzen
            $.mobile.changePage('update.html', { transition: 'slidedown' });
        });

        // Fehler: ERROR
        cache.addEventListener('error', function ( event )
        {
            $.mobile.changePage('error-dl.html', { transition: 'slidedown' });
            $progress_bar.setValue(num_files_total);
            $('#progressbar-btn').parent().find('.ui-btn-inner .ui-btn-text').attr('href', '#app-page').text('Starte App');
            remind_to_bookmark();
        });
    }
    else
    {
        // gar nix geht
        $.mobile.changePage('error-cache.html', { transition: 'slidedown' });
        $progress_bar.setValue(num_files_total);
        $('#progressbar-btn').parent().find('.ui-btn-inner .ui-btn-text').attr('href', '#app-page').text('Starte App');
        remind_to_bookmark();
    }
});