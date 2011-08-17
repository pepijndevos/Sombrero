$(function() {
	$(".editor .do").live('click', function(event) {
		var editor = $(this).closest(".editor");

		var doc = {
			"type" : "action",
			"status" : "active",
		};

		$.extend(doc, JSON.parse(editor.find(".doc").val()), {
			"text" : editor.find(".textarea").html(),
			"priority" : +editor.find(".priority input").val(),
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
		var el = document.createElement("span");
		el.setAttribute("class", "action");
		window.getSelection().getRangeAt(0).surroundContents(el);
	});

	$(".editor input.reference").live('click', function(event) {
		var el = document.createElement("span");
		el.setAttribute("class", "reference");
		window.getSelection().getRangeAt(0).surroundContents(el);
	});
});
