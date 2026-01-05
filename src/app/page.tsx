'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SaasTemplate from '@/components/ui/saa-s-template';

export default function HomePage() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <DashboardLayout />;
  }

  return <SaasTemplate onLaunch={() => setShowDashboard(true)} />;
}


