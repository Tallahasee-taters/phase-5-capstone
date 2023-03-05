import React from 'react';
import Post from './Post'

const PostFeed = ({videos}) => {
    const mappedVideos = videos.map(video => <Post key={video.id} {...video}/>)
    return (
        <div>
            {mappedVideos}
        </div>
    );
}

export default PostFeed;
