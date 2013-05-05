$(document).on('mobileinit', function()
{
    // inits für JQM
});

$(document).on('pageload', function(event)
{
    // Code wird ausgeführt für alle pages, haben aber nur eine, die App-Seite

    var num_frames = 12;

    // Sprites beim start anzeigen: IDLE
    $('#geigerin').sprite({ fps: 12, no_of_frames: num_frames });
    $('#knight2').sprite({ fps: 12, no_of_frames: num_frames });
    $('#knight3').sprite({ fps: 12, no_of_frames: num_frames });
    $('#knight4').sprite({ fps: 12, no_of_frames: num_frames });
    $('#knight5').sprite({ fps: 12, no_of_frames: num_frames });


    var is_destroyed = false;

    // Callbacks
    function tap_handler(event)
    {
        if(is_destroyed)
        {
            $(event.target).sprite({ fps: 12, no_of_frames: num_frames });
            is_destroyed = false;
        }
        else
        {
            $(event.target).destroy();
            is_destroyed = true;
        }
    }

    function swipeleft_handler(event)
    {
        $(event.target).fps(6);
    }

    function swiperight_handler(event)
    {
        $(event.target).fps(24);
    }
    // Bindings
    $('.sprite').on('tap', tap_handler);
    $('.sprite').on('swipeleft', swipeleft_handler);
    $('.sprite').on('swiperight', swiperight_handler);
});

$(document).ready(function ()
{
    var cache = window.applicationCache;

    // ist application cache API verfügbar?
    if (cache != undefined)
    {
        // TODO: anzahl der dateien aus manifest datei extrahieren
        var num_files_total = 32; // Anzahl aller Dateien
        var num_files_cached = 0; // Anzahl Datien die bereits geladen sind

        var $progress_bar = TolitoProgressBar('progressbar')
            .setOuterTheme('e')
            .setInnerTheme('e')
            .isMini(true)
            .setMax(num_files_total)
            .setStartFrom(num_files_cached)
            .showCounter(true)
            .build();

        // Überprüfe auf neue Version auf dem Server: CHECKING
        cache.addEventListener('checking', function(event)
        {
            $('#progressbar-button').parent().find('.ui-btn-inner .ui-btn-text').attr('href', "#");
            $('#progressbar-button').parent().find('.ui-btn-inner .ui-btn-text').text('Überprüfe...');
        });

        // Version ist aktuell: NOUPDATE
        cache.addEventListener('noupdate', function(event)
        {
            $progress_bar.setValue(num_files_total);
            $('#progressbar-button').parent().find('.ui-btn-inner .ui-btn-text').attr('href', "app.html");
            $('#progressbar-button').parent().find('.ui-btn-inner .ui-btn-text').text('Starte App');
        });

        // App das erste mal gecached: CACHED
        cache.addEventListener('cached', function(event)
        {
            $progress_bar.setValue(num_files_total);
            $('#progressbar-button').parent().find('.ui-btn-inner .ui-btn-text').attr('href', "app.html");
            $('#progressbar-button').parent().find('.ui-btn-inner .ui-btn-text').text('Starte App');
        });

        // Download startet: DOWNLOADING
        cache.addEventListener('downloading', function(event)
        {
            $('#progressbar-button').parent().find('.ui-btn-inner .ui-btn-text').attr('href', "#");
            $('#progressbar-button').parent().find('.ui-btn-inner .ui-btn-text').text('Lade App...');
        });

        // listener für progress bar, 1x fire -> +1, dann den balken updaten: PROGRESS
        cache.addEventListener('progress', function(event)
        {
            num_files_cached++;
            $progress_bar.setValue(num_files_cached);
        });

        // update wurde heruntergeladen, verwenden?: UPDATEREADY
        // TODO: Evtl. nur ein silent update durchführen, ohne popup. Führt aber dazu, dass das App "immer komisch neu lädt"
        cache.addEventListener('updateready', function(event)
        {
            cache.swapCache(); // neuen cache benutzen
            $.mobile.changePage("refresh.html", { transition: "slidedown" }); // Seite neu laden
        });

        // Fehler: ERROR
        cache.addEventListener('error', function(event)
        {
            $.mobile.changePage("error-preload.html", { transition: "slidedown" });
        });
    }
    else
    {
        $.mobile.changePage("error-nocache.html", { transition: "slidedown" });
    }
});