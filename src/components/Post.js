import React from 'react';

const Post = ({title, thumbnail_url, video_url}) => {

    return (
        <div>
            {title}
            {thumbnail_url}
            {video_url}
        </div>
    );
}

export default Post;
