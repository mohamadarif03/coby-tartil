import { SidebarType } from "@/types/sidebar-type";

export const StudentSidebarDatas: SidebarType[] = [
    { url: '/siswa', icon: 'home', title: 'Home', },
    { url: '/siswa/iqra', icon: 'menu_book', title: 'Iqra', },
    { url: '/siswa/ayat-pendek', icon: 'auto_stories', title: 'Ayat Pendek', },
    { url: '/siswa/menulis-hijaiyah', icon: 'draw', title: 'Menulis Hijaiyah', },
];

export const TeacherSidebarDatas: SidebarType[] = [
    { url: '/guru', icon: 'home', title: 'Dashboard', },
    { url: '/guru/monitoring', icon: 'monitoring', title: 'Monitoring', },
];