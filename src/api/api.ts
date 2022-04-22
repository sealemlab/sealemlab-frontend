import service from "./service";

const BASE_API = process.env.VUE_APP_BASE_API;
const GAME_API = process.env.VUE_APP_GAME_API;
const CARD_API = process.env.VUE_APP_NEWCARD;
export default {
  getCurrencyFun: (data: any) => {
    return service.get(
      `${BASE_API}/api/v3/simple/price/?ids=${data}&vs_currencies=usd`
    );
  }
};
