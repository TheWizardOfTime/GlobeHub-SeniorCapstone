/**
 * A pagebuilding 
 */

var pagebuilder = {

        displayNewsList: function (name, news, callback) {

            var main_div = $('<div></div>')
                .addClass('news-feed')
                    .attr('id','current')
                    .attr("data-country", name)
                    .attr('data-src', 'NEWSNOW');
            console.log('Formatting...');
            for(var key in news) {
                var element_div = $('<div></div>')
                    .addClass('news-element'),
                    main_span = $('<span></span>'),
                    spanTime = $('<span></span>')
                        .attr("id","time")
                        .text('TIME '+news[key].Time),
                    titleLink = $('<a></a>')
                        .attr("id","article")
                        .attr('href', news[key].Article)
                        .attr('target',"_blank")
                        .text(news[key].Title),
                    publisher = $('<span></span>')
                        .attr('id','source')
                        .text('PUB: '+news[key].Publisher+', '+news[key].Origin),
                    pocketButton = $('<button></button>')
                        .addClass('button-pocket');
                main_span.append(titleLink);
                main_span.append('<br>');
                main_span.append(publisher);
                main_span.append('<br>');
                main_span.append(spanTime);
                main_span.append(pocketButton);
                main_span.append('<br>');
                element_div.append(main_span);
                main_div.append(element_div);
                main_div.append('<br>')
            }
            if(callback && typeof(callback) === "function") callback( main_div );
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
            main_div.append(element_div);''
        }

        if( callback && typeof( callback ) === "function" ) {
            callback( main_div )
        }
    }
};
