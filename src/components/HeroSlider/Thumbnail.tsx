import Image from "next/image";
import { inlineString } from "../../../utils/helpers/inlineString";

const Thumbnail = ({ slides, action }: { slides: string[], action: string }) => {
    return (
        <div className={`absolute bottom-[20px] min-[414px]:bottom-[50px] left-[50%] w-max z-100 flex gap-5 transition-all duration-300 group-[.next]/slider:animate-effect-next`}>
            {[...slides.slice(1), slides[0]].map((data, index) => {
                const isFirstItem = index === 0; 
                const isLastItem = index === slides.length - 1;

                return (
                    <div 
                        key={data} 
                        className={inlineString(`
                            ${isLastItem && action === 'next' ? 'animate-show-thumbnail' : ''} 
                            ${isFirstItem && action === 'prev' ? 'overflow-hidden opacity-0 animate-show-thumbnail' : ''} 
                            relative w-[150px] h-[220px] shrink-0 rounded-[20px] overflow-hidden`) 
                        }
                    >
                        <Image  
                            src={data}
                            alt={`image ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 text-white font-semibold text-nowrap">
                            <p> Slider Name </p>
                            <p> Description </p>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Thumbnail;