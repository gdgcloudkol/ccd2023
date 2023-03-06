export default function Youtube({ youtubeLink, youtubeLinkTitle }: { youtubeLink: string, youtubeLinkTitle: string }) {
  return (
    <div className="-mt-28 lg:-mt-[30rem] text-center lg:pl-32 lg:pr-32 yt-s lg:yt-l">
      <iframe
        width="100%"
        height="100%"
        className="iframe"
        src={youtubeLink}
        title={youtubeLinkTitle}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  )
}