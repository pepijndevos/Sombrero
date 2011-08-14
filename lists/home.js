function(head, req) {
	var render = require('lib/mustache').to_html;
	provides("html", function() {
		var data = {
			"database": req.info.db_name,
		}

		// send header
		if (!req.query.bare) {
			send(render(this.templates.head, data, this.templates.partials));
		}

		var row;
    		while (row = getRow()) {
			if (row.value.type == "action") {
				send(render(this.templates.action, row.value));
			}
		}

		// send footer
		if (!req.query.bare) {
			send(render(this.templates.tail, data, this.templates.partials));
		}
	});
}
