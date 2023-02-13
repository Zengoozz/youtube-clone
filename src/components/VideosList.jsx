import { VideoCard } from "./"

export default function VideosList({ data }) {
  return (
    <div className="grid grid-cols-4 gap-[20px]">
      {data?.items?.map((item, i) => (
        <VideoCard
          key={item?.id?.videoId + Math.random()}
          style={`w-[350px]`}
          videoId={item?.id?.videoId}
          image={item?.snippet?.thumbnails?.high?.url}
          title={item?.snippet?.title}
          channelTitle={item?.snippet?.channelTitle}
          channelId={item?.snippet?.channelId}
        />
      ))}
    </div>
  )
}
