/* See http://www.library.georgetown.edu/sites/default/files/summon/summon-customize.js */
$(document).ready(function () {
	$(document).find("head").append("<style id='gu-custom-css' type='text/css'/>");
	$("#gu-custom-css").append(".holding-msg {font-weight: bold; margin-top: 9px; margin-bottom: 9px;}");
	$("#gu-custom-css").append(".holding-header-sep {border-top: dashed 1px #8d817b; padding-top: 9px;}");
	$("#gu-custom-css").append("div.chart .selection {fill: #679146; stroke: #6caddf;}");
    $("#gu-custom-css").append(".savedItemsFolder .badgeContainer .badge {background-color: #679146;}");
    $("#gu-custom-css").append(".fulltext {background-color: #679146;}");
    $("#gu-custom-css").append(".fulltext .fulltext-inner:before {border-color: #004990 transparent transparent !important;}");
    $("#gu-custom-css").append(".resultsPane .rollup {border-left: 4px solid #6caddf;}");
    $("#gu-custom-css").append(".resultsPane .imagesRollup .grid {margin-top: 0.6rem;}");
    $("#gu-custom-css").append(".resultsPane .imagesRollup .scrollBtn {background-color: #BAE0F7;}");
    $("#gu-custom-css").append(".Filter .applied:before {color: #679146;}");
    $("#gu-custom-css").append(".clearRefinements:before, .icon-remove-sign:before {color: #98002e;}");
    $("#gu-custom-css").append("div.imagesRollup span.gu-artstor {color: #888; font-size: 0.8rem !important;}");
    $("#gu-custom-css").append("div.imagesRollup a.gu-artstor {color: rgb(0, 73, 144) !important;}");
    $("#gu-custom-css").append("div.imagesRollup a.customPrimaryLink {display:inline!important;}");
    $("#gu-custom-css").append(".availability a {color: #004990;}");
    $("#gu-custom-css").append("div.siteLinks > div {border-right: none;}");
    $("#gu-custom-css").append("div.siteLinks a.feedback {display: none;}");
    $("#gu-custom-css").append("div.siteLinks div.languageSwitcher {display: none;}");
    $("#gu-custom-css").append("div form.flowLogin {display: none;}");
    $("#gu-custom-css").append(".advancedBtn .offscreen {position:relative; color: #BAE0F7; font-size: 85%;	font-weight: bold;}");
    $("#gu-custom-css").append(".advancedBtn .caret {display: none;}");
    $("#gu-custom-css").append(".queryBox .advancedBtn {width: 70px!important; right: -45px!important; top: -12px!important;padding-left:6px;}");
	
	checkAll();
});

function imageCheck() {
	$("div.imagesRollup:not(.gu-checked)").each(
		function() {

			var link = $("<span class='gu-artstor'>You must disable popups to access these images; see <a class='gu-artstor' href='http://www.library.georgetown.edu/onesearch-help#10' target='_blank'>OneSearch Help page</a> for more information</span>");
			$(this).find("div.grid").before(link);
			$(this).addClass("gu-checked");
		}
	);
}
function checkAll() {
	$("div.summary:not(.gu-checked)").each(
		function() {
			checkResult(this);
		}
	)
        imageCheck();
	setTimeout(function(){checkAll();}, 500);
}


function testHolding(n) {
	var b = false;
	$(n).find("a.availabilityLink").each(function(){
		var t = $(this).text();
		if (t.search(/ GT:( |$)/) > -1) b = true;
		t = t.replace(/ GT: /," Georgetown: ");
		t = t.replace(/ GW: /," George Washington: ");
		t = t.replace(/ GM: /," George Mason: ");
		t = t.replace(/ CU: /," Catholic: ");
		t = t.replace(/ AU: /," American: ");
		t = t.replace(/ HU: /," Howard: ");
		t = t.replace(/ MU: /," Marymount: ");
		t = t.replace(/ GA: /," Gallaudet: ");
		t = t.replace(/ DC: /," UDC: ");
		$(this).text(t);		
	});
	return b;
}

function testOnlineHolding(n) {
	var b = false;
	$(n).find("a.availabilityLink").each(function(){
		var t = $(this).text();
		if (t.search(/Full Text Online/) > -1) {
			b = true;
		}
		else if (t.search(/Available Online/) > -1) {
			b = true;
		} else if (t.search(/Check Availability/) > -1) {
			var tl = $(n).find("span.ng-binding").text(); 
			if (tl.search(/Video Recording/) > -1) {
				if ($(this).nextAll("span.ng-scope").is("*")) {
				} else {
					b = true;					
				}
			}
		}
	});
	return b;
}

function checkResult(el) {
	$(el).find("div.contentType:has(a.availabilityLink)").each(
		function() {
			if (testHolding(this)) {
		        $(this).addClass("gu-holding");
			} else if (testOnlineHolding(this)) {
			    $(this).addClass("online-holding");
	        } else {			        	
		        $(this).addClass("non-gu-holding");
	        }
		}
	);
	
	if ($(el).find("div.contentType").length == $(el).find("div.contentType:has(a.availabilityLink)").length) {
		$(el).addClass("gu-checked");
				
		var seq = $("<div class='holding-seq'/>");
		$(el).find("div.contentType").first().before(seq);
		
		if ($(el).find(".online-holding").is("*")) {
			var n = $("<div class='holding-msg'>This item is available online:</div>");
			seq.before(n);
			n.after($(el).find(".online-holding"));
			$(el).find(".online-holding").first().addClass("online-holding-first");
		}

		if ($(el).find(".gu-holding").is("*")) {
			var n = $("<div class='holding-msg'>This item is available at Georgetown Libraries:</div>");
			seq.before(n);
			n.after($(el).find(".gu-holding"));
			$(el).find(".gu-holding").first().addClass("gu-holding-first");
		}

		if ($(el).find(".non-gu-holding").is("*")) {
			var n = $("<div class='holding-msg'>This item is available at Consortium Libraries:</div>");
			seq.before(n);
			n.after($(el).find(".non-gu-holding"));
			$(el).find(".non-gu-holding").first().addClass("non-gu-holding-first");
		}
		
		seq.remove();
		$(el).find(".holding-msg").addClass("holding-header-sep")
		$(el).find(".holding-header-sep").first().removeClass("holding-header-sep");
	}
}