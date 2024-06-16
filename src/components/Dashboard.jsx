import { useState } from "react";
import MarkdownText from "./MarkdownText";

async function loader(youtubeUrl, url, apiKey) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      inputs: {
        youtube_url: youtubeUrl,
      },
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    return data.result.data.attributes;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

function isValidYoutubeUrl(url) {
  const urlPattern =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return urlPattern.test(url);
}

function isInputValid(url) {
  return !isValidYoutubeUrl(url) || !url;
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async () => {
    setErrorMessage("");
    setIsLoading(true);

    const url = import.meta.env.VITE_AIR_OPS_URL;
    const apiKey = import.meta.env.VITE_AIR_OPS_API_KEY;

    if (apiKey === undefined || url === undefined) {
      alert("Missing AirOps API key or URL");
      setIsLoading(false);
      return;
    }

    if (isInputValid(videoUrl)) {
      setErrorMessage("Please enter a valid YouTube URL");
      setIsLoading(false);
      return;
    }

    const data = await loader(videoUrl, url, apiKey);

    setData(data);
    setVideoUrl("");
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        {data ? (
          <div className="my-8">
            <a href={import.meta.env.VITE_POST_URL + "/" + data.slug}>
              <h2 className="text-xl font-bold mb-4 text-violet-400">
                {data.title}
              </h2>
            </a>
            <MarkdownText markdown={data.description} />
            <a
              className="block bg-violet-600 text-white px-3 py-2 my-2 rounded-md"
              target="_blank"
              rel="noreferrer"
              href={import.meta.env.VITE_POST_URL + "/" + data.slug}
            >
              Read more
            </a>
            <button className="bg-none text-gray-400 my-2" onClick={() => setData(null)}>create new post</button>
          </div>
        ) : (
          <div>
            <div className="my-2">
              <input
                className="appearance-none block w-full p-3 leading-5 text-lg text-violet-900 border border-gray-200 rounded-lg shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
                type="text"
                placeholder={"Enter YouTube URL"}
                onChange={(e) => setVideoUrl(e.target.value)}
                value={videoUrl}
              />

              {errorMessage && (
                <p className="text-red-400 my-2">{errorMessage}</p>
              )}
            </div>

            <button
              className="bg-violet-600 text-white px-3 py-2 mt-2 rounded-md"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Generating post..." : "Generate Blog Post"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
