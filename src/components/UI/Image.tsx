// 图片的容器
import { image } from "../../types/image";
import { BACKEN_URL } from "../../config";

const Image = (props: { image_prop: image }) => {
    const image_prop: image = props.image_prop;

    return (
        <div className="w-[12rem] rounded-2xl flex flex-col  items-center hover:shadow-lg transition-shadow duration-300 hover:bg-gray-100 hover:bg-opacity-[10%]">

            <img src={BACKEN_URL + image_prop.url} alt={image_prop.alt} width={image_prop.width}
                height={image_prop.height}
                className="mx-auto w-[12rem] h-[12rem] object-cover" />
            {image_prop.name ? (
                <p className="bg-blue-500 bg-opacity-50 text-white w-full text-center py-1 hover:bg-gray-50 hover:text-red-600 transition-colors duration-300">
                    {image_prop.name}
                </p>
            ) : null}
            {image_prop.description ? (
                <div className="w-[12rem] p-2 shadow-md hover:bg-red-600 hover:text-white transition-colors duration-300">
                    {image_prop.description}
                </div>
            ) : null}
        </div>
    );
}

export default Image;