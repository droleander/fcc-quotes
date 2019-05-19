function displayPage() {
	var colorRed = Math.floor((Math.random() * 150) + 1);
	var colorGreen = Math.floor((Math.random() * 150) + 1);
	var colorBlue = Math.floor((Math.random() * 150) + 1);
	var colorValue = 'rgb(' + colorRed + ', ' + colorGreen + ', ' + colorBlue + ')';

	$("body").css({
		'background-color': colorValue,
		'color': colorValue
	});

	$(".btn").css('background', colorValue);
}

function displayQuote(strQuote, strQuoteBy) {
	displayPage();
	$(".quote").html(strQuote);
	$(".quotation-source").html(strQuoteBy);
}

function setQuoteToPost(strQuote, strQuoteBy, strQuoteLink) {
	var strPostQuote = 'https://www.facebook.com/sharer/sharer.php?u=' + strQuoteLink;
	var strTweetQuote = '';
	var strQuoteShort = strQuote.substr(0, 80);

	if (strQuote.length <= 80) {
		strTweetQuote = 'https://twitter.com/intent/tweet?text=' + strQuote + '- ' + strQuoteBy;
	} else {
		strTweetQuote = 'https://twitter.com/intent/tweet?text=' + strQuoteShort + '... ' + strQuoteLink;
	}

	/* quote to post in Facebook */
	$(".btn-facebook").attr("href", strPostQuote);

	/* quote to post in twitter */
	$(".btn-twitter").attr("href", strTweetQuote);
}

function getQuote() {
	const strKey = Math.floor(Math.random() * 1000000);
	const strAPI = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/';

	$.ajax({
		url: strAPI,
		data: {
			method: 'getQuote',
			key: strKey,
			format: 'json',
			lang: 'en'
		},
		success: function (json) {
			var strQuote = JSON.stringify(json.quoteText);
			strQuote = strQuote.substring(1, strQuote.length - 1);

			var strQuoteBy = JSON.stringify(json.quoteAuthor);
			strQuoteBy = strQuoteBy.substring(1, strQuoteBy.length - 1);

			var strQuoteLink = JSON.stringify(json.quoteLink);
			strQuoteLink = strQuoteLink.substring(1, strQuoteLink.length - 1);

			/* display quote */
			displayQuote(strQuote, strQuoteBy);

			/* set quote for sharing */
			setQuoteToPost(strQuote, strQuoteBy, strQuoteLink);
		},
		error: function (er) {
			alert("Status: " + er.statusText + "\nCode: " + er.status);
		}
	});
}

$(document).ready(function () {
	getQuote();
});