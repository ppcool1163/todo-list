const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const alert = require('alert');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'))

mongoose.connect('mongodb+srv://admin-ppcool:pppmsdmnu@ppcool-z80gk.mongodb.net/todolistDB?retryWrites=true&w=majority')
// mongoose.connect('mongodb://localhost:27017/todolistDB');

const itemsSchema = {
  name: {
    type: String,
    required: [true, 'Please enter a task']
  }
};

const Item = mongoose.model('item', itemsSchema);


app.get('/', function(req, res) {
  var today = new Date();
  var currentDay = today.getDay();
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }

  var day = today.toLocaleDateString('en-US', options);

  Item.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      res.render('list', {
        KindofDay: day,
        newListItems: foundItems
      });
    }
  });
})

app.post('/', function(req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });

  item.save();
  res.redirect('/')
  //   if (item!= ''){
  //   items.push(item);
  //   res.redirect('/')
  // }
  // } else{
  //   window.alert('Please enter some task!')
  // }
});

app.post("/delete", function(req, res) {
  const checkedItem = req.body.checkbox;

  Item.findByIdAndRemove(checkedItem, function(err){res.redirect('/');});


});

app.listen(3000, function() {
  console.log('Serveris running on port 3000');
});
