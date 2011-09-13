$(function() {
	$(".editor .do").live('click', function(event) {
		var editor = $(this).closest(".editor");

		var doc = {
			"type" : "action",
			"status" : "active",
		};

		var textfield = editor.find(".textarea");
		var verbs = [];

		textfield.find("a.action").each(function(idx, val) {
			verbs.push(val.innerHTML.toLowerCase());
		});

		$.extend(doc, JSON.parse(editor.find(".doc").val()), {
			"text" : textfield.html(),
			"priority" : +editor.find(".priority input").val(),
			"verbs": verbs,
		});

		doc.created_at = doc.created_at || Date.now();
		db.saveDoc(doc);

		editor.find(".textarea").html("")
	});
	
	$(".editor .priority input").live('change', function(event) {
		var priorities = ["Backburner", "Normal", "High", "Burning"];
		$(this).next('span').html(priorities[this.value]);
	});

	$(".editor input.action").live('click', function(event) {
		var el = document.createElement("a");
		el.setAttribute("class", "action");
		window.getSelection().getRangeAt(0).surroundContents(el);
	});

	$(".editor input.reference").live('click', function(event) {
		var el = document.createElement("a");
		el.setAttribute("class", "reference");
		window.getSelection().getRangeAt(0).surroundContents(el);
	});
});
