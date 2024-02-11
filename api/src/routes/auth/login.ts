import {type Serve} from "bun";

export default {
  fetch(req) {
    console.log('--------req login',req  )
    return new Response("AUTH/LOGIN!");
  },
} satisfies Serve;
