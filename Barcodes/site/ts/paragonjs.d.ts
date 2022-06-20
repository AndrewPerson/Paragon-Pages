declare module "https://paragon.pages.dev/js/paragon.js" {
    export function Init(): Promise<void>;
    export function GetResource(resourceName: string, callback: (resource: any) => any): void;
    export function ShowNotification(id: string, content: string, loader?: boolean): void;
}