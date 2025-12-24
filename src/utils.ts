// in comfy ui, all js will be loaded, and will load the css, that will affect the comfy ui style, so load it in setup
export function loadTheme() {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme');
    if (theme === 'dark') {
        import('ant-design-vue/dist/antd.dark.css');
        document.body.classList.add('dark-theme');
    } else {
        import('ant-design-vue/dist/antd.css');
    }
}