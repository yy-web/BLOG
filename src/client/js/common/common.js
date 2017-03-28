export function center(obj) {
    const screenW = document.body.clientWidth;
    const allH = document.body.clientHeight;
    const screenH = window.screen.availHeight;
    const scroll = document.body.scrollTop;
    const o = document.getElementById(obj);

    setTimeout(function () {
        const objW = o.offsetWidth;
        const objH = o.offsetHeight;

        o.style.top = (screenH - objH)/2 + scroll +'px';
        o.style.left = (screenW - objW)/2 +'px';
    },10);

}
