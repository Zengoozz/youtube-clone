import { useGetVideosBySearchQuery } from '../redux/services/youtubeApi'

import { Error, Loading, VideosList } from "../components"
import { useParams } from 'react-router-dom'

export default function SearchFeed() {

    const {searchterm: searchTerm} = useParams()
    const { data, isFetching, error } = useGetVideosBySearchQuery(searchTerm)

    console.log(data)

    isFetching && <Loading />
    error && <Error />

    return (
        <div>
            <VideosList data={data} />
        </div>
    )
}
