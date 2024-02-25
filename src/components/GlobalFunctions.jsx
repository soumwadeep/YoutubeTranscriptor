import axios from "axios";

export const getCaptionId = async (videoId, accessKey) => {
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/captions?part=id&videoId=${videoId}&key=${process.env.YOUTUBE_WORK_API_KEY}`,
      {
        headers: {
          Bearer: accessKey,
        },
        timeout: 180000,
      }
    );
    // const answer = response.data.response;
    console.log(response);
    return response;
  } catch (error) {
    console.log("Backend Error:", error);
    throw new Error(error);
  }
};

export const getCaption = async (captionId, accessKey) => {
  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/captions?${captionId}?key=${process.env.YOUTUBE_WORK_API_KEY}`,
      {
        headers: {
          Bearer: accessKey,
        },
        timeout: 180000,
      }
    );
    // const answer = response.data.response;
    console.log(response);
    return response;
  } catch (error) {
    console.log("Backend Error:", error);
    throw new Error(error);
  }
};

export const sendQuery = async (token, chatId, query) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api/v2/query" + `/${chatId}`,
      {
        query,
      },
      {
        headers: {
          "x-access-token": token,
        },
        timeout: 180000,
      }
    );
    const answer = response.data.response;
    return answer;
  } catch (error) {
    console.log("Backend Error:", error.response.data.message);
    throw new Error(error.response.data.message);
  }
};
