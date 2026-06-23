import type { ToPathOption, AnyRouter } from '@tanstack/react-router'
export type SidebarType = {
    url: ToPathOption<AnyRouter, string, string | undefined> & {}
    icon: string,
    title: string
}