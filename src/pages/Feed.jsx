
import { useSelector } from "react-redux"
import { Loading, Error, VideosList } from "../components"

import { useGetVideosByGenreQuery } from '../redux/services/youtubeApi'

export default function Feed() {

  const {category} = useSelector((state) => state.preview)
  const { data, isFetching, error } = useGetVideosByGenreQuery(category)

  // console.log(data?.items)

  isFetching && <Loading />

  error && <Error />

  return (
    <VideosList data={data} />
  )
}
