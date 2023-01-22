export const TagHandlers={
    gourl:function(tag){
        const url=tag.attrs?.url.replace(/.+:\/\//g,'')||'';
        if (url) {
            window.open(tag.name+'://'+url,"target=_new");
        }
    }
};
