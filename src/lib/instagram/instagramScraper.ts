import { BadRequest } from "@/exceptions";
import { axiosFetch, getHeaders } from "@/lib/utils";
import { FetchPostProps, VideoJson } from "@/types";
import { PostVideo } from "@/types/instagramScraper";
import { load } from 'cheerio';

const formatPageJson = (json: any) => {
  let scrapedPost;

  if (Array.isArray(json)) {
    scrapedPost = json.find((item: any) => item.video);
  } else {
    scrapedPost = json;
  }

  if (!scrapedPost) {
    return null;
  }

  const videoList = scrapedPost.video;

  if (!videoList) {
    throw new BadRequest("This post does not contain a video");
  }

  if (videoList.length === 0) {
    throw new BadRequest("This post does not contain a video");
  }

  const video: PostVideo = videoList[0];

  const videoJson: VideoJson = {
    username: scrapedPost.author.identifier.value,
    width: video.width,
    height: video.height,
    caption: video.caption,
    downloadUrl: video.contentUrl,
    thumbnailUrl: video.thumbnailUrl,
  };

  return videoJson;
};

export const fetchFromPage = async ({ postUrl, timeout }: FetchPostProps) => {
  const headers = getHeaders();

  const response = await axiosFetch({
    url: postUrl,
    headers,
    timeout,
  });
  console.log("🚀 ~ file: instagramScraper.ts:60 ~ fetchFromPage ~ response:", postUrl);

  if (!response) {
    return null;
  }

  if (response.statusText !== "OK") {
    return null;
  }

  const $ = load(response.data);
  const jsonElement = $("script[type='application/ld+json']");

  if (jsonElement.length === 0) {
    console.log("LD+JSON not available for this post");
    return null;
  }

  const jsonText: string = jsonElement.text();
  const json = JSON.parse(jsonText);
  const formattedJson = formatPageJson(json);
  return formattedJson;
};