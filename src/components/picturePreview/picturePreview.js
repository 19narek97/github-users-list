import React from "react";

const PicturePreview = (props) => {
    const {pictureUrl} = props;
    return (
        // eslint-disable-next-line
        <img style={{margin:"0 auto"}} className='img-fluid mb-2 mt-2' src={pictureUrl}/>
    )
};
export default PicturePreview;