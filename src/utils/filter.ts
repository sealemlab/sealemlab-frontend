import utils from "@/utils/index";
const PriceConversion = (val :any) => {
	if (!val) return '0.00';
	return utils.getBit(Number(val), 4)
}
export default { PriceConversion };