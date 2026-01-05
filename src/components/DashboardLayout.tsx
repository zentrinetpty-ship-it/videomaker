
import React, { useState } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardHome from '@/components/dashboard/DashboardHome';
import StepWizard from '@/components/StepWizard';
import SettingsModal from '@/components/SettingsModal';
import { AnimatePresence, motion } from 'framer-motion';
import {
    LayoutDashboard,
    PlusCircle,
    Video,
    Settings,
    FileText,
    Sparkles,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import type { APIKeys } from '@/types/workflow';

export default function DashboardLayout() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [currentView, setCurrentView] = useState<'home' | 'create'>('home');
    const [open, setOpen] = useState(false);
    const [apiKeys, setApiKeys] = useState<APIKeys>({
        geminiApiKey: '',
        vertexProjectId: '',
        vertexLocation: ''
    });

    const links = [
        {
            label: "Dashboard",
            href: "#",
            icon: (
                <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onClick: () => setCurrentView('home'),
        },
        {
            label: "Create Story",
            href: "#",
            icon: (
                <PlusCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onClick: () => setCurrentView('create'),
        },
        {
            label: "My Projects",
            href: "#",
            icon: (
                <Video className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Story Ideas",
            href: "#",
            icon: (
                <FileText className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "API Settings",
            href: "#",
            icon: (
                <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
            onClick: () => setIsSettingsOpen(true),
        },
    ];

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#0a0a0a] text-white selection:bg-orange-500/30">

            {/* Sidebar */}
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        <Logo />
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <div key={idx} onClick={link.onClick}>
                                    <SidebarLink link={link} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Log Out",
                                href: "#",
                                icon: (
                                    <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative border-l border-white/[0.08]">

                {/* Header */}
                <DashboardHeader
                    onCreateNew={() => setCurrentView('create')}
                />

                {/* Dynamic Content */}
                <main className="flex-1 overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {currentView === 'home' ? (
                            <motion.div
                                key="home"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="h-full flex flex-col"
                            >
                                <DashboardHome onCreateNew={() => setCurrentView('create')} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="create"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                            >
                                <StepWizard apiKeys={apiKeys} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* Settings Modal */}
                {isSettingsOpen && (
                    <SettingsModal
                        apiKeys={apiKeys}
                        onSave={(keys) => {
                            setApiKeys(keys);
                            setIsSettingsOpen(false);
                        }}
                        onClose={() => setIsSettingsOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}

const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-7 w-7 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20">
                <Sparkles className="h-4 w-4 text-white" />
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-lg text-white whitespace-pre"
            >
                Story Studio
            </motion.span>
        </Link>
    );
};

