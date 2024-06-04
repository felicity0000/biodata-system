import Header from "@/components/Header";

interface Props {
    children: React.ReactNode;
}
const Layout = ({children}:Props) => {
  return (
    <div className="flex flex-col">
        <Header/>
        <div className="px-2 md:px-40">{children}</div>
    
    </div>
  )
}

export default Layout