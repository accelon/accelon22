export const getBorderStyle=(depth,edge)=>{
	if (!edge || depth==0)return '';
	const padding=""//padding-left:"+(depth*10)+"px;"
	const style="1px dashed hsl("+(depth*60)+",50%,50%);";
	if (edge==1) {
		return padding+"border-top:"+style;
	} else if (edge==2) {
		return padding+"border-bottom:"+style;
	} else if (edge==3) {
		return padding+"border:"+style;
	}
}