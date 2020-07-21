{
 let like_post=function(likelink){


    $(likelink).click(function(e){
        console.log("in khota");
        let a=$(likelink).prop('href');
        console.log(a);
     e.preventDefault();
          $.ajax({
               type:'get',
               url:$(likelink).prop('href'),
                success:function(data){
                 let a=$(`#total_likes-${data.data.likeable._id}`).text();
                 a=parseInt(a);
                 
                 if(data.data.deleted)
                 a=a-1;
                 else
                 a=a+1;
                 $(`#total_likes-${data.data.likeable._id}`).text(a);
                
                    console.log("sada");
                }
          })
    })
 }   
    


    
    
    
    let converttoAjax=function(){
    $(' #post-list_container1>#post-display>ul>li').each(function(){
   let self =$(this);
   let like=$(' .like_button ',self);
    like_post(like);
    })
    
}



converttoAjax();
}