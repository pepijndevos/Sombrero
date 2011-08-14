function(doc, req) {  
	var render = require('lib/mustache').to_html;
	doc.doc = JSON.stringify(doc);
	return render(this.templates.partials.editor, doc);
}
