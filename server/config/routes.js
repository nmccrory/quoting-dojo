module.exports = function(app, mongoose){
	app.get('/', function(req, res){res.render('index')});

	app.get('/main', function(req, res){
		res.render('main');
	})

	app.post('/quote', function(req, res){
		var quote = new Quote({name: req.body.name, quote: req.body.quote});

		quote.save(function(err){
			if(err){
				console.log('something went wrong');
			}else{
				console.log('successfully added quote');
				res.direct('/main');
			}
		})
	})
}