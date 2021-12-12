$(document).ready(function () {
	displayPage();
	getQuote();
});


async function getQuote() {
	let quote = await getQuoteData();
	let strQuote = quote.quoteText;
	let strQuoteBy = quote.quoteAuthor;
	let strQuoteLink = quote.quoteLink;

	// display quote
	displayQuote(strQuote, strQuoteBy);
	
	// set quote for sharing
	setQuoteToPost(strQuote, strQuoteBy, strQuoteLink);
}

async function getQuoteData() {
	// const strKey = Math.floor(Math.random() * 1000000);
	const strKey = Math.floor(Math.random() * 100000);
	const strAPI = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/';
		
	let quoteData;
	
	try {
		quoteData = await $.ajax({
			url: strAPI,
			data: {
				method: 'getQuote',
				key: strKey,
				format: 'json',
				lang: 'en'
			}
		});

		return quoteData;
		
	} catch (er) {
		alert(`Error ${er.status} - ${er.statusText} \nPlease try again later.`);
	}
}


function displayQuote(strQuote, strQuoteBy) {
	$(".quote").html(strQuote);
	$(".quotation-source").html(strQuoteBy);
	displayPage();
}


function setQuoteToPost(strQuote, strQuoteBy, strQuoteLink) {
	let strPostQuote = `https://www.facebook.com/sharer/sharer.php?u=${strQuoteLink}`;
	let strTweetQuote = '';
	let strQuoteShort = strQuote.substr(0, 80);
	
	if (strQuote.length <= 80) {
		strTweetQuote = `https://twitter.com/intent/tweet?text=${strQuote} - ${strQuoteBy}`;
	} else {
		strTweetQuote = `https://twitter.com/intent/tweet?text=${strQuoteShort} ... ${strQuoteLink}`;
	}
	
	// quote to post in Facebook
	$(".btn-facebook").attr("href", strPostQuote);
	
	// quote to post in twitter
	$(".btn-twitter").attr("href", strTweetQuote);
}


function displayPage() {
	let colorRed = Math.floor((Math.random() * 100) + 3);
	let colorGreen = Math.floor((Math.random() * 100) + 3);
	let colorBlue = Math.floor((Math.random() * 100) + 3);
	let colorValue = `rgb(${colorRed}, ${colorGreen}, ${colorBlue})`;
	
	$("body").css({
		'background-color': colorValue,
		'color': colorValue
	});
	$(".btn").css('background', colorValue);
}