export interface IPage {
    (): JSX.Element;
    loadData(): Record<string, any>;
}
