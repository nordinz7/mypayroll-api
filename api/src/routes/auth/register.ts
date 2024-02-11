import {type Serve} from "bun";

export default {
  fetch(req) {
    console.log('--------req register',req  )
    return new Response("AUTH/REGISTER!");
  },
} satisfies Serve;

// export const fetch = async (req: Request): Promise<Response> => {
//   return new Response("AUTH/REGISTER! constant fetch");
// }