import React from 'react';

const CommentList = ({ comments }) => {

    let content
    const renderedComments =
       comments?.map((comment) => {
           if(comment.status === 'pending'){
               content = 'this comment is awaiting moderation';
           }else if(comment.status === 'rejected'){
               content = 'this comment is rejected';
           }else if(comment.status === 'approved') {
               content = comment.content;
           }
            return <li key={comment.id}>
                { content }
            </li>
        });

    return <ul> {renderedComments}</ul>;
}
export default CommentList;
