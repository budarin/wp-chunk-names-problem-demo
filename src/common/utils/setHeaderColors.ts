interface SetHeaderColors {
    color: string;
    bgColor: string;
}

const setHeaderColors = ({ color, bgColor }: SetHeaderColors): void => {
    if (!document) {
        return;
    }

    const root = document.documentElement;
    root.style.setProperty('--page-header-color', color);
    root.style.setProperty('--page-header-bg-color', bgColor);
};

export default setHeaderColors;
