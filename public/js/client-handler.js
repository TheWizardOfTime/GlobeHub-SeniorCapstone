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
        $("#addto-pocket-form").show(500);
    });
    $("#addto-button").click(function() {
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
        socket.emit('make-pocket', {'pname':name})
        $("#create-pocket-form").hide(500);
    });
});



// ///////////////////////////////////////////////////// //
//  Server Responses for the specific Clients Requests   //
// ///////////////////////////////////////////////////// //

// $(function() {
//     $("#remove-pocket-button").click(function() {
//         $("#addto-pocket-form #valueFromMyButton").text($(this).val().trim());
//         $("#addto-pocket-form input[type=text]").val('');
//         $("#valueFromMyModal").val('');
//         $("#addto-pocket-form").show(500);
//     });
//     $("#addto-button").click(function() {
//         $(".save-button").val($("#pocket-form input[type=text]").val().trim());
//         $("#pocket-form").hide(400);
//     });
// });
