/**
 * A pagebuilding tool generate HTML dynamically for the Applications
 */

var news_id = 0;
var profiles_id =0;

var pagebuilder = {
        displayNewsList: function (name, news, callback) {
            var main_div = $('<div></div>')
                .attr('id','news-feed')
                    .attr("data-country", name)
                    .attr('data-src', 'NEWSNOW');
            console.log('Formatting...');
            for(var key in news) {
                var element_div = $('<div></div>')
                    .addClass('news-element')
                    .attr('id', news_id+"_ne"),
                    main_span = $('<span></span>'),
                    spanTime = $('<span></span>')
                        .addClass("time")
                        .text('TIME '+news[key].Time),
                    titleLink = $('<a></a>')
                        .addClass("article")
                        .attr('href', news[key].Article)
                        .attr('target',"_blank")
                        .attr('rel','nofollow')
                        .text(news[key].Title),
                    publisher = $('<span></span>')
                        .addClass('source')
                        .text('PUB: '+news[key].Publisher+', '+news[key].Origin),
                    check_box = $('<input/>')
                        .attr('type', 'checkbox')
                        .attr('id', news_id+"_cb")
                        .addClass('check-box');
                main_span.append(titleLink);
                main_span.append('<br>');
                main_span.append(publisher);
                main_span.append('<br>');
                main_span.append(spanTime);
                main_span.append(check_box);
                main_span.append('<br>');
                element_div.append(main_span);
                main_div.append(element_div);
                main_div.append('<br>');

                news_id++;
            }
            if(callback && typeof(callback) === "function") {
                console.log('finished!');
                callback( main_div );
            }
    },

    displayProfile: function (info , callback) {

        var main_div = $('<div></div>')
            .addClass('profiles')

        for(var key in info ) {
            var element_div = $('<div></div>')
            .addClass('profile-element'),
            main_span = $('<span></span>')
            profileLink = $('<a></a>')
                .attr('id','profile')
                .attr('href', info[key])
                .attr('target','_blank')
                .text( info );
            main_span.append(profileLink);
            main_div.append(element_div);
        }

        if( callback && typeof( callback ) === "function" ) {
            callback( main_div )
        }
    },

    displayPocketLists: function (pocketList , callback) {

        // var  main_list = $('<ul></ul>')
        //     .attr('id','pocket-list');

        // $.each(pocketList, function(i) {
        //     var articleList = pocketList[i].articles;
        //     var pocket_item = $('<li></li>')
        //         .addClass('pocket-item')
        //         .attr('role', 'pocket')
        //         .appendTo(main_list);
        //     var pocket_item_list = $('<ul></ul>')
        //         .appendTo(pocket_item);

        //     $.each(articleList, function(j) {
        //         var  article_item = $('<li></li>')
        //             .addClass('news-element'),
        //             main_span = $('<span></span>'),
        //             spanTime = $('<span></span>')
        //                 .addClass("time")
        //                 .text('TIME '+articleList[j].time),
        //             titleLink = $('<a></a>')
        //                 .addClass("article")
        //                 .attr('href', articleList[j].article)
        //                 .attr('target',"_blank")
        //                 .attr('rel','nofollow')
        //                 .text(articleList[j].title),
        //             publisher = $('<span></span>')
        //                 .addClass('source')
        //                 .text('PUB: '+articleList[j].publisher+', '+articleList[j].origin);

        //         main_span.append(titleLink);
        //         main_span.append('<br>');
        //         main_span.append(publisher);
        //         main_span.append('<br>');
        //         main_span.append(spanTime);
        //         main_span.append(check_box);
        //         main_span.append('<br>');
        //         article_item.append(main_span);
        //     })
        // });
    }
};


/*---- End of File ----*/