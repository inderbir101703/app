class postcomment{constructor(e){this.postId=e,this.postcontainer=$("#post-"+e),this.newCommentForm=$(`#post-${e}-comments-form`),this.createComment(e);let t=this;$(" .delete-comment-button",this.postContainer).each((function(){t.deleteComment($(this))}))}createComment(e){let t=this;this.newCommentForm.submit((function(o){o.preventDefault(),console.log("hola");$.ajax({type:"post",url:"/comment/add",data:$(this).serialize(),success:function(o){let n=t.newCommentDom(o.data.comment);$("#post-comments-"+e).prepend(n),t.deleteComment($(" .delete-comment-button",n)),new Noty({theme:"relax",text:"Comment published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}newCommentDom(e){return $(`<li id="comment-${e._id}">\n                    <p>\n                        \n                        <small>\n                            <a class="delete-comment-button" href="/comments/destroy/${e._id}">X</a>\n                        </small>\n                        \n                        ${e.content}\n                        <br>\n                        <small>\n                            ${e.user.name}\n                        </small>\n                    </p>    \n\n            </li>`)}deleteComment(e){$(e).click((function(t){t.preventDefault(),$.ajax({type:"get",url:$(e).prop("href"),success:function(e){$("#comment-"+e.data.comment_id).remove(),new Noty({theme:"relax",text:"Comment Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(e){console.log(e.responseText)}})}))}}