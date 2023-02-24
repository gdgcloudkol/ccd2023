export default function Youtube({ youtubeLink, youtubeLinkTitle }: { youtubeLink: string, youtubeLinkTitle: string }) {
  return (
    <div className="text-center lg:-mt-60 mt-20 object-fill pl-10 pr-10 lg:pl-32 lg:pr-32 yt max-h-fit">
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