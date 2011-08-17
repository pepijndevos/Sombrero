function(doc, req) {  
	var render = require('lib/mustache').to_html;
	doc.doc = JSON.stringify(doc);
	var priorities = ["Backburner", "Normal", "High", "Burning"];
	doc.text_priority = priorities[doc.priority]
	return render(this.templates.partials.editor, doc);
}
