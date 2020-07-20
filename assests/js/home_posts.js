



{//method to submit for post by ajax
  
   let createPost=function(){
      let newpostform=$('#new-post-form') ;
      newpostform.submit(function(e){
         let as="";
         
          e.preventDefault();
         
      $.ajax({
         type:  'post',
         url:   '/post/add',
         data:  newpostform.serialize(),//converting to json*
         success: function(data){
            let newpost=newPostDom(data.data.post);
               
             $('#post-list_container').prepend(newpost);
             deletePost(' .delete-post-button', newpost);
            new postcomment(data.data.post._id);
            },error:function(error){
            console.log(error.resposeText); 
         }

                                     
           

      })

      
        })
   } 
   //method to creTE A POSt in dom
   let newPostDom=function(post){
      return $(`<li id="post-${post._id}">
      <p> 
         
          <small>
              <a class="delete-post-button"  href="post/destroy/${post._id}>">delte</a>
          </small>
          
       ${post.content}<br>
       <small>
      
          ${post.user.name}
       </small>
      </p>
      <div class="post-comments">
          
          <form action="/comment/add" method="POST">
              <input type="text" name="comment">
              <input type="hidden" name="post" value="${post._id}">
              <button type="submit">comment</button>
          </form>
      
        
      <div class="post-comments-list">
          <ul id="post-comments-${post._id}">
</ul>
         </div>
         </div>
      </li>`);
   }




   //mehod todelete
   let deletePost=function(deleteLink){
      
      
      $(deleteLink).click(function(e){
        
         let a=$(deleteLink).prop('href');
         console.log(a);
         e.preventDefault();
        
         $.ajax({
            type:'get',
            url: $(deleteLink).prop('href'),  //extrctin link
            success:function(data){ 
              
                $(`#post-${data.data.post_id}`).remove();
            },error:function(error){
               console.log(error.resposeText); 
            }
         });
      }
      )
   }
   let convertPostsToAjax = function(){
      
      $(' #post-list_container>ul>li').each(function(){
          let self = $(this);
      
          let deleteButton = $(' .delete-post-button', self);
          
          deletePost(deleteButton);

          // get the post's id by splitting the id attribute
          let postId = self.prop('id').split("-")[1]
          new postcomment(postId);
      });
  }


   createPost();
   convertPostsToAjax();





   
}

