$(document).ready(function () {
    var passages = [
        {
                    "name": "Matthew",
                    "nameRo": "Matei",
                    "chapters": [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20]
                },
                {
                    "name": "Mark",
                    "nameRo": "Marcu",
                    "chapters": [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20]
                },
                {
                    "name": "Luke",
                    "nameRo": "Luca",
                    "chapters": [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53]
                },
                {
                    "name": "John",
                    "nameRo": "Ioan",
                    "chapters": [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25]
                }
    ];
    
    var book = Math.floor(Math.random() * passages.length);

        var chapter = Math.floor(Math.random() * passages[book].chapters.length) + 1;

        var verse = Math.floor(Math.random() * passages[book].chapters[chapter - 1]) + 1;


        var p = passages[book].name + ' ' + chapter + ':' + verse;

        console.log(book, chapter, verse, p);
    
    jQuery.ajax({
            url: 'http://getbible.net/json',
            dataType: 'jsonp',
            data: 'passage=' + p + '&v=cornilescu',
            jsonp: 'getbible',
            success: function (json) {
                console.log(json.book);
                console.log(Object.keys(json.book).length);

                var capitole = [];
                jQuery.each(json.book, function (index, value) {
                    capitole[index] = Object.keys(value.chapter).length;
                    //console.log(Object.keys(value.chapter).length);
                });
                console.log(capitole.join(","));


                // set text direction
                if (json.direction == 'RTL') {
                    var direction = 'rtl';
                } else {
                    var direction = 'ltr';
                }
                // check response type
                if (json.type == 'verse') {
                    var output = '';
                    var reference = '';
                    jQuery.each(json.book, function (index, value) {
                        reference += passages[book].nameRo + ' ' + value.chapter_nr;
                        jQuery.each(value.chapter, function (index, value) {
                            reference += ':' + value.verse_nr;
                            output += value.verse;
                            output += '<br/>';
                        });
                    });
                    jQuery('#scripture').html(output);  // <---- this is the div id we update
                    jQuery('#reference').html(reference);// <---- this is the div id we update
                } else if (json.type == 'chapter') {
                    var output = '<center><b>' + json.book_name + ' ' + json.chapter_nr + '</b></center><br/><p class="' + direction + '">';
                    jQuery.each(json.chapter, function (index, value) {
                        output += '  <small class="ltr">' + value.verse_nr + '</small>  ';
                        output += value.verse;
                        output += '<br/>';
                    });
                    output += '</p>';
                    jQuery('#scripture').html(output);  // <---- this is the div id we update
                } else if (json.type == 'book') {
                    var output = '';
                    jQuery.each(json.book, function (index, value) {
                        output += '<center><b>' + json.book_name + ' ' + value.chapter_nr + '</b></center><br/><p class="' + direction + '">';
                        jQuery.each(value.chapter, function (index, value) {
                            output += '  <small class="ltr">' + value.verse_nr + '</small>  ';
                            output += value.verse;
                            output += '<br/>';
                        });
                        output += '</p>';
                    });
                    if (output) {
                        jQuery('#scripture').html(output);// <---- this is the div id we update
                    }
                }
            },
            error: function () {
                jQuery('#scripture').html('Pot totul în Hristos, care mă întăreşte.'); // <---- this is the div id we update
                jQuery('#reference').html('Filipeni 4:13');
            },
        });
    /*------------------slick--------------------*/
    $('.pics').slick({
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 10000,
        arrows: false,
    });
});

if ('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('../sw.js');
        console.log('SW registered');
    }
    catch(error) {
        console.log('SW reg failed');
    }
}    