interface IAppSetting {
    theme: TTheme;
    localStorageName: string;
    checkSupportDevice: () => boolean;
};

export type TTheme = "dark" | "light";


export const appSetting: IAppSetting = {
    theme: "light",
    localStorageName: "dataTasks",

    checkSupportDevice: (): boolean => {
        const supportsAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
        const isLowPowerDevice = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
    
        return supportsAnimations && isLowPowerDevice;
    }
};