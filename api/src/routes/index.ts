import {type Serve} from "bun";

export default {
  fetch(req) {
    console.log('--------req root',req  )
    return new Response("Bun!");
  },
} satisfies Serve;
