///////////////////////////////////////
//  jQuery for animations and Stuff  //
///////////////////////////////////////

/** Sliding Animations **/

$("#toggle-news").click( function () {
	console.log('click');
    $news = $("#feed-container");
    $news.animate({ width:'toggle'},1000);
});

$("#toggle-watch").click( function () {
	console.log('click');
    $watch = $("#watch-container");
    $watch.animate({ width:'toggle'},1000);
});

$("#toggle-pocket").click( function() {
	console.log('click');
	$info = $("#pocket-container");
	$info.animate({width:'toggle'},1000);
});

$("#toggle-profile").click( function() {
    console.log('click');
    $profile = $("#profile-container");
    $profile.animate({width:'toggle'},1000);

});

// //////////////////////////////////////////////////// //
//  Client Request Events that Trigger Server Response  //
// //////////////////////////////////////////////////// //

$(function() {
    $("#addto-pocket-button").click(function() {
        $("#addto-pocket-form").
        $("#addto-pocket-form").show(500);
    });
    $("#addto-button").click(function() {
        event.preventDefault();
        $("#addto-pocket-form").hide(500);
    });
});

$(function() {
    $("#create-pocket-button").click( function() {
        $("#create-pocket-form #pocket-name").text($(this).val().trim());
        $("#create-pocket-form input[type=text]").val('');
        $("#create-pocket-form").show(500);
    });
    $("#create-button").click( function(event) {
        event.preventDefault();
        var name = $("#create-pocket-form").find('input[name="pocket-name"]').val();
        socket.emit('create-pocket', {'pname':name})
        $("#create-pocket-form").hide(500);
    });
});

$(function() {
    $("#remove-pocket-button").click( function() {

    });
});

$(function() {
    $('#pocket-list').find('li:has(ul)')
    .click( function(event) {
        if (this == event.target) {
            $(this).toggleClass('expanded');
            $(this).children('ul').toggle('medium');
        }
        return false;
    })
    .addClass('collapsed')
    .children('ul').hide();

    //Create the button funtionality
    $('#expand-list')
    .unbind('click')
    .click( function() {
        $('.collapsed').addClass('expanded');
        $('.collapsed').children().show('medium');
    })

    $('#collapse-list')
    .unbind('click')
    .click( function() {
        $('.collapsed').removeClass('expanded');
        $('.collapsed').children().hide('medium');
    })
});

// /////////////////////////////////////// //
//  Server Responses for Clients Requests  //
// /////////////////////////////////////// //

socket.on('init-pocket', function( data ) {

    console.log(data.pockets);
    pagebuilder.displayPocketLists( data.pockets , function( html ) {

    });
});

socket.on('response-news', function ( data ) {
  pagebuilder.displayNewsList( data.info.name, data.info.news, function( html ) {
    if( $('#feed-container').has('.news-feed') ) { 
        $('#current-country').remove( )
        $('.news-feed').remove( );
    }
    $('#feed-container').append( html );
   });

  pagebuilder.displayProfile( data.info.profiles, function( html ) {
  });
});


/*---- End of File ----*/