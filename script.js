$(function(){
   var words=[];

   function generateID() { 
    var time = new Date().getTime();//find time
    return 'oooooooo-oooo-4ooo-kooo-oooooooooooo'.replace(/[ok]/gi, function (c) {//set character for guid
        var random = (time + Math.random() * 16) % 16 | 0;//set hexadecimal
        time = Math.floor(time / 16);
        return (c === 'o' ? random : (random & 0x3 | 0x8)).toString(16);//Write random character instead of 'o' character
    });
   }

   function addWordToList(){
    var wordArray=JSON.parse(localStorage.getItem('word'));//json parsing localStorage data
    $( "#ulWord" ).empty();//clear <ul> tag
    wordArray.forEach(element => {
        $('#ulWord').append('<li class="list-group-item">'+element.name+'</li>')//Write the data to the <li> tag
    });
    
   }

   function interval() {
    setInterval(function(){
        var wordArray=JSON.parse(localStorage.getItem('word'));//json parsing localStorage data

        var index = Math.floor((Math.random() * wordArray.length));//create random index

        //console.log(wordArray[index].name);
        alertify.notify(wordArray[index].name, 'warning', 0, function(){ //show up until clicked on with warning notification 
            
            alertify.prompt( 'Word', 'What is the last learned word','', function(evt, value) { // input from end user

                   if(value==wordArray[index].name){//if the value entered is correct
                        alertify.success('True');
                   }else{//if the value entered is wrong
                        alertify.error('False, True word is '+wordArray[index].name) ;
                   }
                }
               , function() {//If the cancel button is clicked
                    alertify.error('Cancel') 
                });

        });

         }, 3000);//millisecond
    }
  
  

    $('#btnWord').click(function(){
       
        alertify.confirm('Add Word', 'Do you add the word', function(){ //if you want to add 

                var word={
                id:generateID(),
                name:$('#inputWord').val()
                }
     
                words.push(word);
                localStorage.setItem('word',JSON.stringify(words));

                addWordToList();
                

            alertify.success('Word added') 

        }, function(){ //if you do not want to add

            alertify.error('Word did not add')
        }); 
    })

    $('#btnLearn').click(function(){

        interval()

    });
    $('#btnTheme').click(function(){

        //override defaults
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-success";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        
    });
    
 
});