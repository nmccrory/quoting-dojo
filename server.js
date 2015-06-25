var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

//listen on port 8000
app.listen(8000, function(){
	console.log('listening on port 8000');
})

//body parser
app.use(bodyParser.urlencoded());
//setting up static folder
app.use(express.static(path.join(__dirname, './static')));
//setting up view files
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//connecting mongoose to mongo instance
mongoose.connect('mongodb://localhost/quotes');

var QuoteSchema = new mongoose.Schema({
		name: String,
		quote: String
})
var Quote = mongoose.model('Quote', QuoteSchema);
app.get('/', function(req, res){res.render('index')});

app.get('/main', function(req, res){
	Quote.find({},function(err, quotes){
		if(err){
			console.log('something went wrong');
		}else{
			console.log('quotes retrieved');
			res.render('main', {quotes: quotes});
		}
	})
	
})

app.post('/quote', function(req, res){
	var quote = new Quote({name: req.body.name, quote: req.body.quote});
	console.log(req.body);
	quote.save(function(err){
		if(err){
			console.log('something went wrong');
		}else{
			console.log('successfully added quote');
		}
		res.redirect('/main');
	});
})
