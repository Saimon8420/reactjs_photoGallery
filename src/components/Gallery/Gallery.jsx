import { useEffect, useState } from "react";
import imagesData from "../../data/imageData";
import "./Gallery.css";
const PhotoGallery = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);

    // load data
    useEffect(() => {
        setData(imagesData);
    }, [])

    const handleClick = (e, id) => {
        //selected styling
        if (e.target.classList.value !== "selected" && e.target.classList.value !== "eachImg") {
            e.target.classList.add("selected");
        }
        else {
            e.target.classList.remove("selected");
        }

        // Check if the image is already selected
        if (selected.includes(id)) {
            // Image is already selected, so remove it from the selected array
            setSelected(selected.filter((selectedId) => selectedId !== id));
        } else {
            // Image is not selected, so add it to the selected array
            setSelected([...selected, id]);
        }
    }
    const removeSelected = () => {
        setData(data.filter((item) => !selected.includes(item.id)));
        setSelected([]);
    }

    // drag and drop
    const [draggedImage, setDraggedImage] = useState(null);

    const handleDragStart = (e, image) => {
        setDraggedImage(image);
        console.log(e.target);
    };

    const handleDragEnter = (e, targetImage) => {
        console.log(e.target);
        e.preventDefault();
        if (draggedImage && draggedImage !== targetImage) {
            // Swap images
            const newImages = data.map((image) => {
                if (image === targetImage) {
                    return draggedImage;
                }
                if (image === draggedImage) {
                    return targetImage;
                }
                return image;
            });
            setData(newImages);
        }
    };

    const handleDragEnd = () => {
        setDraggedImage(null);
    };

    return (
        <div className="galleryDiv">
            <div className="content">
                <h2>{selected.length === 0 ? "Photo Gallery" : `${selected.length} Images Selected`}</h2>
                {
                    selected.length !== 0 && <button onClick={() => removeSelected()}>Delete Selected</button>
                }
            </div>
            <div className="photoGallery">
                {
                    data.map((each) => {
                        return (
                            <div className={"eachImg"} key={each?.id} onClick={(e) => handleClick(e, each?.id)} onDragEnter={(e) => handleDragEnter(e, each)}
                                onDragEnd={handleDragEnd}>

                                <img className={draggedImage === each ? "dragged" : ""} src={each?.src} alt={each?.alt} draggable="true"
                                    onDragStart={(e) => handleDragStart(e, each)} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PhotoGallery;