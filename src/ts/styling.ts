export const getLVStyle=(depth,edge)=>{
	if (depth==0)return '';
	const background="background: hsl("+(depth*60)+",30%,13%);";
	//padding-left:"+(depth*10)+"px;"
	const style="1px dashed hsl("+(depth*60)+",50%,50%);";
	if (edge==1) {
		return background+"border-top:"+style;
	} else if (edge==2) {
		return background+"border-bottom:"+style;
	} else if (edge==3) {
		return background+"border:"+style;
	} else return background;
}