import React from "react";
const Photos = ({ type, photos }) => {

  if (type !== "photo") return null
  return (

    <div className="photo">
      <div
        className="photoset-grid"
        photoset-layout={type.photoset_layout}
      >
        {photos.map((photos, i) => {
          return (
            <div key={photos.alt_sizes[1].url}>
              <img
                src={photos.alt_sizes[1].url}
                alt={photos.caption}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Photos;
