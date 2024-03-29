var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var domain = require('wires-domain');
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser('your secret here'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use('/', express.static(path.join(__dirname, '../frontend')));
domain.setAdapter(domain.adapters.File);



var Item = domain.models.BaseModel.extend({
	name : 'items',
	schema : {
		id : {},
		name : {
			required : function(name) {
				if (name === 'pukka') {
					throw new domain.errors.Validate('Stop doing this already!');
				}
			}
		},
		password : {
			type : 'string',
			hidden : true
		}
	}
});

var Event = domain.models.BaseModel.extend({
	name : 'events',
	schema : {
		id : {},
		name : {
		},
		item_id : {
			required : true
		}
	}
});

domain.rest.Path('/api/items/:id?', Item);
domain.rest.Path('/api/events/:id?', Event);
domain.rest.Path('/api/items/:item_id/events', Event);



app.use(domain.rest.Service);
app.listen(8888);
console.log('listening on port:8888');
