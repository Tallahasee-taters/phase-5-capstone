import {useState} from 'react';

const NewPostForm = () => {
    const [newPost, setNewPost] = useState({
        title: "",
        video_url: "",
        upvote: 0,
        downvote: 0,
        featured_image: null,
    })

    handleChange = (event) => {
        setNewPost({ [event.target.name]: event.target.value });
      }
    

    return (
        <div>
            <label className='Post-form'>Title</label>
            <input
            type='text'
            name='title'
            onChange={handleChange}
            />
            <label className='Post-form'></label>
            <file/>
            <label></label>
            <input/>
        </div>
    );
}

export default NewPostForm;
