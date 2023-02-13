import React, { useState } from 'react';
import { Link } from "react-router-dom"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { useParams } from 'react-router-dom';

import { Error, Loading, VideoCard } from "../components"
import { useGetVideoDetailsQuery, useGetSimilarVideosQuery, useGetVideoCommentsQuery } from '../redux/services/youtubeApi';

const ReactionButton = ({ pressedButton, notPressedButton, buttonContent }) => {

    const [press, togglePress] = useState(false)

    return (
        <button className='flex'
            onClick={() => { togglePress(prevState => !prevState) }}>
            {press ? pressedButton : notPressedButton}
            <p className='ml-[5px]'>
                {!press ? buttonContent : Number(buttonContent) + 1}
            </p>
        </button>
    )
}

const VideoPreview = () => {

    const [desc, showDesc] = useState(false)

    const { videoid } = useParams()

    const { data, isFetching, error } = useGetVideoDetailsQuery(videoid)

    const { data: similarVideos, isFetching: isFetchingSimilarVideos, error: errorSimilarVideos } = useGetSimilarVideosQuery(videoid)

    const { data: comments, isFetching: isFetchingComments, error: errorComments } = useGetVideoCommentsQuery(videoid)

    console.log(comments)

    (isFetching || isFetchingSimilarVideos || isFetchingComments) && <Loading />

    (errorComments || error || errorSimilarVideos) && <Error />

    return (
        <div className='flex justify-evenly'>
            <div className='w-[1000px] mt-[30px]'>
                <iframe
                    className="rounded-[20px] "
                    width="100%"
                    height="500px"
                    src={`https://www.youtube.com/embed/${videoid}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
                <h2 className='text-[40px] font-bold text-white mt-[20px]'>
                    {data?.items[0]?.snippet?.title}
                </h2>
                <div className='flex justify-between'>
                    <Link to={`/channels/${data?.items[0]?.snippet?.channelId}`}>
                        <p className='text-[25px] font-medium text-gray-400 mt-[10px]'>
                            {data?.items[0]?.snippet?.channelTitle}
                        </p>
                    </Link>
                    <div className='flex mt-[20px] text-gray-300'>
                        <div className='flex mr-[20px]'>
                            <VisibilityIcon />
                            <p className='ml-[5px]'>
                                {data?.items[0]?.statistics?.viewCount}
                            </p>
                        </div>
                        <span className='mr-[20px]'>
                            <ReactionButton
                                pressedButton={<ThumbUpIcon />}
                                notPressedButton={<ThumbUpOffAltIcon />}
                                buttonContent={data?.items[0]?.statistics?.likeCount}
                            />
                        </span>
                        <ReactionButton
                            pressedButton={<StarIcon />}
                            notPressedButton={<StarOutlineIcon />}
                            buttonContent={data?.items[0]?.statistics?.favoriteCount}
                        />
                    </div>
                </div>
                <p className={`text-[16px] leading-[20px] font-light text-gray-300 mt-[10px] ${!desc && "line-clamp-[2]"}`}>
                    {data?.items[0]?.snippet?.description}
                </p>
                <button className='text-[16px] font-medium text-gray-500 underline uppercase hover:no-underline'
                    onClick={() => showDesc(prevState => !prevState)}>
                    {desc ? "hide description" : "show full description"}
                </button>
                <div className='mt-[10px] flex flex-wrap'>
                    {data?.items[0]?.snippet?.tags?.map(tag => (
                        <Link to={`/search/${tag}`}>
                            <span className='flex text-gray-300 mr-[5px] hover:underline'>
                                <p className='text-white font-medium'>#</p>
                                <p>{tag}</p>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className='ml-[40px]'>
                <h2 className='text-[40px] font-medium text-white'>
                    Similar Videos
                </h2>
                <div>
                    {similarVideos?.items.map(item => (
                        <VideoCard
                            key={item?.id?.videoid}
                            style={`w-[550px] `}
                            videoid={item?.id?.videoid}
                            channelId={item?.snippet?.channelId}
                            image={item?.snippet?.thumbnails?.high?.url}
                            title={item?.snippet?.title}
                            channelTitle={item?.snippet?.channelTitle}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VideoPreview;
