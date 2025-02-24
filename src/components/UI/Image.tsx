// 图片的容器
import { image } from "../../types/image";

const Image = (props: { image_prop: image }) => {
    const image_prop: image = props.image_prop;
    return (
        <div className="relative flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
            <img src={image_prop.url} alt={image_prop.alt} width={image_prop.width} height={image_prop.height} className="mx-auto" />
            {image_prop.name ? (
                <p className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full text-center py-1">
                    {image_prop.name}
                </p>
            ) : null}
        </div>
    );
}

export default Image;