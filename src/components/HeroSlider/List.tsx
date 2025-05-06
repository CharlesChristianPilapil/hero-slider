import { inlineString } from "../../../utils/helpers/inlineString";
import Image from "next/image";

interface ListProps {
    slides: string[];
    action: string;
}

const List = ({ slides, action }: ListProps) => {
    return (
        <div>
            {slides.map((data, index) => {

                const isFirstItem = index === 0;
                const initialContentStyle =  isFirstItem 
                    ? 'translate-y-[50px] opacity-0 blur-[20px] animate-show-content' : 
                    index === 1 ? 'animate-content-out' : '';

                const imageAnimationStyle = isFirstItem && action === 'next'
                    ? 'absolute bottom-[20px] min-[414px]:bottom-[50px] left-1/2 w-[220px] h-[220px] rounded-[30px] animate-show-image' : 
                    'w-full h-full';

                return  (
                    <div
                        key={data}
                        className={inlineString(`
                                h-full w-full absolute inset-0 item 
                                ${isFirstItem ? 'z-1' : ''}
                                ${!isFirstItem && !action ? 'opacity-0' : ''}
                                ${action === 'prev' && index === 1 ? 'z-2' : ''}
                            } text-shadow-md`)
                        }
                    >
                        <Image 
                            src={data}
                            alt={`image ${index + 1}`}
                            height={840}
                            width={1500}
                            className={inlineString(`
                                    ${imageAnimationStyle} 
                                    ${action === 'prev' && index === 1 ? 'animate-outframe-xs min-[414px]:animate-outframe-default absolute bottom-0 left-0' : ''} 
                                    object-cover
                                `)
                            }
                        />
                        <div className="text-white font-semibold absolute top-[10%] min-[375px]:top-[15%] sm:top-[20%] w-[1536px] max-w-[80%] left-1/2 -translate-x-[50%] sm:pr-[30%] xl:pr-[40%] box-border content">
                            <p className={`${initialContentStyle}`}> Author </p>
                            <p className={`${initialContentStyle} ${isFirstItem ? 'animation-delay-1.2' : ''} text-3xl xl:text-7xl`}> Sample Slider </p>
                            <p className={`${initialContentStyle} ${isFirstItem ? 'animation-delay-1.4' : ''} text-5xl xl:text-8xl text-orange-500`}> Animal </p>
                            <p className={`${initialContentStyle} ${isFirstItem ? 'animation-delay-1.6' : ''} font-normal text-xs md:text-base`}>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis, voluptatibus fugit rerum, magnam itaque, voluptatum molestias nihil excepturi illum reprehenderit repellendus ipsam asperiores. Quisquam rerum dolore ex placeat eos nulla libero distinctio! Cumque nobis in aliquam ullam deserunt saepe nostrum delectus impedit adipisci explicabo. Inventore eveniet facere totam quisquam expedita!
                            </p>
                            <div className={`${initialContentStyle} ${isFirstItem ? 'animation-delay-1.8' : ''} font-medium grid grid-cols-[repeat(2,100px)] min-[375px]:grid-cols-[repeat(2,130px)] grid-rows-[40px] gap-5 mt-5`}>
                                <button 
                                    className="bg-white font-semibold text-black"
                                > 
                                    See More
                                </button>
                                <button 
                                    className="border border-white text-white"
                                > 
                                    Subscribe 
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default List;