import { Route, Routes } from "react-router-dom"

import { Sidebar, Navbar } from "./components"
import {ChannelPreview, Feed, SearchFeed, VideoPreview} from "./pages"


function App() {

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 min-h-[100vh]">
      <div className="px-[10px]">
        <Navbar />
      </div>
      <div className="flex p-[10px]">
        <Sidebar />
        <div className="w-full px-[30px]">
          <Routes>
            <Route path="/:category" element={<Feed />} />
            <Route path="/videos/:videoid" element={<VideoPreview />} />
            <Route path="/channels/:channelid" element={<ChannelPreview />} />
            <Route path="/search/:searchterm" element={<SearchFeed />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
