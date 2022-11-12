export const getLVStyle=(depth,edge)=>{
	let background="background: hsl("+(depth*60)+",15%,20%);";
	//padding-left:"+(depth*10)+"px;"
	if (depth==0) background='';
	const style="1px dashed hsl("+(depth*60)+",50%,50%);";
	if (edge==1) {
		return background+"border-top:"+style;
	} else if (edge==2) {
		return background+"border-bottom:"+style;
	} else if (edge==3) {
		return background+"border:"+style;
	} else return background;
}