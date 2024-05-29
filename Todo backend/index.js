const express = require('express')
const bodyParser = require('body-parser');
const app = express()

app.use(bodyParser.json());
let todo_text = [{
    text : "hello",
    checked : true
}]

app.get('/', function(req, res){
    res.json(todo_text);
})

app.post('/', function(req, res){
  const one = req.body.txt;
  const check = req.body.checked
  todo_text.push({
    text : one,
    checked : check
  })
  res.json(todo_text);
})
app.delete('/', function(req, res){
    const deletetxt = req.body.txt;
    let newtodotext = [];
    for(let i = 0; i < todo_text.length; i++){
        if(todo_text[i].text != deletetxt){
            newtodotext.push({
                text : todo_text[i].text,
                checked : todo_text[i].checked
              })
        }
    }
    todo_text = newtodotext
    res.json(todo_text);
})

app.put('/', function(req, res){
    let txt = req.body.txt;
    for(let i = 0; i < todo_text.length; i++){
        if(todo_text[i].text == txt){
            todo_text[i].checked = !todo_text[i].checked;
            break
        }
    }
    res.json(todo_text);
})
app.listen(3000)