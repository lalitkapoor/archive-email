function updateNotifications() {
	var fbcount = $('.unread-facebook').length;
	if (fbcount > 0) {
		$('.fb-pop').fadeIn('fast');
		$('.fb-pop').html(fbcount);
	}
			
	var gitcount = $('.unread-github').length;
	if (gitcount > 0) {
		$('.git-pop').fadeIn('fast');
		$('.git-pop').html(gitcount);
	}
			
	var twitcount = $('.unread-twitter').length;
	if (twitcount > 0) {
		$('.twit-pop').fadeIn('fast');
		$('.twit-pop').html(twitcount);
	}
			
	var licount = $('.unread-linked').length;
	if (licount > 0) {
		$('.li-pop').fadeIn('fast');
		$('.li-pop').html(licount);
	}
}

$(document).ready( function() {
	
	$.ajax({
		
		url: 'http://localhost:1338/v1/5081c6840d75b40877000000/messages?folder=Inbox&limit=50',
		datatype: 'json',
		success: function(results) {
			var source = $('#mail-template').html();
			var template = Handlebars.compile(source);
			var html = template({results: results});
			$('.email-window').html(html);
			
			$('.email-window').isotope({
				itemSelector: '.email'
			}, function() {
				updateNotifications();
			});
			
			var source = $('#attachment-template').html();
			var template = Handlebars.compile(source);
			var html = template({results: results});
			$('.attachment-window').html(html);
			
		}
	});
	
	
	Handlebars.registerHelper('strip', function(body){
		return new Handlebars.SafeString($('<div>').html(body).text());
	} );
	
	Handlebars.registerHelper('extension', function(attachment) {
	    var extension = attachment.substr( (attachment.lastIndexOf('.') +1) );
	    switch(extension) {
	        case 'jpg':
			case 'jpeg':
	        case 'png':
	        case 'gif':
	            return "<img src='img/img-icon.png'>" + attachment;
	        break;                         
	        case 'zip':
	        case 'rar':
	            return "<img src='img/archive-icon.png'>" + attachment;
	        break;
	        case 'pdf':
	            return "<img src='img/pdf-icon.png'>" + attachment;
	        break;
			case 'doc':
			case 'docx':
				return "<img src='img/word-icon.png'>" + attachment;
			break;
			case 'xls':
			case 'xlsx':
				return "<img src='img/xls-icon.png'>" + attachment;
			break;
			case 'ppt':
			case 'pptx':
				return "<img src='img/ppt-icon.png'>" + attachment;
			break;
			case 'mp3':
				return "<img src='img/audio-icon.png'>" + attachment;
			break;
	        default:
				return "<img src='img/other-icon.png'>" + attachment;
	    }
	});
	
	Handlebars.registerHelper('thumbnails', function(thumbnail_url) {
		return "<img src='" + thumbnail_url + "'>";
	});
	
	Handlebars.registerHelper('read-labels', function(domain, messageId) {
		var classList = "";
		
		if (domain.indexOf("facebook") > -1) {
			classList = classList + " " + "read-facebook";
		}
		if (domain.indexOf("postmaster") > -1) {
			classList = classList + " " + "read-twitter";
		}
		if (domain.indexOf("linkedin") > -1) {
			classList = classList + " " + "read-linkedin";
		}
		if (domain.indexOf("github") > -1) {
			classList = classList + " " + "read-github";
		}
		
		return "<div message-id='" + messageId + "' class='email rounded-corners" + classList + "'>";
		/* <a href='inner#email-thread-window' message-id='" + messageId + "'> */
	});
	
	Handlebars.registerHelper('unread-labels', function(domain, messageId) {
		var classList = "";
		
		if (domain.indexOf("facebook") > -1) {
			classList = classList + " " + "unread-facebook";
		}
		if (domain.indexOf("postmaster") > -1) {
			classList = classList + " " + "unread-twitter";
		}
		if (domain.indexOf("linkedin") > -1) {
			classList = classList + " " + "unread-linkedin";
		}
		if (domain.indexOf("github") > -1) {
			classList = classList + " " + "unread-github";
		}

		
		return "<div message-id='" + messageId + "' class='email unread rounded-corners" + classList + "'>";
		/* <a href='inner#email-thread-window' message-id='" + messageId + "'> */
	});
	
	/*
	$('.email-window').isotope({
		itemSelector: '.email'
	});
	*/
	
	$('header').mouseenter( function() {
		$(this).animate({opacity: '1'});
	});
	
	$('header').mouseleave( function() {
		$(this).animate({opacity: '0.7'});
	});
	
	$('.attachments-pane').click( function() {
		$('.body-window').fadeOut('fast', function() {
			$('.attachment-window').fadeIn('fast');
		});
	});
	
	$('.inbox-pane').click( function() {
		$('.body-window').fadeOut('fast', function() {
			$('.email-window').fadeIn('fast');
		});
	});	
	
	/*
	$('.email-window .email').click( function() {
		var id = $(this).attr(message-id);
		var url = "http://localhost:1338/v1/5081c6840d75b40877000000/messages/" + id + "/thread";
		
		$('.body-window').fadeOut('fast', function() {
			
		});
		
		$.ajax({
		
			url: url,
			datatype: 'json',
			success: function(results) {
				var source = $('#email-thread-template').html();
				var template = Handlebars.compile(source);
				var html = template({results: results});
				$('.email-thread-window').html(html);
			
			}
		});
	})
	*/
	
});
