function(doc, req) {
	var render = require('lib/mustache').to_html;
	if (doc.type == "action") {
		return render(this.templates.action, doc);
	}
}
