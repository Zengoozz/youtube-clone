import { useParams } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { Loading, Error, VideosList } from "../components";
import { useGetChannelDetailsQuery, useGetChannelVideosQuery } from "../redux/services/youtubeApi";
import notFound from "../assets/notFound.jpg"


const ChannelPreview = () => {

    const { channelid } = useParams();

    const {
        data: channelData,
        isFetching: isFetchingData,
        error: errorData
    } = useGetChannelDetailsQuery(channelid)

    const {
        data: channelVideos,
        isFetching: isFetchingVideos,
        error: errorVideos
    } = useGetChannelVideosQuery(channelid)

    const channelDetails = channelData?.items[0]

    const channelName = channelDetails?.snippet?.title
    const channelImg = channelDetails?.snippet?.thumbnails?.high?.url
    const channelSubscribers = channelDetails?.statistics?.subscriberCount

    // console.log(channelVideos)

    isFetchingData && <Loading />

    errorData && <Error />

    return (
        <div className="">
            <div className="flex flex-col items-center">
                <img className="w-[150px] rounded-[50px] border-[2px] border-red-600 text-white"
                    src={channelImg || notFound} alt={channelName} />
                <span className="flex items-center">
                    <h1 className="text-white text-[40px] font-bold uppercase">
                        {channelName}
                    </h1>
                    {Number(channelSubscribers) > 250000 && <CheckCircleIcon className="ml-[10px] text-gray-400" />}
                </span>
                <p className="text-gray-400 font-med text-[16px]">
                    {channelSubscribers} Subscribers
                </p>
                <span className="mt-[50px]">
                    {isFetchingVideos && <Loading />}
                    {errorVideos && <Error />}
                    <VideosList data={channelVideos} />
                </span>

            </div>
        </div>
    );
}

export default ChannelPreview;
