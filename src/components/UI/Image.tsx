// 图片的容器
import { image } from "../../types/image";
import { BACKEN_URL } from "../../config";

const Image = (props: { image_prop: image }) => {
    const image_prop: image = props.image_prop;
    return (
        <div className="relative flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
            <img src={BACKEN_URL + image_prop.url} alt={image_prop.alt} width={image_prop.width}
                height={image_prop.height}
                className="mx-auto w-[15rem] h-[12rem] object-cover" />
            {image_prop.name ? (
                <p className="absolute bottom-0 bg-blue-500 bg-opacity-50 text-white w-full text-center py-1">
                    {image_prop.name}
                </p>
            ) : null}
        </div>
    );
}

export default Image;