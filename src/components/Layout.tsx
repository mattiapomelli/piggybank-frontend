import { ReactNode } from 'react'
import UserNav from './UserNav'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserNav />
      <main className="flex-grow pb-20">
        {children}
      </main>
    </div>
  );
}

export default Layout;
