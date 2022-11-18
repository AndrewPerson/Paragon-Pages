declare module "https://paragon.pages.dev/js/paragon.js" {
    export function Init(): Promise<void>;
    export function GetToken(): Promise<string | null>;
    export function RefreshToken(): Promise<string | null>;
    export function ShowNotification(id: string, content: string, loader?: boolean): void;
    export function CloseNotification(id: string): void;
}