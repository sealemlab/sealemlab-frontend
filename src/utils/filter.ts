import utils from "@/utils/index";
const PriceConversion = (val :any,bit = 2) => {
	if (!val) return '0.00';
  if(Number(val) < 1e-8)return'0.00'
	return utils.getBit(Number(val), bit)
}
const SquareRoot = (val :any,bit = 2) => {
	if (!val) return '0';
	return utils.getBit(Number(val) / 1e2, bit)
}
const MultiplyBySquare = (val :any,bit = 2) => {
	if (!val) return '0.00';
	return utils.getBit(Number(val) * 1e2, bit)
}
const Thousandths = (val :any) => {
  // console.log('val: ', val);
	if (!val) return '0.00';
  if(val == '0.00')return'0.00'
	return utils.numFormat(val)
}
// 有问题待研究
const NumDelimiter = (val :Number) => {
	if (!val) return '0.00';
	return val.toLocaleString('en-US')
}
export default { PriceConversion,SquareRoot,MultiplyBySquare,Thousandths,NumDelimiter};