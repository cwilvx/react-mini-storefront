import React from "react";

interface GalleryProps {
  images: string[];
  inStock: boolean | undefined;
}

interface GalleryState {
  currentImage: number;
}

class Gallery extends React.Component<GalleryProps, GalleryState> {
  constructor(props: GalleryProps) {
    super(props);
    this.state = {
      currentImage: 0,
    };
  }
  render() {
    return (
      <div className="gallery">
        <div className="thumbs">
          {this.props.images &&
            this.props.images.map((image, index) => {
              return (
                <div
                  className="thumb"
                  key={image}
                  onClick={() => this.setState({ currentImage: index })}
                >
                  <img src={image} alt="thumbnail preview" />
                </div>
              );
            })}
        </div>
        <div className="preview">
          <img
            src={
              this.props.images && this.props.images[this.state.currentImage]
            }
            alt="main preview"
          />
          {!this.props.inStock && <div className="img-overlay"></div>}
        </div>
      </div>
    );
  }
}

export default Gallery;
