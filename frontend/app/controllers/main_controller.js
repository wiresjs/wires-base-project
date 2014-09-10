var app = app || {};
(function() {
	'use strict';
	app.MainController = Wires.MVC.Controller.extend({
		essentials : {
			views : {
				'index' : 'index.html',
			}
		},
		// Index ******************************
		index : function(params, render) {
			this.name = "Wires";
			var self = this;
			self.blink = true;
			setInterval(function(){
				self.blink = self.blink ? false : true;
			},1000);
			render();
		}
	});
})();
