var incre; 
$.ajax({
    url: 'https://dog.ceo/api/breeds/list/all',
    method:'Get',
    success:function(data){
        var urlname=data.message; 
        var t=Object.getOwnPropertyNames(urlname);
        for(a in t)  
        {
        $('select').append("<option></option>");
                $('option:last-child').append(t[a]);
        }
    }
});




$('#get').click(function(){
    var inp=$("select option:selected").text();
    var str='https://dog.ceo/api/breed/'+inp+'/images';
    $.ajax({
 url: str,
  method: 'GET',
   success:function(data){
    
       var urlname=data.message[0];
       incre=0;
      console.log(urlname);
     
      $('#img').attr('src',urlname);
   }})  
}); 

$('#next').click(function(){
     var inp=$("select option:selected").text();
    var str='https://dog.ceo/api/breed/'+inp+'/images';
 $.ajax({
   url:str,
   method:'Get',
     success:function(data)
     {console.log("ef");
         incre++;
      $('img').attr('src',data.message[incre]);   
     }
 });   
}); 