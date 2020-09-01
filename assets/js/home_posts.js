



{//method to submit for post by ajax
  
   let createPost=function(){
     
      let newpostform=$('#new-post-form') ;
      newpostform.submit(function(e){
         console.log("wesde")
         let as="";
        
          e.preventDefault();
        
      $.ajax({
         type:  'post',
         url:   '/post/add',
         data:  newpostform.serialize(),//converting to json*
         success: function(data){
            let newpost=newPostDom(data.data.post);
               
             $('#post-list_container1>#post-display>ul').prepend(newpost);
             $('#new-post-form').val()=" ";
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
      return $(`<li id="post-${post._id}" class="rounded p-3 mb-5 bg-secondary text-white>
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
        
      
          <form action="/comment/add" method="POST" class="w-50" id="post-<%= post._id %>-comments-form" data="<%=post.id%>">
          <div class="form-group ">
              <input type="Text" name="comment" class="form-control"  placeholder="Type something"  required>
            </div>
          <input type="hidden" name="post" value="${post._id}">
          <button type="submit" class="btn btn-primary">Comment</button>
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



                        
                new Noty({
                  theme: 'relax',
                  text: "Post Deleted",
                  type: 'success',
                  layout: 'topRight',
                  timeout: 1500
                  
              }).show();
            },error:function(error){
               console.log(error.resposeText); 
            }
         });
      }
      )
   }
   let convertPostsToAjax = function(){
      
      $(' #post-list_container1>#post-display>ul>li>').each(function(){
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

