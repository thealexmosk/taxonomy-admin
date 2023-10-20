interface GuidesLayoutProps {
  children: React.ReactNode
}

export default function GuidesLayout({ children }: GuidesLayoutProps) {
  return <main className="flex w-full flex-1 flex-col">{children}</main>
}
