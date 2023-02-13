import { Link } from "react-router-dom"

import notFound from "../assets/notFound.jpg"

export default function VideoCard(props) {

  const { videoId, channelId, image, title, channelTitle, style } = props;

  return (

    <div className={`h-[230px] m-[10px] bg-gray-800 flex flex-col rounded-[10px] ${style}`}>
      <img className={`h-[130px] object-cover rounded-t-[10px] ${style}`}
        src={image || notFound} alt={title} />

      <div className='flex flex-col justify-between flex-1 p-[10px]'>
        <h1 className='text-white font-bold text-[15px] leading-[25px] line-clamp-2 '>
          <Link to={`/videos/${videoId}`}>
            {title}
          </Link>
        </h1>
        <p className='text-gray-400 text-[12px] truncate hover:underline'>
          <Link to={`/channels/${channelId}`}>
            {channelTitle}
          </Link>
        </p>
      </div>
    </div >
  )
}
