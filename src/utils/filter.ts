import utils from "@/utils/index";
const PriceConversion = (val :any,bit = 2) => {
	if (!val) return '0.00';
	return utils.getBit(Number(val), bit)
}
export default { PriceConversion };