import express, { Request, Response, response } from 'express'
import { Exception } from './exceptions';
import { fetchPostJson, getPostId } from './lib/instagram';
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000

function handleError(error: any) {
  if (error instanceof Exception) {
    return response.json({ error: error.message, status: error.code });
  } else {
    console.error(error);
    return response.json(
      { error: "Internal Server Error", status: 500 }
    );
  }
}

app.get('/', async (request: Request, response: Response) => {
  const { url } = request.query

  let postId;

  try {
    postId = getPostId(url?.toString() || null);
  } catch (error: any) {
    return handleError(error);
  }

  try {
    const postJson = await fetchPostJson(postId);

    return response.json(postJson);
  } catch (error: any) {
    return handleError(error);
  }
  return response.json({ url })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})