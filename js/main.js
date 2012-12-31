(function() {

	window.App = {
		Models: {},
		Collections: {},
		Views: {}
	}

	window.template = function(id) {
		return _.template( $('#' + id).html() );
	};
	
	//person model
	App.Models.Person = Backbone.Model.extend({
		defaults: {
			name: 'Guest Name',
			age:  '20',
			occupation: 'Worker'
		}
	});
	
	//a list of people
	App.Collections.People = Backbone.Collection.extend({
		model: App.Models.Person/*,
		
		render: function() {
			this.collection.each(function(person) {
				console.log(person);
			});
		}*/
	});
	
	//view for all people
	App.Views.People = Backbone.View.extend({
		tagName: 'ul',
		
		render: function() {
			this.collection.each(function(person) {
				var personView = new App.Views.Person({ model:person });
				this.$el.append(personView.render().el);
			}, this);
			
			return this;
		}
	});
	
	//the view for person
	App.Views.Person = Backbone.View.extend({
		tagName: 'li',
		className: 'person',
		id: 'person-id',
		
		template: template('personTemplate'),
		
		/*initialize: function(){
			this.render();
		},*/
		
		render: function(){
			//this.$el.html( this.model.get('name') + ' (' + this.model.get('age') + ') - ' + this.model.get('occupation') );
			this.$el.html( this.template(this.model.toJSON()) );
			return this;
		}
	});
	
	var peopleCollection = new App.Collections.People([
		{
			name: 'shinaan mohamed',
			age: 26
		},
		{
			name: 'ali adnan',
			age: 51,
			occupation: 'Developer'
		},
		{
			name: 'Hassan Moosa',
			age: 84,
			occupation: 'Mudhim'
		}
	]);
var peopleView = new App.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);
})();