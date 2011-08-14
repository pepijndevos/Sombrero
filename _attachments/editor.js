$(function() {
	$(".editor .do").live('click', function(event) {
		var editor = $(this).closest(".editor");

		var doc = {
			"type" : "action",
			"status" : "active",
		};

		$.extend(doc, JSON.parse(editor.find(".doc").val()), {
			"text" : editor.find(".textarea").html(),
			"priority" : +editor.find(".priority").val(),
		});

		doc.created_at = doc.created_at || Date.now();
		db.saveDoc(doc);

		editor.find(".textarea").html("")
	});
});
