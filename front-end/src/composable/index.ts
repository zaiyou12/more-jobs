import FetchRequest from "../utils/requests";

export const request = new FetchRequest({
  prefix: `https://iczq7cp2rb.execute-api.ap-northeast-2.amazonaws.com/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})
