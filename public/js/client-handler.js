$(document).ready( function() {
	if($('body').hasClass('loaded')){

		$("#feed-container").animete({ width:'toggle'});
		$("#watch-container").animate({ width:'toggle'});
		$("#pocket-container").animate({width:'toggle'});
		
		console.log("removed loader!");
		setTimeout( function() {
			$("#loader-wrapper").remove();
		}, 1000);
	}
});

/** Sliding Animations **/

$("#toggle-news").click(function () {
	console.log('click');
    $news = $("#feed-container");
    $news.animate({ width:'toggle'},1000);
});

$("#toggle-watch").click(function () {
	console.log('click');
    $watch = $("#watch-container");
    $watch.animate({ width:'toggle'},1000);
});

$("#toggle-pocket").click(function() {
	console.log('click');
	$info = $("#pocket-container");
	$info.animate({width:'toggle'},1000);
});

/** Date and Time **/
// $('#date-time').ready( function() {
// 	var d = new Date(),
// 	    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
// 	    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
// 	    ampm = d.getHours() >= 12 ? 'pm' : 'am',
// 	    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
// 	    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// 	$(this).text( days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm );

// });

function date_time(id)
{
        date = new Date;
        year = date.getFullYear();
        month = date.getMonth();
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
        d = date.getDate();
        day = date.getDay();
        days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
        h = date.getHours();
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        result = ''+days[day]+' '+months[month]+' '+d+' '+year+' '+h+':'+m+':'+s;
        document.getElementById(id).innerHTML = result;
        setTimeout('date_time("'+id+'");','1000');
        return true;
}
