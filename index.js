const express = require('express');
const { json } = require('express/lib/response');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');
const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//homepage route
app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
//members API routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
