const resetHeaderColors = (): void => {
    if (!document) {
        return;
    }

    // FIXME: нужно ли эти стили вставлять для html еемента или добавить вс тили в заголовок?
    const root = document.documentElement;
    root.style.setProperty('--page-header-color', 'white');
    root.style.setProperty('--page-header-bg-color', 'rgb(34, 34, 250)');
};

export default resetHeaderColors;
